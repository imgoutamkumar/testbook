import { useFieldArray } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { CustomInput } from "@/customComponent/input"
import QuestionFieldArray from "./QuestionFieldArray"

const SectionFieldArray = ({ control, tIndex, tsIndex }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `testSeries.${tsIndex}.tests.${tIndex}.sections`
  })

  return (
    <div className="border p-4 rounded">
      <h2>Sections</h2>

      {fields.map((field, sIndex) => (
        <div key={field.id} className="mb-4 border p-3">
          <CustomInput
            control={control}
            name={`testSeries.${tsIndex}.tests.${tIndex}.sections.${sIndex}.name`}
            label="Section Name"
          />

          <QuestionFieldArray
            control={control}
            sIndex={sIndex}
            tIndex={tIndex}
            tsIndex={tsIndex}
          />

          <Button type="button" onClick={() => remove(sIndex)}>Remove Section</Button>
        </div>
      ))}

      <Button
        type="button"
        onClick={() =>
          append({
            name: "",
            totalMarks: 0,
            totalQuestions: 0,
            categoryId: "",
            questions: []
          })
        }
      >
        + Add Section
      </Button>
    </div>
  )
}

export default SectionFieldArray