import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { CustomInput } from '@/customComponent/input'
import { CustomTextarea } from '@/customComponent/textarea'
import { useCreateProductMutation } from '@/redux/services/productApi'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from "zod"
import TestSeriesFieldArray from './TestSeriesFieldArray'

/* ---------------- SCHEMA ---------------- */

const optionSchema = z.object({
  text: z.string().min(1, "Option text required"),
  isCorrect: z.boolean().default(false),
  order: z.number().int().optional()
})

const questionSchema = z.object({
  text: z.string().min(1),
  marks: z.number().int().positive(),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  type: z.enum(["SINGLE", "MULTIPLE", "NUMERIC", "TRUE_FALSE"]),
  categoryId: z.string(),
  options: z.array(optionSchema).min(2)
}).refine(q => q.options.some(o => o.isCorrect), {
  message: "At least one correct option required"
})

const sectionSchema = z.object({
  name: z.string().optional(),
  totalQuestions: z.number().int(),
  totalMarks: z.number().int(),
  categoryId: z.string(),
  questions: z.array(questionSchema).min(1)
})

const testSchema = z.object({
  title: z.string().min(3),
  duration: z.number().int(),
  totalMarks: z.number().int(),
  totalQuestions: z.number().int(),
  sections: z.array(sectionSchema).min(1)
})

const testSeriesSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  price: z.number().optional(),
  isPremium: z.boolean().default(false),
  tests: z.array(testSchema).min(1)
})

export const createExamSchema = z.object({
  name: z.string().min(3),
  description: z.string().optional(),
  testSeries: z.array(testSeriesSchema).min(1)
})

/* ---------------- FORM ---------------- */

const ExamForm = () => {
  const [currentStep, setCurrentStep] = useState(1)

  const [createProduct, { isLoading }] = useCreateProductMutation()

  const form = useForm({
    resolver: zodResolver(createExamSchema),
    defaultValues: {
      name: "",
      description: "",
      testSeries: [
        {
          title: "",
          description: "",
          price: 0,
          isPremium: false,
          tests: [
            {
              title: "",
              duration: 60,
              totalMarks: 0,
              totalQuestions: 0,
              sections: [
                {
                  name: "",
                  totalQuestions: 0,
                  totalMarks: 0,
                  categoryId: "",
                  questions: [
                    {
                      text: "",
                      marks: 1,
                      difficulty: "EASY",
                      type: "SINGLE",
                      categoryId: "",
                      options: [
                        { text: "", isCorrect: false },
                        { text: "", isCorrect: false }
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

  /* ---------------- BUILD FORM DATA ---------------- */

  const buildExamFormData = (values: z.infer<typeof createExamSchema>) => {
    const formData = new FormData()

    formData.append("name", values.name)
    formData.append("description", values.description || "")

    formData.append("testSeries", JSON.stringify(values.testSeries))

    return formData
  }

  /* ---------------- SUBMIT ---------------- */

  const onSubmit = async (values: z.infer<typeof createExamSchema>) => {
    const formData = buildExamFormData(values)
    await createProduct(formData)
  }

  /* ---------------- NAVIGATION ---------------- */

  const handleNext = async () => {
    const isValid = await form.trigger(["name"])
    if (!isValid) return
    setCurrentStep(2)
  }

  const handlePrevious = () => {
    setCurrentStep(1)
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="w-full h-full flex flex-col p-4">
      <h3 className="text-2xl font-bold pb-4">Create Exam</h3>

      <Card>
        <CardHeader>
          <CardTitle>Create an Exam</CardTitle>
          <CardDescription>Step {currentStep} of 2</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              id="exam-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >

              {/* STEP 1 */}
              {currentStep === 1 && (
                <>
                  <CustomInput
                    control={form.control}
                    name="name"
                    label="Exam Name"
                  />

                  <CustomTextarea
                    control={form.control}
                    name="description"
                    label="Description"
                  />
                </>
              )}

              {/* STEP 2 */}
              {currentStep === 2 && (
                <TestSeriesFieldArray
                  control={form.control}
                  index={0}   // ✅ ALWAYS ONE
                  remove={() => {}} // disabled
                  setValue={form.setValue}
                />
              )}

            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            type="button"
          >
            Previous
          </Button>

          {currentStep === 1 ? (
            <Button type="button" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button
              form="exam-form"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Exam"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

export default ExamForm