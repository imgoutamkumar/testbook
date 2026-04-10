import ExamForm from '@/components/admin/ExamForm/examForm'

const NewExam = () => {
  return (
    <div className="w-full h-full flex flex-col p-4">
      <h3 className="text-2xl font-bold pb-4">
        Create New Exam
      </h3>

      {/* ✅ SINGLE SOURCE OF TRUTH */}
      <ExamForm />
    </div>
  )
}

export default NewExam