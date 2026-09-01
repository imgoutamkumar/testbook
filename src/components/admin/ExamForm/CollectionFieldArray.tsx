import { useFieldArray } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { CustomInput } from "@/customComponent/input"
import { CustomSelect } from "@/customComponent/select" // <-- Imported Select
import TestFieldArray from "./TestFieldArray"
import { Trash2 } from "lucide-react"

const collectionTypeOptions = [
  { label: "Test Series", value: "TEST_SERIES" },
  { label: "Subject Bundle", value: "SUBJECT_BUNDLE" },
  { label: "Master Exam", value: "EXAM" },
  { label: "Root Category", value: "ROOT_CATEGORY" }
];

const CollectionFieldArray = ({ control, setValue }: any) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "collections"
  })

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Content Collections</h2>

      {fields.map((field, cIndex) => (
        <div key={field.id} className="border-2 p-5 rounded-xl space-y-4 bg-card shadow-sm">
          
          <div className="flex justify-between items-center border-b pb-2 mb-4">
             <h3 className="font-semibold text-lg">Collection #{cIndex + 1}</h3>
             <Button variant="destructive" size="sm" type="button" onClick={() => remove(cIndex)} disabled={fields.length <= 1}>
               <Trash2 className="w-4 h-4 mr-2" /> Remove Collection
             </Button>
          </div>

          {/* FIXED LAYOUT: items-start prevents jumping on validation error */}
          <div className="grid grid-cols-2 gap-4 items-start">
            <CustomInput
              control={control}
              name={`collections.${cIndex}.name`}
              label="Collection Name (e.g., Banking Sectionals)"
            />
            
            <CustomSelect
              control={control}
              name={`collections.${cIndex}.type`}
              label="Collection Type"
              options={collectionTypeOptions}
            />
          </div>

          <TestFieldArray control={control} cIndex={cIndex} />
        </div>
      ))}

      <Button variant="outline" className="w-full border-dashed py-6" type="button" onClick={() => append({
        name: "",
        type: "TEST_SERIES",
        tests: []
      })}>
        + Add Another Collection
      </Button>
    </div>
  )
}

export default CollectionFieldArray