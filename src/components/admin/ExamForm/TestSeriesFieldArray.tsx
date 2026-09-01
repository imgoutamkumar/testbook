import { useFieldArray } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { CustomInput } from "@/customComponent/input"
import TestFieldArray from "./TestFieldArray"
import { Trash2 } from "lucide-react"

const TestSeriesFieldArray = ({ control }: any) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "testSeries"
  })

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Test Series Packages</h2>

      {fields.map((field, tsIndex) => (
        <div key={field.id} className="border-2 p-5 rounded-xl space-y-4 bg-card shadow-sm">
          <div className="flex justify-between items-center">
            <CustomInput
              control={control}
              name={`testSeries.${tsIndex}.title`}
              label="Test Series Title (e.g., IBPS PO Prelims 2024)"
            />
            <Button variant="outline" size="icon" type="button" onClick={() => remove(tsIndex)} disabled={fields.length <= 1}>
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>

          <TestFieldArray control={control} tsIndex={tsIndex} />
        </div>
      ))}

      <Button variant="outline" className="w-full border-dashed py-6" type="button" onClick={() => append({
        title: "",
        description: "",
        tests: []
      })}>
        + Add Another Test Series Package
      </Button>
    </div>
  )
}

export default TestSeriesFieldArray

// CollectionFieldArray.tsx (Rename from TestSeriesFieldArray)
// currently not in use