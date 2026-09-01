import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Folder, FileText, ArrowRight, Clock, Award } from "lucide-react";
import { useGetCollectionByIdQuery } from "@/redux/services/testApi";

export default function CollectionDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Fetch data specific to this collection ID
  const { data: response, isLoading, isError } = useGetCollectionByIdQuery(id || "");
  const collection = response?.data;

  if (isLoading) return <div className="p-10 text-center animate-pulse text-slate-500">Loading premium content...</div>;
  if (isError || !collection) return <div className="p-10 text-center text-red-500">Failed to load collection.</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{collection.name}</h1>
        <p className="text-slate-500 mt-2">Explore sub-categories and tests inside this collection.</p>
      </div>

      {/* SECTION A: Render Sub-Collections (Folders) */}
      {collection.children && collection.children.length > 0 && (
        <div className="mb-12">
          <h2 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
            <Folder className="w-5 h-5 text-indigo-500" /> Sub-Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {collection.children.map((child: any) => (
              <div 
                key={child.id}
                onClick={() => navigate(`/collection/${child.id}`)}
                className="group bg-white border border-slate-200 rounded-2xl p-5 cursor-pointer hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 flex justify-between items-center"
              >
                <span className="font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors">
                  {child.name}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION B: Render Actual Tests */}
      {collection.tests && collection.tests.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
            <FileText className="w-5 h-5 text-pink-500" /> Available Tests
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {collection.tests.map((mapping: any) => {
              const test = mapping.test;
              return (
                <div 
                  key={test.id}
                  className="bg-white border border-slate-200 rounded-[1.5rem] p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
                >
                  <h3 className="font-bold text-slate-800 mb-4 line-clamp-2">{test.title}</h3>
                  
                  <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-6 mt-auto">
                    <span className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 rounded-lg">
                      <Clock className="w-3.5 h-3.5 text-indigo-500" /> {Math.round(test.totalDuration / 60)} mins
                    </span>
                    <span className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 rounded-lg">
                      <Award className="w-3.5 h-3.5 text-pink-500" /> {test.totalMarks} Marks
                    </span>
                  </div>

                  <button 
                    onClick={() => navigate(`/test/instruction/${test.id}`)}
                    className="w-full py-2.5 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl text-sm font-semibold transition-colors"
                  >
                    Start Test
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {collection.children.length === 0 && collection.tests.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-[2rem] border border-dashed border-slate-300">
          <p className="text-slate-500 font-medium">No content available in this collection yet.</p>
        </div>
      )}
    </div>
  );
}