import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import type { Control, FieldValues, Path } from "react-hook-form"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CustomSelectProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  placeholder?: string
  options?: { value: string; label: string }[]
  isLoading?: boolean
  className?: string // Added to allow overriding wrapper styles (like margins)
  onSelectValueChange?: (value: string) => void
}

export const CustomSelect = <T extends FieldValues>({ 
  control, 
  name, 
  label, 
  placeholder, 
  options = [], 
  isLoading, 
  className = "w-full", // Default to full width
  onSelectValueChange 
}: CustomSelectProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        // Removed hardcoded mb-4 so the parent Grid handles the spacing evenly
        <FormItem className={`flex flex-col gap-1.5 ${className}`}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select 
              // Don't spread {...field} blindly into Radix Select. Explicitly map what it needs.
              name={field.name}
              value={field.value || undefined} // Radix prefers undefined over empty string for unselected state
              onValueChange={(value) => {
                field.onChange(value) // Tell React Hook Form
                onSelectValueChange?.(value) // Trigger any custom side-effects
              }}
              disabled={isLoading || field.disabled} // Respects both custom loading and RHF disabled state
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder || `Select ${label.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{label}</SelectLabel>
                  {options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>

          {/* Error Message Animation Container */}
          <div
            className={`transition-all duration-200 ease-out overflow-hidden ${
              fieldState.error ? "max-h-10 opacity-100 mt-1" : "max-h-0 opacity-0 mt-0"
            }`}
          >
            <FormMessage className="text-[11px]" />
          </div>
        </FormItem>
      )}
    />
  )
}