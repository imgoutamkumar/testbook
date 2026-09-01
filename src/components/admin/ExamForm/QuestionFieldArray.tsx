import { useFieldArray } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { CustomInput } from "@/customComponent/input"
import { CustomSelect } from "@/customComponent/select"
import OptionFieldArray from "./OptionFieldArray"
import { Trash2 } from "lucide-react"
import { AccordionTrigger, AccordionContent, Accordion, AccordionItem } from '@/components/ui/accordion';

const difficultyOptions = [
  { label: "Easy", value: "EASY" },
  { label: "Medium", value: "MEDIUM" },
  { label: "Hard", value: "HARD" }
];

const questionTypeOptions = [
  { label: "Single Choice (MCQ)", value: "SINGLE_CHOICE" },
  { label: "Multiple Choice (MSQ)", value: "MULTIPLE_CHOICE" },
  { label: "Numeric Input (NAT)", value: "NUMERIC_INPUT" }
];

const QuestionFieldArray = ({ control, sIndex, tIndex, cIndex }: any) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `collections.${cIndex}.tests.${tIndex}.sections.${sIndex}.questions`
  })

  return (
    <div className="space-y-4 my-2 border-t pt-4">
      <h3 className="font-semibold text-sm text-slate-700">Questions</h3>

      <Accordion type="multiple" className="w-full space-y-3">
        {fields.map((field, qIndex) => (
          <AccordionItem 
            key={field.id} 
            value={field.id} 
            className="border rounded-lg bg-card shadow-sm overflow-hidden"
          >
            {/* Header: Trigger + Delete Button */}
            <div className="flex items-center w-full pr-4 border-b bg-slate-50/50">
              <AccordionTrigger className="flex-1 px-4 hover:no-underline text-sm font-semibold text-slate-600">
                Question #{qIndex + 1}
              </AccordionTrigger>
              <Button 
                variant="ghost" 
                size="sm" 
                type="button" 
                onClick={() => remove(qIndex)}
                className="text-red-500 hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4 mr-1" /> Remove
              </Button>
            </div>

            {/* Body: Inputs inside the collapsible content */}
            <AccordionContent className="p-4 space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-start">
                <CustomInput control={control} name={`collections.${cIndex}.tests.${tIndex}.sections.${sIndex}.questions.${qIndex}.subject`} label="Subject" />
                <CustomInput control={control} name={`collections.${cIndex}.tests.${tIndex}.sections.${sIndex}.questions.${qIndex}.topic`} label="Topic" />
                <CustomSelect control={control} name={`collections.${cIndex}.tests.${tIndex}.sections.${sIndex}.questions.${qIndex}.difficulty`} label="Difficulty" options={difficultyOptions} />
                <CustomSelect control={control} name={`collections.${cIndex}.tests.${tIndex}.sections.${sIndex}.questions.${qIndex}.type`} label="Type" options={questionTypeOptions} />
              </div>

              <CustomInput
                control={control}
                name={`collections.${cIndex}.tests.${tIndex}.sections.${sIndex}.questions.${qIndex}.content`}
                label="Question Statement (Supports HTML)"
              />

              <div className="grid grid-cols-2 gap-4 items-start">
                 <CustomInput control={control} name={`collections.${cIndex}.tests.${tIndex}.sections.${sIndex}.questions.${qIndex}.marks`} label="Marks (+ve)" type="number" />
                 <CustomInput control={control} name={`collections.${cIndex}.tests.${tIndex}.sections.${sIndex}.questions.${qIndex}.negativeMarks`} label="Negative Penalty" type="number" />
              </div>

              <OptionFieldArray control={control} qIndex={qIndex} sIndex={sIndex} tIndex={tIndex} cIndex={cIndex} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Button variant="secondary" size="sm" type="button" onClick={() => append({
        subject: "", topic: "", content: "", marks: 1, negativeMarks: 0.25, difficulty: "MEDIUM", type: "SINGLE_CHOICE",
        options: [{ content: "", isCorrect: false }, { content: "", isCorrect: false }]
      })}>
        + Add Question
      </Button>
    </div>
  )
}

export default QuestionFieldArray