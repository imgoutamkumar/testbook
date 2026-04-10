import { useFieldArray } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { CustomInput } from "@/customComponent/input"
import SectionFieldArray from "./SectionFieldArray"

const TestFieldArray = ({ control, tsIndex }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `testSeries.${tsIndex}.tests`
  })

  return (
    <div className="border p-4 rounded">
      <h2>Tests</h2>

      {fields.map((field, tIndex) => (
        <div key={field.id} className="mb-4 border p-3">
          <CustomInput
            control={control}
            name={`testSeries.${tsIndex}.tests.${tIndex}.title`}
            label="Test Title"
          />

          <SectionFieldArray
            control={control}
            tIndex={tIndex}
            tsIndex={tsIndex}
          />

          <Button type="button" onClick={() => remove(tIndex)}>Remove Test</Button>
        </div>
      ))}

      <Button
        type="button"
        onClick={() =>
          append({
            title: "",
            duration: 60,
            totalMarks: 0,
            totalQuestions: 0,
            sections: []
          })
        }
      >
        + Add Test
      </Button>
    </div>
  )
}

export default TestFieldArray