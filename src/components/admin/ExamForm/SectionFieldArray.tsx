import { useFieldArray } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { CustomInput } from "@/customComponent/input"
import { CustomSelect } from "@/customComponent/select" // <-- Imported Select
import QuestionFieldArray from "./QuestionFieldArray"
import { Trash2 } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Define your standard Section Names here
const sectionNameOptions = [
  { label: "Quantitative Aptitude", value: "Quantitative Aptitude" },
  { label: "Reasoning Ability", value: "Reasoning Ability" },
  { label: "English Language", value: "English Language" },
  { label: "General Awareness", value: "General Awareness" },
  { label: "Computer Knowledge", value: "Computer Knowledge" },
  { label: "General Intelligence", value: "General Intelligence" },
  { label: "General Science", value: "General Science" }
];

const SectionFieldArray = ({ control, tIndex, cIndex }: any) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `collections.${cIndex}.tests.${tIndex}.sections`
  })

  return (
    <div className="space-y-4 border-l-2 border-primary pl-4 my-3">
      <h3 className="font-semibold text-base text-primary">Test Sections</h3>

      <Accordion type="multiple" className="w-full space-y-4">
        {fields.map((field, sIndex) => (
          <AccordionItem 
            key={field.id} 
            value={field.id} 
            className="border rounded-lg bg-card shadow-sm overflow-hidden"
          >
            {/* Header: Flex container explicitly keeps Trigger on left and Button on far right */}
            <div className="flex justify-between items-center w-full pr-4 border-b bg-muted/20">
              {/* Added [&>svg]:ml-4 to push the accordion chevron slightly away from the text but keep it left-aligned */}
              <AccordionTrigger className="flex-1 px-4 justify-start hover:no-underline font-semibold text-primary [&>svg]:ml-4">
                Section #{sIndex + 1}
              </AccordionTrigger>
              
              <Button 
                variant="ghost" 
                size="sm" 
                type="button" 
                onClick={() => remove(sIndex)}
                className="text-red-500 hover:bg-red-50 hover:text-red-600 shrink-0 ml-4"
              >
                <Trash2 className="w-4 h-4 mr-2" /> Remove Section
              </Button>
            </div>

            {/* Body */}
            <AccordionContent className="p-4 space-y-4">
              
              {/* FIXED: Changed to CustomSelect */}
              <div className="max-w-md">
                <CustomSelect
                  control={control}
                  name={`collections.${cIndex}.tests.${tIndex}.sections.${sIndex}.name`}
                  label="Section Name"
                  options={sectionNameOptions}
                />
              </div>

              {/* Nested Questions */}
              <QuestionFieldArray
                control={control}
                sIndex={sIndex}
                tIndex={tIndex}
                cIndex={cIndex}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Button variant="outline" size="sm" type="button" onClick={() => append({
        name: "", // Will be selected from dropdown
        duration: 1200,
        order: fields.length + 1,
        questions: []
      })}>
        + Add Section
      </Button>
    </div>
  )
}

export default SectionFieldArray