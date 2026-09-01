import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ==========================================
// 1. TYPES & INTERFACES (Aligned with Backend DB)
// ==========================================

export interface Option {
  id?: string;
  content: any; // Can be string or JSON for multilingual
  isCorrect?: boolean;
}

export interface TestQuestionMapping {
  id: string;
  sectionId: string;
  questionId: string;
  order: number;
  marks: string | number;
  negativeMarks: string | number;
  question: Question;
}

export interface Question {
  id?: string;
  subject: string;
  topic: string;
  content: any; // Can be string or JSON

  // ✅ ADD THESE MISSING FIELDS FROM YOUR DB SCHEMA:
  context?: any; // For Reading Comprehension / DI passages
  contextId?: string | null;
  mediaUrls?: string[];

  marks?: number | string; // Note: In your DB, this is stored on the mapping, but good to keep optional here
  negativeMarks?: number | string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  type: "SINGLE_CHOICE" | "MULTIPLE_CHOICE" | "NUMERIC_INPUT";
  solution?: any;
  options: Option[];
}

export interface TestSection {
  id?: string;
  name: string;
  duration?: number;
  order: number;
  cutoffMarks?: number;
  testQuestions: TestQuestionMapping[]; // Mapped questions
}

export interface Test {
  id: string;
  title: string;
  slug: string;
  type: "FULL_MOCK" | "SECTIONAL" | "TOPIC" | "PREVIOUS_YEAR" | "LIVE";
  totalDuration: number;
  totalMarks: number;
  strictNavigation: boolean;
  liveStartTime?: string;
  liveEndTime?: string;
  sections: TestSection[];
  activeAttempt?: any;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  type: "ROOT_CATEGORY" | "EXAM" | "TEST_SERIES" | "SUBJECT_BUNDLE";
  parentId?: string | null;
  tests?: Test[];
}

export interface SaveAnswerPayload {
  testQuestionId: string;
  state: "UNVISITED" | "SKIPPED" | "ANSWERED" | "MARKED_FOR_REVIEW" | "ANSWERED_AND_MARKED";
  selectedOptionIds?: string[];
  textResponse?: string;
  timeSpentSec?: number; // Accumulated time on this question
}

export interface TestAttempt {
  id: string;
  userId: string;
  testId: string;
  status: "IN_PROGRESS" | "SUBMITTED" | "EVALUATED" | "ABANDONED";
  testMode: "PRACTICE" | "LIVE_LEADERBOARD";
  startedAt: string;
  submittedAt?: string;
  score?: number;
  accuracy?: number;
  timeSpent?: number;
}

export interface SyncAnswerPayload {
  attemptId: string;
  testQuestionId: string;
  state: string; // "UNVISITED" | "SKIPPED" | "ANSWERED" | "MARKED_FOR_REVIEW" | "ANSWERED_AND_MARKED"
  selectedOptionIds?: string[];
  textResponse?: string | null;
  timeTakenSec?: number;
}

// ==========================================
// 2. RTK QUERY API SLICE
// ==========================================

