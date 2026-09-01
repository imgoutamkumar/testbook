import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileSpreadsheet, Keyboard } from "lucide-react"
import BulkExamUpload from "../BulkUpload/BulkExamUpload"
import ExamForm from "../ExamForm/examForm"

const CreateExamPage = () => {
  return (
    // ✅ REMOVED max-w-6xl and mx-auto so it spans the entire available width
    <div className="w-full p-6 space-y-6">
      
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Exam Creation Hub</h1>
        <p className="text-muted-foreground mt-2">
          Deploy new collections, tests, and question banks to your platform.
        </p>
      </div>

      {/* The Tabs Wrapper */}
      <Tabs defaultValue="bulk" className="w-full">
        
        {/* Tab Buttons (Kept max-w-md here so the buttons themselves don't stretch too wide) */}
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
          <TabsTrigger value="bulk" className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4" />
            Bulk Upload (CSV/Excel)
          </TabsTrigger>
          <TabsTrigger value="manual" className="flex items-center gap-2">
            <Keyboard className="w-4 h-4" />
            Manual Builder
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: The Bulk Upload UI */}
        <TabsContent value="bulk" className="mt-0">
          {/* Changed bg-slate-50 to bg-card for better dark mode support if needed */}
          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Upload via Spreadsheet</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Download our template, fill in your thousands of questions, and deploy your entire exam architecture in one click.
            </p>
            <BulkExamUpload />
          </div>
        </TabsContent>

        {/* Tab 2: Your original Manual Form */}
        <TabsContent value="manual" className="mt-0">
           <div className="bg-card border rounded-xl p-6 shadow-sm">
             <h2 className="text-xl font-semibold mb-2">Manual Exam Builder</h2>
             <p className="text-sm text-muted-foreground mb-6">
               Use this interactive builder to quickly create single sectional tests or small mock exams on the fly.
             </p>
             <ExamForm />
           </div>
        </TabsContent>

      </Tabs>
    </div>
  )
}

export default CreateExamPage