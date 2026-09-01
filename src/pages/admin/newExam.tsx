import BulkExamUpload from '@/components/admin/BulkUpload/BulkExamUpload'
import ExamForm from '@/components/admin/ExamForm/examForm'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileSpreadsheet, Keyboard } from "lucide-react"

const NewExam = () => {
  return (
    <div className="w-full h-full flex flex-col p-4">
      <h3 className="text-2xl font-bold pb-4">
        Create New Exam
      </h3>

      {/* ✅ Removed max-w-5xl for full width & set default to 'manual' */}
      <Tabs defaultValue="manual" className="w-full">
        
        {/* Tab Selection Buttons (Manual is now first) */}
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
          <TabsTrigger value="manual" className="flex items-center gap-2">
            <Keyboard className="w-4 h-4" />
            Manual Builder
          </TabsTrigger>
          <TabsTrigger value="bulk" className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4" />
            Bulk Upload (CSV)
          </TabsTrigger>
        </TabsList>

        {/* ✍️ TAB 1: MANUAL FORM */}
        <TabsContent value="manual" className="mt-0">
           <div className="bg-card border rounded-xl p-6 shadow-sm">
             <h2 className="text-xl font-semibold mb-2">Manual Exam Builder</h2>
             <p className="text-sm text-muted-foreground mb-6">
               Use this interactive builder to quickly create single sectional tests or small mock exams on the fly.
             </p>
             <ExamForm />
           </div>
        </TabsContent>

        {/* 🚀 TAB 2: BULK UPLOAD */}
        <TabsContent value="bulk" className="mt-0">
          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Upload via Spreadsheet</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Download the template, fill in your questions offline, and deploy your entire exam architecture in one click.
            </p>
            <BulkExamUpload />
          </div>
        </TabsContent>

      </Tabs>
    </div>
  )
}

export default NewExam