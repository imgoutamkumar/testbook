import { useFieldArray } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { CustomInput } from "@/customComponent/input"
import OptionFieldArray from "./OptionFieldArray"

const QuestionFieldArray = ({ control, sIndex, tIndex, tsIndex }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `testSeries.${tsIndex}.tests.${tIndex}.sections.${sIndex}.questions`
  })

  return (
    <div className="border p-4 rounded">
      <h3>Questions</h3>

      {fields.map((field, qIndex) => (
        <div key={field.id} className="mb-4 border p-3">
          <CustomInput
            control={control}
            name={`testSeries.${tsIndex}.tests.${tIndex}.sections.${sIndex}.questions.${qIndex}.text`}
            label="Question"
          />

          <CustomInput
            control={control}
            name={`testSeries.${tsIndex}.tests.${tIndex}.sections.${sIndex}.questions.${qIndex}.marks`}
            label="Marks"
            type="number"
          />

          <OptionFieldArray
            control={control}
            qIndex={qIndex}
            sIndex={sIndex}
            tIndex={tIndex}
            tsIndex={tsIndex}
          />

          <Button type="button" onClick={() => remove(qIndex)}>Remove Question</Button>
        </div>
      ))}

      <Button
        type="button"
        onClick={() =>
          append({
            text: "",
            marks: 0,
            difficulty: "EASY",
            categoryId: "",
            options: [{ text: "", isCorrect: false }]
          })
        }
      >
        + Add Question
      </Button>
    </div>
  )
}

export default QuestionFieldArray