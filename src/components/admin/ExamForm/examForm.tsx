import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from "zod"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { CustomInput } from '@/customComponent/input'
import CollectionFieldArray from './CollectionFieldArray' // Fixed import usage

// RTK Query hooks
import { 
  useCreateCollectionMutation, 
  useCreateTestMutation, 
  useCreateQuestionMutation 
} from '@/redux/services/testApi'

/* ---------------- 1. SCHEMA ---------------- */

const optionSchema = z.object({
  content: z.string().min(1, "Option text required"),
  isCorrect: z.boolean().default(false),
})

const questionSchema = z.object({
  subject: z.string().min(1, "Subject required (e.g., Math)"),
  topic: z.string().min(1, "Topic required (e.g., Algebra)"),
  content: z.string().min(1, "Question text required"), 
  marks: z.coerce.number().positive(),
  negativeMarks: z.coerce.number().min(0).default(0),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]).default("MEDIUM"),
  type: z.enum(["SINGLE_CHOICE", "MULTIPLE_CHOICE", "NUMERIC_INPUT"]).default("SINGLE_CHOICE"),
  options: z.array(optionSchema).min(2),
})

const sectionSchema = z.object({
  name: z.string().min(1, "Section name required"),
  duration: z.coerce.number().int().optional(), 
  order: z.coerce.number().int().default(1),
  questions: z.array(questionSchema).min(1, "At least one question required")
})

const testSchema = z.object({
  title: z.string().min(3, "Test title required"),
  type: z.enum(["FULL_MOCK", "SECTIONAL", "TOPIC", "PREVIOUS_YEAR", "LIVE"]).default("FULL_MOCK"),
  totalDuration: z.coerce.number().int().positive("Duration required (seconds)"),
  totalMarks: z.coerce.number().int().positive("Total marks required"),
  strictNavigation: z.boolean().default(false),
  liveStartTime: z.string().optional(),
  liveEndTime: z.string().optional(),
  sections: z.array(sectionSchema).min(1)
})

const collectionSchema = z.object({
  name: z.string().min(3, "Collection title required"),
  type: z.enum(["ROOT_CATEGORY", "EXAM", "TEST_SERIES", "SUBJECT_BUNDLE"]).default("TEST_SERIES"),
  tests: z.array(testSchema).min(1)
})

export const createExamSchema = z.object({
  parentId: z.string().optional(), // Fixed naming
  collections: z.array(collectionSchema).min(1)
})

/* ---------------- 2. EXAM FORM CONTAINER ---------------- */

