import { useFieldArray } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { CustomInput } from "@/customComponent/input"
import { CustomSelect } from "@/customComponent/select" // <-- Import your new Select
import SectionFieldArray from "./SectionFieldArray"
import { Trash2 } from "lucide-react"

// Define the dropdown options based on your Zod schema
const testTypeOptions = [
  { label: "Full Mock Test", value: "FULL_MOCK" },
  { label: "Sectional Test", value: "SECTIONAL" },
  { label: "Topic Test", value: "TOPIC" },
  { label: "Previous Year Paper", value: "PREVIOUS_YEAR" },
  { label: "Live Test", value: "LIVE" }
];

const TestFieldArray = ({ control, cIndex }: any) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `collections.${cIndex}.tests`
  })

  return (
    <div className="space-y-4 border-l-2 border-indigo-500 pl-4 my-4">
      <h2 className="font-bold text-lg text-indigo-600">Tests inside Collection</h2>

      {fields.map((field, tIndex) => (
        <div key={field.id} className="border p-4 rounded-lg bg-slate-50 space-y-4">
          
          {/* FIXED: Changed to items-start so inputs stick to the top when errors appear below */}
          <div className="flex justify-between items-start">
            <div className="grid grid-cols-2 gap-4 flex-1 mr-4 items-start">
               <CustomInput 
                 control={control} 
                 name={`collections.${cIndex}.tests.${tIndex}.title`} 
                 label="Test Title" 
               />
               
               {/* FIXED: Replaced CustomInput with CustomSelect */}
               <CustomSelect 
                 control={control} 
                 name={`collections.${cIndex}.tests.${tIndex}.type`} 
                 label="Test Type" 
                 options={testTypeOptions}
               />
            </div>
            
            {/* FIXED: Added mt-7 to align the trash can with the input boxes instead of the labels */}
            <Button variant="ghost" size="sm" type="button" onClick={() => remove(tIndex)} className="mt-7">
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>

          {/* FIXED: Added items-start here as well */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-start">
            <CustomInput control={control} name={`collections.${cIndex}.tests.${tIndex}.totalDuration`} label="Duration (sec)" type="number" />
            <CustomInput control={control} name={`collections.${cIndex}.tests.${tIndex}.totalMarks`} label="Total Marks" type="number" />
            <CustomInput control={control} name={`collections.${cIndex}.tests.${tIndex}.liveStartTime`} label="Live Start (Optional)" type="text" />
            <CustomInput control={control} name={`collections.${cIndex}.tests.${tIndex}.liveEndTime`} label="Live End (Optional)" type="text" />
          </div>

          <SectionFieldArray control={control} tIndex={tIndex} cIndex={cIndex} />
        </div>
      ))}

      <Button variant="outline" type="button" onClick={() => append({
        title: "", type: "FULL_MOCK", totalDuration: 3600, totalMarks: 100, strictNavigation: false, sections: []
      })}>
        + Add Test
      </Button>
    </div>
  )
}

export default TestFieldArray