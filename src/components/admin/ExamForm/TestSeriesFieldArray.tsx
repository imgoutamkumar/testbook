import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import FileUpload from '@/customComponent/fileupload'
import { CustomInput } from '@/customComponent/input'
import { Trash2, X } from 'lucide-react'
import { useFieldArray, useWatch } from 'react-hook-form'

const TestSeriesFieldArray = ({ control, index, remove, setValue }) => {

  const {
    fields,
    append,
    remove: removeTest
  } = useFieldArray({
    control,
    name: `testSeries.${index}.tests`
  })

  const images = useWatch({
    control,
    name:`testSeries.${index}.thumbnail`
  })

  return (

    <Card className="border-2 border-dashed">

      <CardHeader className="flex justify-between">

        <CardTitle>
          TestSeries {index+1}
        </CardTitle>

        <Button
          type="button"
          variant="destructive"
          size="sm"
          onClick={()=>remove(index)}
        >
          <Trash2 size={16}/>
        </Button>

      </CardHeader>

      <CardContent className="space-y-5">

        {/* SERIES INFO */}

        <div className="grid grid-cols-3 gap-4">

          <CustomInput
            control={control}
            name={`testSeries.${index}.title`}
            label="Title"
          />

          <CustomInput
            control={control}
            name={`testSeries.${index}.description`}
            label="Description"
          />

          <CustomInput
            control={control}
            name={`testSeries.${index}.price`}
            label="Price"
            type="number"
          />

        </div>

        {/* TESTS */}

        <div className="space-y-3">

          {fields.map((test,i)=>{

            return(

              <div
                key={test.id}
                className="relative grid grid-cols-4 gap-3 border p-3 rounded"
              >

                <CustomInput
                  control={control}
                  name={`testSeries.${index}.tests.${i}.title`}
                  label="Test title"
                />

                <CustomInput
                  control={control}
                  name={`testSeries.${index}.tests.${i}.duration`}
                  label="Duration"
                  type="number"
                />

                <CustomInput
                  control={control}
                  name={`testSeries.${index}.tests.${i}.totalMarks`}
                  label="Marks"
                  type="number"
                />

                <Button
                  type="button"
                  variant="destructive"
                  className="absolute right-2 top-2"
                  onClick={()=>removeTest(i)}
                >
                  <X size={14}/>
                </Button>

              </div>

            )

          })}

          <Button
            type="button"
            variant="outline"
            onClick={()=>append({

              title:"",
              description:"",
              duration:60,
              totalMarks:0,
              totalQuestions:0,
              maxAttempts:1,
              negativeMarking:0,
              sections:[]

            })}
          >
            + Add Test
          </Button>

        </div>

        {/* THUMBNAIL */}

        <div>

          <label className="text-sm font-medium">
            Thumbnail
          </label>

          <FileUpload

            inputId={`series-${index}`}

            accept="image/*"

            selectedFiles={images}

            onChange={(file)=>{

              setValue(
                `testSeries.${index}.thumbnail`,
                file,
                {shouldDirty:true}
              )

            }}

          />

        </div>

      </CardContent>

    </Card>

  )

}

export default TestSeriesFieldArray