const ExamForm = () => {
  const [currentStep, setCurrentStep] = useState(1)
  
  const [createCollection, { isLoading: isCollLoading }] = useCreateCollectionMutation()
  const [createTest, { isLoading: isTestLoading }] = useCreateTestMutation()
  const [createQuestion, { isLoading: isQuesLoading }] = useCreateQuestionMutation()

  const isLoading = isCollLoading || isTestLoading || isQuesLoading;

  const form = useForm({
    resolver: zodResolver(createExamSchema),
    defaultValues: {
      parentId: "", // Corresponds to Zod schema
      collections: [
        {
          name: "",
          type: "TEST_SERIES",
          tests: [
            {
              title: "",
              type: "FULL_MOCK",
              totalDuration: 3600,
              totalMarks: 100,
              strictNavigation: false,
              sections: [
                {
                  name: "Quantitative Aptitude",
                  duration: 1200,
                  order: 1,
                  questions: [
                    {
                      subject: "Math",
                      topic: "General",
                      content: "",
                      marks: 1,
                      negativeMarks: 0.25,
                      difficulty: "MEDIUM",
                      type: "SINGLE_CHOICE",
                      options: [
                        { content: "", isCorrect: false },
                        { content: "", isCorrect: false }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  })

  /* ---------------- 3. OPTIMIZED SUBMIT HANDLER ---------------- */
  const onSubmit = async (values: z.infer<typeof createExamSchema>) => {
    try {
      for (const collectionData of values.collections) {
        
        // Step 1: Create the Collection
        const collRes = await createCollection({
          name: collectionData.name,
          type: collectionData.type,
          parentId: values.parentId || null // Converts empty string to null safely
        }).unwrap();
        const collectionId = collRes.data.id;

        // Step 2: Iterate over Tests
        for (const test of collectionData.tests) {
          const backendSections = [];

          // Step 3: Iterate over Sections
          for (const section of test.sections) {
            
            // 🔥 FAANG OPTIMIZATION: Fire all question creation requests simultaneously!
            // This turns 30 sequential HTTP requests into 1 fast parallel batch.
            const questionPromises = section.questions.map(q => 
              createQuestion({
                subject: q.subject,
                topic: q.topic,
                difficulty: q.difficulty,
                type: q.type,
                content: { EN: q.content }, // Format for multilingual DB
                options: q.options.map(opt => ({ content: { EN: opt.content }, isCorrect: opt.isCorrect }))
              }).unwrap()
            );

            // Wait for all questions in this section to be created
            const createdQuestions = await Promise.all(questionPromises);

            // Map the returned IDs to the format the Test API expects
            const mappedQuestions = createdQuestions.map((qRes, index) => ({
              questionId: qRes.data.id,
              marks: section.questions[index].marks,
              negativeMarks: section.questions[index].negativeMarks
            }));

            // Construct backend-ready section
            backendSections.push({
              name: section.name,
              duration: section.duration,
              order: section.order,
              questions: mappedQuestions
            });
          }

          // Step 4: Create Test & Link to Collection + Mapped Sections
          await createTest({
            title: test.title,
            type: test.type,
            totalDuration: test.totalDuration,
            totalMarks: test.totalMarks,
            strictNavigation: test.strictNavigation,
            liveStartTime: test.liveStartTime || null,
            liveEndTime: test.liveEndTime || null,
            collectionIds: [collectionId],
            sections: backendSections
          }).unwrap();
        }
      }

      alert("Architecture & Tests deployed successfully!");
    } catch (error) {
      console.error("Failed to deploy architecture:", error);
      alert("Error deploying exam data.");
    }
  }

  const handleNext = async () => {
    // Fixed trigger name to match Zod schema
    const isValid = await form.trigger(["parentId"])
    if (!isValid) return
    setCurrentStep(2)
  }

  const handlePrevious = () => setCurrentStep(1)

  return (
    <div className="w-full h-full flex flex-col p-4 max-w-5xl mx-auto">
      <h3 className="text-2xl font-bold pb-4">Exam & Test Builder</h3>

      <Card>
        <CardHeader>
          <CardTitle>Configure Mock Test Architecture</CardTitle>
          <CardDescription>Step {currentStep} of 2</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form id="exam-form" onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">

              {/* STEP 1: Select Master Parent ID */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <CustomInput
                    control={form.control}
                    name="parentId" // Fixed from "examId"
                    label="Parent Collection ID (Optional)"
                  />
                  <p className="text-xs text-muted-foreground">
                    Tip: If this belongs to a Master Exam (like IBPS PO), paste its UUID here. Leave blank to make this a standalone Root Collection.
                  </p>
                </div>
              )}

              {/* STEP 2: Collections -> Tests -> Sections -> Questions */}
              {currentStep === 2 && (
                <CollectionFieldArray // Fixed component rendering
                  control={form.control}
                  setValue={form.setValue}
                />
              )}

            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex justify-between border-t pt-4">
          <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1} type="button">
            Previous
          </Button>

          {currentStep === 1 ? (
            <Button type="button" onClick={handleNext}>
              Next: Build Content
            </Button>
          ) : (
            <Button form="exam-form" type="submit" disabled={isLoading} className="bg-green-600 hover:bg-green-700 text-white">
              {isLoading ? "Deploying Architecture..." : "Publish Exam Suite"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

export default ExamForm