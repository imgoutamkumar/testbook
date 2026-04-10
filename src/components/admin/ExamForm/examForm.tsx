import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FileUpload } from '@/customComponent/fileupload'
import { CustomInput } from '@/customComponent/input'
import { MultiLevelSelect } from '@/customComponent/MultilevelSelect'
import { CustomRadioButton } from '@/customComponent/radiobutton'
import { CustomSelect } from '@/customComponent/select'
import { CustomTextarea } from '@/customComponent/textarea'
import { buildTree } from '@/helper/commonFunction'
import { useGetAttributesQuery, useGetAttributeValueByIdQuery, useLazyGetAttributeValueByIdQuery } from '@/redux/services/attributeApi'
import { useCreateBrandMutation, useGetBrandsQuery } from '@/redux/services/brandApi'
import { useCreateCategoryMutation, useGetCategoriesQuery } from '@/redux/services/categoryApi'
import { useCreateProductMutation } from '@/redux/services/productApi'
import { zodResolver } from '@hookform/resolvers/zod'
import { Star, Trash2, UploadCloud, X } from 'lucide-react'
import { useState } from 'react'
import { useForm, useFieldArray, useWatch } from 'react-hook-form'
import * as z from "zod"
import TestSeriesFieldArray from './TestSeriesFieldArray'

const currencyOptions = [
    { value: "INR", label: "Indian Rupee" },
    { value: "USD", label: "US Dollar" },
    { value: "EUR", label: "Euro" },
]
const statusOptions = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
]

const questionTypeOptions = [
    { value: "SINGLE", label: "SINGLE" },
    { value: "MULTIPLE", label: "MULTIPLE" },
    { value: "NUMERIC", label: "NUMERIC" },
    { value: "TRUE_FALSE", label: "TRUE_FALSE" },
]

const isPremiumOptions = [
    { value: "true", label: "True" },
    { value: "false", label: "False" },
]

const isCorrectOptions = [
    { value: "true", label: "True" },
    { value: "false", label: "False" },
]

const optionSchema = z.object({
    text: z.string().min(1, "Option text required"),
    isCorrect: z.boolean().default(false),
    order: z.number().int().optional()
})

const questionSchema = z.object({
    text: z.string().min(1, "Question required"),
    marks: z.number().int().positive(),
    negativeMarks: z.number().optional(),
    difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
    solutionText: z.string().optional(),
    solutionVideo: z.string().url().optional(),
    order: z.number().int().optional(),
    type: z.enum([
        "SINGLE",
        "MULTIPLE",
        "NUMERIC",
        "TRUE_FALSE"
    ]),
    categoryId: z.string().uuid(),
    options: z.array(optionSchema)
        .min(2, "Minimum 2 options required")
}).refine(q =>
    q.options.some(o => o.isCorrect),
    "At least one correct option required"
)

const sectionSchema = z.object({
    name: z.string().optional(),
    duration: z.number().int().optional(),
    totalQuestions: z.number().int(),
    totalMarks: z.number().int(),
    cutoffMarks: z.number().optional(),
    order: z.number().int().optional(),
    negativeMarks: z.number().optional(),
    categoryId: z.string().uuid(),
    questions: z.array(questionSchema)
        .min(1, "Section must contain questions")

})

const testSchema = z.object({

    title: z.string().min(3),
    description: z.string().optional(),
    duration: z.number().int(),
    totalMarks: z.number().int(),
    totalQuestions: z.number().int(),
    maxAttempts: z.number().int().default(1),
    order: z.number().int().optional(),
    startTime: z.coerce.date().optional(),
    endTime: z.coerce.date().optional(),
    negativeMarking: z.number().optional(),
    instructions: z.any().optional(),
    sections: z.array(sectionSchema)
        .min(1, "Test needs sections")

})

const testSeriesSchema = z.object({

    title: z.string().min(3),
    description: z.string().optional(),
    thumbnail: z.string().optional(),
    price: z.number().optional(),
    isPremium: z.boolean().default(false),
    isPublished: z.boolean().default(false),
    tests: z.array(testSchema)
        .min(1, "TestSeries needs tests")

})
export const createExamSchema = z.object({
    name: z.string()
        .min(3, "Exam name required"),
    description: z.string().optional(),
    thumbnail: z.string().optional(),
    testSeries: z.array(testSeriesSchema)
        .min(1, "At least one test series required")
})

