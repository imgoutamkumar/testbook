import { useState } from 'react';
import * as XLSX from 'xlsx';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useCreateCollectionMutation, useCreateQuestionMutation, useCreateTestMutation } from '@/redux/services/testApi';

const BulkExamUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState("");

  const [createCollection] = useCreateCollectionMutation();
  const [createTest] = useCreateTestMutation();
  const [createQuestion] = useCreateQuestionMutation();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const processExcel = async () => {
    if (!file) return alert("Please select a file first.");
    setIsProcessing(true);
    setProgress("Parsing Excel file...");

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const rows: any[] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        setProgress("Grouping data into nested architecture...");

        // 1. Group the flat Excel rows into our Nested JSON Architecture
        const nestedData = groupExcelData(rows);

        // 2. Deploy to Backend (Reusing our highly optimized Orchestrator Logic)
        await deployArchitecture(nestedData);

      } catch (error) {
        console.error("Upload Error:", error);
      } finally {
        setIsProcessing(false);
        setProgress("");
      }
    };
    reader.readAsBinaryString(file);
  };

  // ---------------------------------------------------------
  // HELPER 1: Convert Flat Excel Rows to Nested JSON
  // ---------------------------------------------------------
  const groupExcelData = (rows: any[]) => {
    const collectionsMap: any = {};

    rows.forEach(row => {
      const collName = row['Collection Name'];
      const testTitle = row['Test Title'];
      const secName = row['Section Name'];

      // Build Collection
      if (!collectionsMap[collName]) {
        collectionsMap[collName] = { name: collName, type: "TEST_SERIES", tests: {} };
      }

      // Build Test
      if (!collectionsMap[collName].tests[testTitle]) {
        collectionsMap[collName].tests[testTitle] = {
          title: testTitle, type: "FULL_MOCK", totalDuration: 3600, totalMarks: 100, sections: {}
        };
      }

      // Build Section
      if (!collectionsMap[collName].tests[testTitle].sections[secName]) {
        collectionsMap[collName].tests[testTitle].sections[secName] = {
          name: secName, duration: 1200, order: Object.keys(collectionsMap[collName].tests[testTitle].sections).length + 1, questions: []
        };
      }

      // Format Options Array based on the Correct Option Column
      const correctOptIndex = Number(row['Correct Opt (1-4)']);
      const options = [
        { content: String(row['Opt 1']), isCorrect: correctOptIndex === 1 },
        { content: String(row['Opt 2']), isCorrect: correctOptIndex === 2 },
        { content: String(row['Opt 3']), isCorrect: correctOptIndex === 3 },
        { content: String(row['Opt 4']), isCorrect: correctOptIndex === 4 },
      ].filter(opt => opt.content !== "undefined" && opt.content.trim() !== "");

      // Push Question to Section
      collectionsMap[collName].tests[testTitle].sections[secName].questions.push({
        subject: row['Subject'],
        topic: row['Topic'],
        content: row['Question Content'],
        type: row['Q Type'] || "SINGLE_CHOICE",
        difficulty: row['Difficulty'] || "MEDIUM",
        marks: Number(row['Marks']),
        negativeMarks: Number(row['Neg Marks']),
        options
      });
    });

    // Convert Maps back to Arrays
    return Object.values(collectionsMap).map((c: any) => ({
      ...c,
      tests: Object.values(c.tests).map((t: any) => ({
        ...t,
        sections: Object.values(t.sections)
      }))
    }));
  };

  // ---------------------------------------------------------
  // HELPER 2: The Orchestrator (Same as your UI form!)
  // ---------------------------------------------------------
  const deployArchitecture = async (collections: any[]) => {
    for (const coll of collections) {
      setProgress(`Creating Collection: ${coll.name}...`);
      const collRes = await createCollection({ name: coll.name, type: coll.type }).unwrap();
      const collectionId = collRes.data.id;

      for (const test of coll.tests) {
        setProgress(`Creating Test: ${test.title}...`);
        const backendSections = [];

        for (const section of test.sections) {
          setProgress(`Uploading Questions for Section: ${section.name}...`);

          // FAANG Optimization: Concurrent Question Upload
          // const questionPromises = section.questions.map((q: any) => 
          //   createQuestion({
          //     subject: q.subject, topic: q.topic, difficulty: q.difficulty, type: q.type,
          //     content: { EN: q.content },
          //     options: q.options.map((opt: any) => ({ content: { EN: opt.content }, isCorrect: opt.isCorrect }))
          //   }).unwrap()
          // );

          // const createdQuestions = await Promise.all(questionPromises);

          // const mappedQuestions = createdQuestions.map((qRes, index) => ({
          //   questionId: qRes.data.id,
          //   marks: section.questions[index].marks,
          //   negativeMarks: section.questions[index].negativeMarks
          // }));

          const mappedQuestions = [];

          for (let i = 0; i < section.questions.length; i++) {
            const q = section.questions[i];
            setProgress(`Uploading Question ${i + 1} of ${section.questions.length} for Section: ${section.name}...`);

            // Await each question one-by-one so the database doesn't choke
            const qRes = await createQuestion({
              subject: q.subject,
              topic: q.topic,
              difficulty: q.difficulty,
              type: q.type,
              content: { EN: q.content },
              options: q.options.map((opt: any) => ({
                content: { EN: opt.content },
                isCorrect: opt.isCorrect
              }))
            }).unwrap();

            mappedQuestions.push({
              questionId: qRes.data.id,
              marks: q.marks,
              negativeMarks: q.negativeMarks
            });
          }

          backendSections.push({
            name: section.name, duration: section.duration, order: section.order, questions: mappedQuestions
          });
        }

        setProgress(`Finalizing Test Architecture...`);
        await createTest({
          title: test.title, type: test.type, totalDuration: test.totalDuration, totalMarks: test.totalMarks,
          collectionIds: [collectionId], sections: backendSections
        }).unwrap();
      }
    }
    alert("Bulk Upload Complete!");
  };

  return (
    <Card className="max-w-xl mx-auto mt-10">
      <CardHeader>
        <CardTitle>Bulk Upload Exams via Excel</CardTitle>
        <CardDescription>Upload an .xlsx file using the standardized template.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <input
          type="file"
          accept=".xlsx, .xls, .csv"
          onChange={handleFileUpload}
          className="border p-2 w-full rounded"
        />
        {progress && <p className="text-sm font-semibold text-blue-600 animate-pulse">{progress}</p>}
      </CardContent>
      <CardFooter>
        <Button onClick={processExcel} disabled={!file || isProcessing} className="w-full">
          {isProcessing ? "Processing Upload..." : "Upload & Deploy"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BulkExamUpload;