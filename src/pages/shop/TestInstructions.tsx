import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { User, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";

// --- FUTURE DYNAMIC DATA STRUCTURE ---
// In the future, you can fetch this via: 
// const { data: instructionData } = useGetTestInstructionsQuery(testId);
const dummyInstructionData = {
  title: "IBPS PO Prelims Mock Test 1",
  duration: 60,
  defaultLanguage: "English",
  instructions: {
    general: [
      "Total duration of the examination is 60 minutes.",
      "The clock will be set at the server. The countdown timer in the top right corner of screen will display the remaining time available for you to complete the examination. When the timer reaches zero, the examination will end by itself. You will not be required to end or submit your examination.",
      "The Question Palette displayed on the right side of screen will show the status of each question using one of the following symbols:"
    ],
    navigation: [
      "To answer a question, do the following:",
      "Click on the question number in the Question Palette at the right of your screen to go to that numbered question directly. Note that using this option does NOT save your answer to the current question.",
      "Click on Save & Next to save your answer for the current question and then go to the next question.",
      "Click on Mark for Review & Next to save your answer for the current question, mark it for review, and then go to the next question."
    ],
    answering: [
      "Procedure for answering a multiple choice type question:",
      "To select your answer, click on the button of one of the options.",
      "To deselect your chosen answer, click on the button of the chosen option again or click on the Clear Response button.",
      "To change your chosen answer, click on the button of another option.",
      "To save your answer, you MUST click on the Save & Next button."
    ]
  },
  declaration: "I have read and understood the instructions. All computer hardware allotted to me are in proper working condition. I declare that I am not in possession of / not wearing / not carrying any prohibited gadget like mobile phone, bluetooth devices etc. /any prohibited material with me into the Examination Hall. I agree that in case of not adhering to the instructions, I shall be liable to be debarred from this Test and/or to disciplinary action, which may include ban from future Tests / Examinations."
};

const TestInstructions = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState(false);
  const [language, setLanguage] = useState(dummyInstructionData.defaultLanguage);

  const handleStartExam = () => {
    if (isChecked) {
      navigate(`/test/attempt/${testId}`);
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] w-full bg-gray-50 text-[14px] md:text-[15px] font-sans overflow-hidden select-none">
      
      {/* 1. TOP HEADER (Matches Test Engine exactly) */}
      <header className="flex justify-between items-center bg-[#2c3e50] text-white px-4 py-2 h-12 shrink-0">
        <div className="font-bold text-lg tracking-wider">PrepMaster iON</div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        
        {/* LEFT MAIN AREA (Instructions) */}
        <div className="flex flex-col flex-1 bg-white min-w-0 md:border-r border-gray-400">
          
          {/* Sub-header info */}
          <div className="flex justify-between items-center px-4 py-2 border-b border-gray-300 bg-[#f8f9fa]">
            <h2 className="font-bold text-[#337ab7] text-lg">General Instructions</h2>
            <div className="flex items-center gap-2 text-sm font-semibold">
              <span>View In:</span>
              <select 
                className="border border-gray-300 rounded px-2 py-1 bg-white cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#337ab7]"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
              </select>
            </div>
          </div>

          {/* SCROLLABLE INSTRUCTIONS CONTENT */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 text-gray-800 text-sm leading-relaxed">
            <h3 className="font-bold mb-4 text-center text-lg uppercase underline">Please read the instructions carefully</h3>
            
            <ol className="list-decimal pl-5 space-y-3">
              {dummyInstructionData.instructions.general.map((text, idx) => (
                <li key={`gen-${idx}`}>{text}</li>
              ))}
            </ol>

            {/* iON Style Palette Legend inside Instructions */}
            <div className="my-6 p-4 bg-gray-50 border border-gray-200 rounded">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-semibold text-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-white text-black border border-gray-400 rounded-md">1</div>
                  <span>You have not visited the question yet.</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-b-xl rounded-tr-xl">3</div>
                  <span>You have not answered the question.</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-green-600 text-white rounded-t-xl rounded-bl-xl">5</div>
                  <span>You have answered the question.</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-purple-600 text-white rounded-full">7</div>
                  <span>You have NOT answered the question, but have marked it for review.</span>
                </div>
                <div className="flex items-center gap-3 md:col-span-2">
                  <div className="w-8 h-8 flex items-center justify-center bg-purple-600 text-white rounded-full relative after:content-[''] after:w-2.5 after:h-2.5 after:bg-green-400 after:rounded-full after:absolute after:bottom-0 after:right-0">9</div>
                  <span>The question(s) "Answered and Marked for Review" will be considered for evaluation.</span>
                </div>
              </div>
            </div>

            <h4 className="font-bold mt-8 mb-2">Navigating to a Question:</h4>
            <ol className="list-decimal pl-5 space-y-2">
              {dummyInstructionData.instructions.navigation.map((text, idx) => (
                <li key={`nav-${idx}`}>{text}</li>
              ))}
            </ol>

            <h4 className="font-bold mt-8 mb-2">Answering a Question:</h4>
            <ol className="list-decimal pl-5 space-y-2">
              {dummyInstructionData.instructions.answering.map((text, idx) => (
                <li key={`ans-${idx}`}>{text}</li>
              ))}
            </ol>
            
            {/* Some extra scroll space */}
            <div className="h-10"></div>
          </div>
        </div>

        {/* RIGHT SIDEBAR (Candidate Details - Standard iON layout) */}
        <div className="hidden md:flex flex-col w-[320px] bg-[#e4e9f0] shrink-0 border-l border-gray-300">
          
          <div className="flex flex-col items-center justify-center p-6 bg-white border-b border-gray-300 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded border-2 border-gray-300 flex items-center justify-center mb-4">
              <User className="w-12 h-12 text-gray-400" />
            </div>
            <div className="font-bold text-gray-800 text-lg">John Doe</div>
            <div className="font-semibold text-gray-500 text-sm mt-1">Candidate Profile</div>
          </div>

          <div className="p-6">
            <div className="bg-white p-4 rounded shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 text-[#337ab7] font-bold mb-3 pb-3 border-b border-gray-100">
                <Monitor className="w-5 h-5" /> System Name:
              </div>
              <div className="text-xl font-mono font-bold text-gray-700 text-center">
                C001
              </div>
            </div>
            
            <div className="mt-6 text-xs text-gray-500 font-semibold text-center leading-relaxed">
              Kindly verify your Name and Photograph.<br/>
              If it is not yours, please inform the invigilator immediately.
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER ACTION BAR (Checkbox & Start Button) */}
      <div className="flex flex-col bg-[#f8f9fa] border-t border-gray-300 shrink-0">
        <div className="p-4 border-b border-gray-200">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input 
              type="checkbox" 
              className="mt-1 w-5 h-5 text-[#337ab7] border-gray-300 rounded focus:ring-[#337ab7] cursor-pointer"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <span className="text-sm font-semibold text-red-600 group-hover:text-red-700 transition-colors leading-snug select-none">
              {dummyInstructionData.declaration}
            </span>
          </label>
        </div>
        
        <div className="flex justify-center md:justify-end items-center p-3 md:p-4 bg-white">
          <Button 
            disabled={!isChecked}
            className={`w-full md:w-auto px-10 py-5 text-base font-bold transition-all ${
              isChecked 
                ? "bg-[#337ab7] hover:bg-[#286090] text-white shadow-md" 
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            onClick={handleStartExam}
          >
            I am ready to begin
          </Button>
        </div>
      </div>

    </div>
  );
};

export default TestInstructions;