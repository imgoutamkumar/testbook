import { useFieldArray } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { CustomInput } from "@/customComponent/input"
import TestFieldArray from "./TestFieldArray"
import { Trash, Trash2 } from "lucide-react"

const TestSeriesFieldArray = ({ control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "testSeries"
  })

  return (
    <div>
      <h1 className="text-xl font-bold">Test Series</h1>

      {fields.map((field, tsIndex) => (
        <div key={field.id} className="border p-4 mb-4">
          <CustomInput
            control={control}
            name={`testSeries.${tsIndex}.title`}
            label="Series Title"
          />

          <TestFieldArray control={control} tsIndex={tsIndex} />

          <Button variant="outline" type="button" onClick={() => remove(tsIndex)}>
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      ))}

      <Button
      variant="outline"
      className="w-full"
        type="button"
        onClick={() =>
          append({
            title: "",
            tests: []
          })
        }
      >
        + Add Test Series
      </Button>
    </div>
  )
}

export default TestSeriesFieldArray