import { useFieldArray } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { CustomInput } from "@/customComponent/input"
import { CustomRadioButton } from "@/customComponent/radiobutton"

const OptionFieldArray = ({ control, qIndex, sIndex, tIndex, tsIndex }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `testSeries.${tsIndex}.tests.${tIndex}.sections.${sIndex}.questions.${qIndex}.options`
  })

  return (
    <div className="border p-3 rounded">
      <h4 className="font-semibold">Options</h4>

      {fields.map((field, optIndex) => (
        <div key={field.id} className="flex gap-2 items-center">
          <CustomInput
            control={control}
            name={`testSeries.${tsIndex}.tests.${tIndex}.sections.${sIndex}.questions.${qIndex}.options.${optIndex}.text`}
            label={`Option ${optIndex + 1}`}
          />

          <CustomRadioButton
            control={control}
            name={`testSeries.${tsIndex}.tests.${tIndex}.sections.${sIndex}.questions.${qIndex}.options.${optIndex}.isCorrect`}
            label="Correct"
          />

          <Button type="button" onClick={() => remove(optIndex)}>X</Button>
        </div>
      ))}

      <Button
        type="button"
        onClick={() => append({ text: "", isCorrect: false })}
      >
        + Add Option
      </Button>
    </div>
  )
}

export default OptionFieldArray