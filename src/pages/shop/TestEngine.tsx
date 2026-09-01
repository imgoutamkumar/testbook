import React, { useState, useEffect } from "react";
import { Clock, Info, User, AlertCircle, Menu, X, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetTestByIdQuery,
  useSubmitTestAttemptMutation,
  useSaveAnswerMutation, // Make sure to export this from your testApi.ts!
  useStartTestAttemptMutation
} from "@/redux/services/testApi";

// --- TYPES ---
type QuestionState = "UNVISITED" | "SKIPPED" | "ANSWERED" | "MARKED" | "ANSWERED_MARKED";

interface AnswerState {
  selectedOptionId: string | null;
  state: QuestionState;
}

const TestEngine = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();

  // 1. FETCH LIVE TEST DATA (Backend should return existing attempt info if IN_PROGRESS)
  const { data: response, isLoading, isError } = useGetTestByIdQuery(testId || "");
  const testData = response?.data;

  // Assuming your backend returns the active attempt ID in the test response
  // e.g., testData.activeAttempt.id

  // 2. RTK QUERY MUTATIONS
  const [startTestAttempt] = useStartTestAttemptMutation();
  const [submitTestAttempt, { isLoading: isSubmitting }] = useSubmitTestAttemptMutation();
  const [saveAnswerMutation] = useSaveAnswerMutation();

  // --- STATE ---
  const [timeLeft, setTimeLeft] = useState(0);
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [isMobilePaletteOpen, setIsMobilePaletteOpen] = useState(false);
  const [answers, setAnswers] = useState<Record<string, AnswerState>>({});
  const [isInitialized, setIsInitialized] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [attemptId, setAttemptId] = useState<string | null>(null);
  // --- 1. INITIALIZATION & RESUME RECOVERY ---
  useEffect(() => {
    if (testData && !isInitialized) {
      const initialAnswers: Record<string, AnswerState> = {};

      // Build the empty sheet first
      testData.sections?.forEach((sec: any) => {
        sec.testQuestions?.forEach((tq: any) => {
          initialAnswers[tq.id] = { selectedOptionId: null, state: "UNVISITED" };
        });
      });

      // RESUME FEATURE: If backend returns existing answers, overwrite the empty sheet
      if (testData.activeAttempt?.answers) {
        testData.activeAttempt.answers.forEach((ans: any) => {
          // Map DB states back to Frontend states
          const mappedState: QuestionState =
            ans.state === "ANSWERED_AND_MARKED" ? "ANSWERED_MARKED" :
              ans.state === "MARKED_FOR_REVIEW" ? "MARKED" :
                ans.state;

          initialAnswers[ans.testQuestionId] = {
            selectedOptionId: ans.selectedOptionIds?.[0] || null,
            state: mappedState
          };
        });
      }

      setAnswers(initialAnswers);

      // Restore time. (Ideally from backend: totalDuration - timeSpent)
      const savedTime = localStorage.getItem(`test_${testId}_time`);
      if (savedTime) {
        setTimeLeft(parseInt(savedTime, 10));
      } else {
        setTimeLeft(testData.totalDuration || 3600);
      }

      setIsInitialized(true);
    }
  }, [testData, isInitialized, testId]);

  // 4. When the component loads, ask the backend to start the test!
  useEffect(() => {
    const initializeAttempt = async () => {
      if (testId && !attemptId) {
        try {
          // Tell backend to start/resume test
          const attemptRes = await startTestAttempt(testId).unwrap();

          // Save the ID we get back!
          setAttemptId(attemptRes.data.id);

          // Bonus: If attemptRes.data.answers exists (Resuming a test), 
          // you can map them into your 'setAnswers' state right here!

        } catch (error) {
          console.error("Failed to start attempt:", error);
          alert("Could not start test. Please try again.");
        }
      }
    };

    initializeAttempt();
  }, [testId, startTestAttempt, attemptId]);


  // --- 2. TIMER LOGIC ---
  useEffect(() => {
    if (!isInitialized) return;

    if (timeLeft <= 0) {
      executeFinalSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        localStorage.setItem(`test_${testId}_time`, newTime.toString());
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isInitialized]);


  // --- 3. BACKGROUND SYNC LOGIC (Pattern A) ---
  const syncAnswerToDB = async (questionId: string, state: QuestionState, optionId: string | null) => {
    if (!attemptId) return; // Guard clause

    const mappedState = 
      state === "ANSWERED_MARKED" ? "ANSWERED_AND_MARKED" : 
      state === "MARKED" ? "MARKED_FOR_REVIEW" : 
      state;

    try {
      await saveAnswerMutation({
        attemptId, // <-- Passed in perfectly!
        testQuestionId: questionId,
        state: mappedState,
        selectedOptionIds: optionId ? [optionId] : [],
        timeTakenSec: 0
      }).unwrap();
    } catch (error) {
      console.error("Sync failed:", error);
    }
  };


  // --- 4. ACTION HANDLERS ---
  const handleOptionSelect = (optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [activeTestQuestion.id]: { ...prev[activeTestQuestion.id], selectedOptionId: optionId },
    }));
  };

  const handleClearResponse = () => {
    const qId = activeTestQuestion.id;
    setAnswers((prev) => ({
      ...prev,
      [qId]: { selectedOptionId: null, state: "UNVISITED" },
    }));
    // Sync clear action to backend
    syncAnswerToDB(qId, "UNVISITED", null);
  };

  const navigateToNext = () => {
    if (activeQuestionIdx < activeSection.testQuestions.length - 1) {
      setActiveQuestionIdx((prev) => prev + 1);
    } else if (activeSectionIdx < testData.sections.length - 1) {
      setActiveSectionIdx((prev) => prev + 1);
      setActiveQuestionIdx(0);
    }
  };

  const handleSaveAndNext = () => {
    const qId = activeTestQuestion.id;
    const currentAns = answers[qId];
    const newState: QuestionState = currentAns.selectedOptionId ? "ANSWERED" : "SKIPPED";

    setAnswers((prev) => ({ ...prev, [qId]: { ...currentAns, state: newState } }));

    // Sync instantly to backend!
    syncAnswerToDB(qId, newState, currentAns.selectedOptionId);
    navigateToNext();
  };

  const handleMarkForReviewAndNext = () => {
    const qId = activeTestQuestion.id;
    const currentAns = answers[qId];
    const newState: QuestionState = currentAns.selectedOptionId ? "ANSWERED_MARKED" : "MARKED";

    setAnswers((prev) => ({ ...prev, [qId]: { ...currentAns, state: newState } }));

    // Sync instantly to backend!
    syncAnswerToDB(qId, newState, currentAns.selectedOptionId);
    navigateToNext();
  };


  // --- 5. SUBMISSION LOGIC ---
  const handleFinalSubmitClick = () => {
    setShowSubmitModal(true);
  };

  const executeFinalSubmit = async () => {
    try {
      // Look how clean this is! The DB already has all the answers.
      await submitTestAttempt(attemptId).unwrap();

      localStorage.removeItem(`test_${testId}_time`);
      setShowSubmitModal(false);
      navigate(`/test/result/${testId}`); // Navigate to scoreboard
    } catch (error) {
      console.error("Failed to submit test:", error);
      alert("Something went wrong while submitting. Please try again.");
    }
  };


  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // --- LOADING / ERROR STATES ---
  if (isLoading || !isInitialized) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#337ab7] mb-4"></div>
        <h2 className="text-xl font-bold text-gray-700">Loading Exam Engine...</h2>
        <p className="text-sm text-gray-500 mt-2">Restoring your session securely...</p>
      </div>
    );
  }

  if (isError) {
    return <div className="p-10 text-center text-red-500 font-bold">Failed to load the test. Please check your connection.</div>;
  }

  const activeSection = testData.sections[activeSectionIdx];
  const activeTestQuestion = activeSection?.testQuestions[activeQuestionIdx];
  const activeQuestionDetails = activeTestQuestion?.question;

  const renderContent = (contentObj: any) => {
    if (!contentObj) return "";
    if (typeof contentObj === "string") return contentObj;
    return contentObj.EN || "";
  };

  // --- STAT COUNTERS ---
  const stats = Object.values(answers).reduce(
    (acc, curr) => {
      if (curr.state === "ANSWERED") acc.answered++;
      if (curr.state === "SKIPPED") acc.skipped++;
      if (curr.state === "UNVISITED") acc.unvisited++;
      if (curr.state === "MARKED") acc.marked++;
      if (curr.state === "ANSWERED_MARKED") acc.answeredMarked++;
      return acc;
    },
    { answered: 0, skipped: 0, unvisited: 0, marked: 0, answeredMarked: 0 }
  );

  const getPaletteBadgeClass = (state: QuestionState) => {
    switch (state) {
      case "ANSWERED": return "bg-green-600 text-white rounded-t-xl rounded-bl-xl";
      case "SKIPPED": return "bg-red-500 text-white rounded-b-xl rounded-tr-xl";
      case "MARKED": return "bg-purple-600 text-white rounded-full";
      case "ANSWERED_MARKED": return "bg-purple-600 text-white rounded-full relative after:content-[''] after:w-2 after:h-2 after:bg-green-400 after:rounded-full after:absolute after:bottom-0 after:right-0";
      default: return "bg-white text-black border border-gray-400 rounded-md";
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] w-full bg-gray-50 text-[14px] md:text-[15px] font-sans overflow-hidden select-none">

      <header className="flex justify-between items-center bg-[#2c3e50] text-white px-3 md:px-4 py-2 h-12 shrink-0">
        <div className="font-bold text-sm md:text-lg tracking-wider truncate">PrepMaster iON</div>
        <div className="flex items-center gap-3">
          <div className="text-sm md:text-lg font-bold truncate max-w-[120px] md:max-w-none">{testData.title}</div>
          <button
            className="md:hidden bg-[#34495e] p-1.5 rounded border border-gray-500 hover:bg-[#465c71]"
            onClick={() => setIsMobilePaletteOpen(true)}
          >
            <Menu className="w-5 h-5 text-white" />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">

        {/* LEFT MAIN AREA */}
        <div className="flex flex-col flex-1 bg-white min-w-0 md:border-r border-gray-400">

          <div className="flex bg-[#34495e] text-white shadow-sm z-10 overflow-x-auto no-scrollbar">
            {testData.sections.map((sec: any, idx: number) => (
              <button
                key={sec.id}
                onClick={() => {
                  setActiveSectionIdx(idx);
                  setActiveQuestionIdx(0);
                }}
                className={`px-4 md:px-6 py-2.5 text-xs md:text-sm font-semibold flex items-center border-r border-gray-600 whitespace-nowrap ${activeSectionIdx === idx ? "bg-[#337ab7]" : "hover:bg-[#465c71]"
                  }`}
              >
                {sec.name} <Info className="w-4 h-4 ml-2 opacity-80" />
              </button>
            ))}
          </div>

          <div className="flex flex-wrap justify-between items-center px-3 md:px-4 py-1.5 border-b border-gray-300 bg-[#f8f9fa] text-[12px] md:text-[13px] gap-2">
            <div className="font-bold text-gray-700">Question Type: {activeQuestionDetails?.type?.replace("_", " ") || "Multiple Choice"}</div>
            <div className="flex items-center gap-3 md:gap-5">
              <span className="text-green-700 font-bold hidden sm:inline">Marks: +{activeTestQuestion.marks}</span>
              <span className="text-red-600 font-bold hidden sm:inline">Negative: -{activeTestQuestion.negativeMarks}</span>
              <span className="text-green-700 font-bold sm:hidden">+{activeTestQuestion.marks}</span>
              <span className="text-red-600 font-bold sm:hidden">-{activeTestQuestion.negativeMarks}</span>
              <div className="flex items-center text-red-600 bg-white px-2 py-0.5 border border-red-200 shadow-sm rounded cursor-pointer hover:bg-red-50">
                <AlertCircle className="w-3.5 h-3.5 mr-1" /> <span className="hidden sm:inline">Report Issue</span><span className="sm:hidden">Report</span>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {activeQuestionDetails?.context && (
              <div className="w-full md:w-1/2 max-h-[35vh] md:max-h-full overflow-y-auto border-b md:border-b-0 md:border-r border-gray-300 p-4 md:p-6 bg-[#fafafa]">
                <div className="text-gray-800 leading-relaxed custom-html-content text-sm md:text-base" dangerouslySetInnerHTML={{ __html: renderContent(activeQuestionDetails.context) }} />
              </div>
            )}

            <div className={`w-full overflow-y-auto p-4 md:p-6 ${activeQuestionDetails?.context ? 'md:w-1/2' : 'md:w-full'}`}>
              <div className="flex gap-2 md:gap-3 border-b border-gray-200 pb-4 mb-4 md:mb-5">
                <span className="font-bold text-base md:text-lg min-w-[30px] md:min-w-[35px] text-gray-800 mt-0.5">Q.{activeQuestionIdx + 1}</span>
                <div className="text-gray-900 leading-relaxed font-medium text-sm md:text-base" dangerouslySetInnerHTML={{ __html: renderContent(activeQuestionDetails?.content) }} />
              </div>

              <div className="space-y-3 md:space-y-4 pl-8 md:pl-10">
                {activeQuestionDetails?.options?.map((opt: any, idx: number) => {
                  const isSelected = answers[activeTestQuestion.id]?.selectedOptionId === opt.id;
                  return (
                    <label key={opt.id} className="flex items-start gap-2 md:gap-3 cursor-pointer group">
                      <div className="pt-[4px] md:pt-[2px]">
                        <input
                          type="radio"
                          name={`question-${activeTestQuestion.id}`}
                          className="w-4 h-4 md:w-4 md:h-4 text-[#337ab7] cursor-pointer"
                          checked={isSelected}
                          onChange={() => handleOptionSelect(opt.id)}
                        />
                      </div>
                      <div className={`text-gray-800 p-1.5 -mt-1 md:-mt-1.5 rounded w-full transition-colors text-sm md:text-base ${isSelected ? 'bg-blue-50 border border-blue-200' : 'border border-transparent'}`}>
                        <span className="font-bold mr-2 text-gray-600">{idx + 1}.</span>
                        <span dangerouslySetInnerHTML={{ __html: renderContent(opt.content) }} />
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-between border-t border-gray-300 bg-[#f8f9fa] px-3 md:px-4 py-2 md:py-3 shrink-0 gap-2 md:gap-0">
            <div className="flex gap-2 w-full md:w-auto justify-center md:justify-start">
              <Button variant="outline" size="sm" className="border-gray-400 text-gray-700 bg-white hover:bg-gray-50 flex-1 md:flex-none text-xs md:text-sm h-8 md:h-10" onClick={handleMarkForReviewAndNext}>
                <span className="hidden sm:inline">Mark for Review & Next</span>
                <span className="sm:hidden">Mark & Next</span>
              </Button>
              <Button variant="outline" size="sm" className="border-gray-400 text-gray-700 bg-white hover:bg-gray-50 flex-1 md:flex-none text-xs md:text-sm h-8 md:h-10" onClick={handleClearResponse}>
                Clear Response
              </Button>
            </div>
            <Button size="sm" className="bg-[#337ab7] hover:bg-[#286090] text-white w-full md:w-32 font-semibold text-xs md:text-sm h-9 md:h-10 mt-1 md:mt-0" onClick={handleSaveAndNext}>
              Save & Next
            </Button>
          </div>
        </div>

        {/* RIGHT PALETTE AREA */}
        <div className={`fixed md:relative inset-y-0 right-0 z-40 w-[85%] sm:w-[320px] flex flex-col bg-[#e4e9f0] shadow-2xl md:shadow-none transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isMobilePaletteOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="md:hidden flex justify-end p-2 bg-[#2c3e50]">
            <button onClick={() => setIsMobilePaletteOpen(false)}><X className="w-6 h-6 text-white" /></button>
          </div>

          <div className="flex gap-3 p-3 md:p-4 bg-white border-b border-gray-300">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-gray-100 rounded border border-gray-300 flex items-center justify-center shrink-0">
              <User className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="font-bold text-gray-600 text-[10px] md:text-xs uppercase tracking-wider">Time Left</div>
              <div className="text-xl md:text-2xl font-mono font-bold text-[#d9534f]">{formatTime(timeLeft)}</div>
              <div className="font-semibold text-gray-800 mt-0.5 md:mt-1 text-xs md:text-sm">Candidate</div>
            </div>
          </div>

          <div className="p-3 md:p-4 bg-[#c7d2de] border-b border-gray-300 text-[11px] md:text-xs font-semibold text-gray-800">
            <div className="grid grid-cols-2 gap-y-2 md:gap-y-3">
              <div className="flex items-center gap-2"><div className={`w-6 h-6 md:w-7 md:h-7 flex items-center justify-center ${getPaletteBadgeClass("ANSWERED")}`}>{stats.answered}</div> Answered</div>
              <div className="flex items-center gap-2"><div className={`w-6 h-6 md:w-7 md:h-7 flex items-center justify-center ${getPaletteBadgeClass("SKIPPED")}`}>{stats.skipped}</div> Not Answered</div>
              <div className="flex items-center gap-2"><div className={`w-6 h-6 md:w-7 md:h-7 flex items-center justify-center ${getPaletteBadgeClass("UNVISITED")}`}>{stats.unvisited}</div> Not Visited</div>
              <div className="flex items-center gap-2"><div className={`w-6 h-6 md:w-7 md:h-7 flex items-center justify-center ${getPaletteBadgeClass("MARKED")}`}>{stats.marked}</div> Marked</div>
              <div className="flex items-center gap-2 col-span-2"><div className={`w-6 h-6 md:w-7 md:h-7 flex items-center justify-center shrink-0 ${getPaletteBadgeClass("ANSWERED_MARKED")}`}>{stats.answeredMarked}</div> <span>Answered & Marked (Evaluated)</span></div>
            </div>
          </div>

          <div className="bg-[#337ab7] text-white px-3 md:px-4 py-2 font-semibold text-xs md:text-sm">{activeSection.name}</div>

          <div className="flex-1 overflow-y-auto p-3 md:p-4 bg-[#e8ecf1]">
            <h3 className="font-bold text-gray-700 mb-3 md:mb-4 text-xs md:text-sm uppercase">Choose a Question</h3>
            <div className="grid grid-cols-5 md:grid-cols-5 gap-2 md:gap-3">
              {activeSection.testQuestions?.map((tq: any, idx: number) => {
                const state = answers[tq.id]?.state || "UNVISITED";
                return (
                  <button
                    key={tq.id}
                    onClick={() => {
                      setActiveQuestionIdx(idx);
                      setIsMobilePaletteOpen(false);
                    }}
                    className={`w-9 h-9 md:w-10 md:h-10 flex items-center justify-center font-bold text-xs md:text-sm shadow-sm transition-transform hover:scale-105 ${getPaletteBadgeClass(state)}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-3 md:p-4 bg-[#c7d2de] border-t border-gray-400">
            <Button className="w-full bg-[#5cb85c] hover:bg-[#449d44] text-white font-bold h-9 md:h-10 text-sm md:text-base" onClick={handleFinalSubmitClick}>
              Submit Exam
            </Button>
          </div>
        </div>

        {isMobilePaletteOpen && (
          <div className="md:hidden fixed inset-0 bg-black/50 z-30" onClick={() => setIsMobilePaletteOpen(false)} />
        )}
      </div>

      {/* --- SUBMIT CONFIRMATION MODAL --- */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col">

            <div className="bg-[#337ab7] px-6 py-4 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-white" />
              <h2 className="text-xl font-bold text-white tracking-wide">Confirm Submission</h2>
            </div>

            <div className="p-6">
              <p className="text-gray-700 text-base mb-6">
                Are you sure you want to submit the exam? Once submitted, you will not be able to change your answers.
              </p>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between font-semibold text-gray-700 border-b border-gray-200 pb-2">
                  <span>Answered:</span> <span className="text-green-600">{stats.answered + stats.answeredMarked}</span>
                </div>
                <div className="flex justify-between font-semibold text-gray-700 border-b border-gray-200 pb-2">
                  <span>Not Answered:</span> <span className="text-red-500">{stats.skipped}</span>
                </div>
                <div className="flex justify-between font-semibold text-gray-700">
                  <span>Marked for Review:</span> <span className="text-purple-600">{stats.marked}</span>
                </div>
                <div className="flex justify-between font-semibold text-gray-700">
                  <span>Not Visited:</span> <span className="text-gray-500">{stats.unvisited}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 px-6 py-4 flex justify-end gap-3 border-t border-gray-200">
              <Button
                variant="outline"
                className="border-gray-400 text-gray-700 hover:bg-gray-200"
                onClick={() => setShowSubmitModal(false)}
                disabled={isSubmitting}
              >
                Cancel & Return
              </Button>
              <Button
                className="bg-[#5cb85c] hover:bg-[#449d44] text-white font-bold px-6"
                onClick={executeFinalSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Yes, Submit Exam"}
              </Button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default TestEngine;