export const testApi = createApi({
  reducerPath: "testApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || "https://mocktest-backend-g9bi.onrender.com/api/v1",
    credentials: "include", // Ensures HttpOnly cookies (like JWT tokens) are sent
  }),
  tagTypes: ["Collection", "Test", "Question", "Attempt", "Analytics", "Leaderboard"],
  endpoints: (builder) => ({

    // ==========================================
    // A. CONTENT MANAGEMENT (ADMIN)
    // ==========================================

    // 1. Collections (Replaces Test Series)
    createCollection: builder.mutation<{ success: boolean; data: Collection }, Partial<Collection>>({
      query: (body) => ({
        url: "/tests/collections",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Collection"],
    }),

    updateCollection: builder.mutation<{ success: boolean; data: Collection }, { id: string; data: Partial<Collection> }>({
      query: ({ id, data }) => ({
        url: `/tests/collections/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Collection"],
    }),

    deleteCollection: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/tests/collections/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Collection", "Test"],
    }),
    getCollections: builder.query<{ success: boolean; data: Collection[] }, { page?: number; limit?: number; search?: string }>({
      query: (params) => ({
        url: "/tests/collections/all",
        params,
      }),
      providesTags: ["Collection"],
    }),

    getCollectionById: builder.query<{ success: boolean; data: any }, string>({
      query: (id) => `/tests/collections/${id}`,
      providesTags: (result, error, id) => [{ type: "Collection", id }],
    }),
    // 2. Global Question Bank
    createQuestion: builder.mutation<{ success: boolean; data: Question }, Partial<Question>>({
      query: (body) => ({
        url: "/questions",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Question"],
    }),

    // 3. Test Creation (Polymorphic Mapping)
    createTest: builder.mutation<{ success: boolean; data: Test }, { collectionIds: string[];[key: string]: any }>({
      query: (testData) => ({
        url: "/tests",
        method: "POST",
        body: testData, // Expects title, totalDuration, collectionIds, sections, etc.
      }),
      invalidatesTags: ["Test", "Collection"],
    }),

    updateTest: builder.mutation<{ success: boolean; data: Test }, { testId: string; updateData: Partial<Test> }>({
      query: ({ testId, updateData }) => ({
        url: `/tests/${testId}`,
        method: "PATCH",
        body: updateData,
      }),
      invalidatesTags: (result, error, { testId }) => [{ type: "Test", id: testId }],
    }),

    deleteTest: builder.mutation<{ success: boolean; message: string }, string>({
      query: (testId) => ({
        url: `/tests/${testId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Test"],
    }),

    // 👇 ADD THIS FOR YOUR BULK UPLOAD
    uploadBulkQuestions: builder.mutation<{ success: boolean; message: string; count: number }, FormData>({
      query: (formData) => ({
        url: "/questions/bulk-upload", // Adjust this to match your actual backend route
        method: "POST",
        body: formData,
        // RTK Query automatically sets the correct multipart/form-data boundary!
      }),
      invalidatesTags: ["Question"], // Refetch questions after successful upload
    }),

    // ==========================================
    // B. EXAM ENGINE (STUDENT)
    // ==========================================

    getTests: builder.query<{ success: boolean; data: Test[]; meta: any }, { page?: number; limit?: number; search?: string; collectionId?: string; type?: string }>({
      query: (params) => ({
        url: "/tests",
        params,
      }),
      providesTags: ["Test"],
    }),

    getTestById: builder.query<{ success: boolean; data: Test }, string>({
      query: (testId) => `/tests/${testId}`,
      providesTags: (result, error, id) => [{ type: "Test", id }],
    }),

    // Initialize Active Exam Session
    startTestAttempt: builder.mutation<{ success: boolean; data: TestAttempt }, string>({
      query: (testId) => ({
        url: `/attempts/start/${testId}`, // Added ../
        method: "POST",
      }),
    }),

    saveAnswer: builder.mutation<{ success: boolean; data: any }, SyncAnswerPayload>({
      query: ({ attemptId, ...body }) => ({
        url: `/attempts/${attemptId}/sync`, // Matches the route we discussed
        method: "PUT",
        body: body,
      }),
    }),

    // 3. UPDATED: The Final Submit API
    submitTestAttempt: builder.mutation<{ success: boolean; message: string; data: any }, string>({
      query: (attemptId) => ({
        url: `/attempts/${attemptId}/submit`,
        method: "POST",
        // Notice: NO body needed here because the answers are already synced!
      }),
    }),

    getAttemptResult: builder.query<{ success: boolean; data: any }, string>({
      query: (attemptId) => `/attempts/${attemptId}`,
    }),
    // ==========================================
    // C. ANALYTICS & REPORTS (STUDENT/ADMIN)
    // ==========================================

    getAttemptHistory: builder.query<{ success: boolean; data: TestAttempt[]; meta: any }, { page?: number; limit?: number; testMode?: string }>({
      query: (params) => ({
        url: "/analytics/history",
        params,
      }),
      providesTags: ["Analytics"],
    }),

    getAttemptReport: builder.query<{ success: boolean; data: any }, string>({
      query: (attemptId) => `/analytics/report/${attemptId}`,
      providesTags: (result, error, id) => [{ type: "Analytics", id }],
    }),

    getTestLeaderboard: builder.query<{ success: boolean; data: any[] }, { testId: string; limit?: number; testMode?: string }>({
      query: ({ testId, ...params }) => ({
        url: `/analytics/leaderboard/${testId}`,
        params,
      }),
      providesTags: ["Leaderboard"],
    }),

  }),
});

// ==========================================
// 3. EXPORT AUTO-GENERATED HOOKS
// ==========================================

export const {
  // Admin Content Hooks
  useCreateCollectionMutation,
  useUpdateCollectionMutation,
  useDeleteCollectionMutation,
  useGetCollectionsQuery,
  useGetCollectionByIdQuery,
  useCreateQuestionMutation,
  useCreateTestMutation,
  useUpdateTestMutation,
  useDeleteTestMutation,
  useUploadBulkQuestionsMutation,

  // Student Exam Engine Hooks
  useGetTestsQuery,
  useGetTestByIdQuery,
  useStartTestAttemptMutation,
  useSaveAnswerMutation,
  useSubmitTestAttemptMutation,
useGetAttemptResultQuery,
  // Analytics Hooks
  useGetAttemptHistoryQuery,
  useGetAttemptReportQuery,
  useGetTestLeaderboardQuery,
} = testApi;