const Steps = [
    { id: "1", name: "Basic Details", formFieldname: ["productname", "brand_id", "category_id", "currency", "status"] as const },
    { id: "2", name: "Variants Details", formFieldname: ["variants"] as const },
]

const ExamForm = () => {
    const [currentStep, setCurrentStep] = useState(1)
    type NewExamFormInput = z.input<typeof createExamSchema>
    type NewExamFormOutput = z.output<typeof createExamSchema>
    const [createProduct, { isLoading }] = useCreateProductMutation()
    const [createCategory, { isLoading: isCategoryCreating }] = useCreateCategoryMutation()
    const { data: categories, isLoading: isCategoryLoading } = useGetCategoriesQuery()


    const categoryTree = buildTree(categories?.data)

    const form = useForm<NewExamFormInput>({
        resolver: zodResolver(createExamSchema),
        mode: "onTouched",
        defaultValues: {
            name: "",
            description: "",
            thumbnail: "",
            testSeries: [
                {
                    title: "",
                    description: "",
                    price: 0,
                    isPremium: false,
                    thumbnail: "",
                    isPublished: false,
                    tests: [
                        {
                            title: "",
                            description: "",
                            duration: 60,
                            totalMarks: 0,
                            totalQuestions: 0,
                            maxAttempts: 3,
                            negativeMarking: 0,
                            sections: [
                                {
                                    name: "",
                                    duration: 30,
                                    totalQuestions: 0,
                                    totalMarks: 0,
                                    cutoffMarks: 0,
                                    order: 0,
                                    questions: [
                                        {
                                            text: "",
                                            marks: 0,
                                            difficulty: 'EASY',
                                            solutionText: "",
                                            order: 0,
                                            categoryId: "",
                                            options: [
                                                {
                                                    text: "",
                                                    isCorrect: false,
                                                    order: 0
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]

                }
            ]
        },
    })


    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'testSeries'
    })

    const buildExamFormData = (
        values: z.infer<typeof createExamSchema>
    ) => {

        const formData = new FormData()

        // ---------------- PRODUCT ----------------
        formData.append("name", values.name)
        formData.append("description", values.description)



        // if (values.is_cod_available)
        //     formData.append("is_cod_available", values.is_cod_available)

        // ---------------- VARIANTS JSON ----------------
        const testSeriesPayload = values.testSeries.map((ts) => ({
            title: ts.title,
            description: ts.description,
            thumbnail: ts.thumbnail,
            price: Number(ts.price || 0),
            isPremium: ts.isPremium || false,
            tests: ts.tests.map(test => ({
                title: test.title,
                description: test.description,
                duration: Number(test.duration),
                totalMarks: Number(test.totalMarks),
                totalQuestions: Number(test.totalQuestions),
                maxAttempts: Number(test.maxAttempts ?? 1),
                order: test.order,
                startTime: test.startTime,
                endTime: test.endTime,
                negativeMarking: test.negativeMarking,
                instructions: test.instructions,
                sections: (test.sections ?? []).map(section => ({
                    name: section.name,
                    duration: Number(section.duration ?? 0),
                    totalQuestions: Number(section.totalQuestions),
                    totalMarks: Number(section.totalMarks),
                    cutoffMarks: Number(section.cutoffMarks ?? 0),
                    order: section.order,
                    negativeMarks: section.negativeMarks,
                    categoryId: section.categoryId,
                    questions: section.questions.map(q => ({
                        text: q.text,
                        marks: Number(q.marks),
                        negativeMarks: Number(q.negativeMarks ?? 0),
                        difficulty: q.difficulty,
                        solutionText: q.solutionText,
                        solutionVideo: q.solutionVideo,
                        order: q.order,
                        type: q.type,
                        categoryId: q.categoryId,
                        options: q.options.map(opt => ({
                            text: opt.text,
                            isCorrect: opt.isCorrect,
                            order: opt.order
                        }))

                    }))

                }))

            }))
        }))

        formData.append(
            "testSeries",
            JSON.stringify(testSeriesPayload)
        )

        return formData
    }


    const onNewExamFormSubmit = async (
        values: z.input<typeof createExamSchema>
    ) => {
        console.log("FORM VALUES:", values)

        const parsedValues: NewExamFormOutput =
            createExamSchema.parse(values)

        const formData = buildExamFormData(parsedValues)
        await createProduct(formData)
    }

    // Navigation handlers
    const handleNext = async () => {
        const formfields = Steps[currentStep - 1].formFieldname
        const isValid = await form.trigger(formfields)
        if (!isValid) return

        if (currentStep < Steps.length) setCurrentStep((prev) => prev + 1)
    }

    const handlePrevious = () => {
        if (currentStep > 1) setCurrentStep((prev) => prev - 1)
    }

    return (
        <div className='w-full h-full flex flex-col p-4 '>
            <h3 className='text-2xl font-bold pb-4'>Create New Product</h3>

            <Card>
                <CardHeader>
                    <CardTitle>Create an Exam</CardTitle>
                    <CardDescription>Step {currentStep} of {Steps?.length}</CardDescription>

                    {/* Stepper Indicator */}
                    <div className="flex justify-around mt-4 relative">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 -z-10"></div>
                        <div
                            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary transition-all duration-300 -z-10"
                            style={{ width: `${((currentStep - 1) / (Steps.length - 1)) * 100}%` }}
                        ></div>

                        {Steps?.map((step: any) => (
                            <div
                                key={step?.id}
                                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors ${currentStep >= step.id
                                    ? "bg-[#2d72e8] border-primary text-primary-foreground"
                                    : "bg-background border-slate-300 text-slate-500"
                                    }`}
                            >
                                {step?.id}
                            </div>
                        ))}
                    </div>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                    <Form {...form}>
                        <form
                            id="product-form"
                            className="flex flex-col w-full gap-4"
                            onSubmit={form.handleSubmit(onNewExamFormSubmit)}
                        >
                            {currentStep === 1 && (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                                        <CustomInput control={form.control} name="name" label="Exam Name" />
                                        {/* <CustomSelect control={form.control} name="brand_id" label="Brands" options={brandOptions} isLoading={isBrandLoading} />
                                        <MultiLevelSelect tree={categoryTree} label='Category' onChange={(val) => form.setValue("category_id", val)} title="Select Category" /> */}
                                    </div>
                                    {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                                        <CustomInput control={form.control} name="description" label="Description" />
                                        <CustomSelect control={form.control} name="currency" label="Currency" options={currencyOptions} />
                                        <CustomSelect control={form.control} name="status" label="Status" options={statusOptions} />
                                    </div> */}
                                    <CustomTextarea
                                        control={form.control}
                                        name="description"
                                        label="Description"
                                    />
                                </>
                            )}

                            {currentStep === 2 && (
                                <>
                                    {
                                        fields.map((field, index) => (
                                            <TestSeriesFieldArray
                                                key={field?.id}
                                                control={form.control}
                                                index={index}
                                                remove={remove}
                                                setValue={form.setValue}
                                            />
                                        ))}

                                    < Button
                                        variant={'outline'}
                                        type="button"
                                        onClick={() => append({
                                            sku: '',
                                            price: '',
                                            stock: '',
                                            attributes: [{ type: '', value_id: '' }],
                                            images: []
                                        })}
                                    >
                                        + Add More TestSeries
                                    </Button>
                                </>
                            )
                            }

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

                    {currentStep < Steps.length ? (
                        <Button type="button" onClick={(e) => {
                            e.preventDefault()
                            handleNext()
                        }}>Next</Button>
                    ) : (
                        <Button
                            form="product-form"
                            className="cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed w-fit"
                            // disabled={!form.formState.isValid || isLoading}
                            type="submit">
                            {isLoading ? "Creating..." : "Create Product"}
                        </Button>
                    )}
                </CardFooter>
            </Card >

            <div className='flex justify-end my-2'>

            </div>

        </div >
    )

}



export default ExamForm
