import { useFieldArray } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { CustomInput } from "@/customComponent/input"
import { CustomRadioButton } from "@/customComponent/radiobutton"
import { Trash2 } from "lucide-react"

const correctOptions = [
  { label: "Correct", value: "true" },
  { label: "Incorrect", value: "false" }
]

const OptionFieldArray = ({ control, qIndex, sIndex, tIndex, cIndex }: any) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `collections.${cIndex}.tests.${tIndex}.sections.${sIndex}.questions.${qIndex}.options` // <-- FIXED
  })

  return (
    <div className="border border-dashed p-3 rounded-md bg-secondary/20 space-y-3">
      <h4 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Question Options</h4>

      {fields.map((field, optIndex) => (
        <div key={field.id} className="flex gap-2 items-center">
          <CustomInput
            control={control}
            name={`collections.${cIndex}.tests.${tIndex}.sections.${sIndex}.questions.${qIndex}.options.${optIndex}.content`} // <-- FIXED: Must be "content" not "text"
            label={`Option ${optIndex + 1} Content`}
          />

          <CustomRadioButton
            control={control}
            name={`collections.${cIndex}.tests.${tIndex}.sections.${sIndex}.questions.${qIndex}.options.${optIndex}.isCorrect`} // <-- FIXED
            label="Status"
            options={correctOptions}
          />

          <Button variant="ghost" type="button" onClick={() => remove(optIndex)} disabled={fields.length <= 2}>
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      ))}

      <Button variant="outline" size="sm" type="button" onClick={() => append({ content: "", isCorrect: false })}>
        + Add Option
      </Button>
    </div>
  )
}

export default OptionFieldArray