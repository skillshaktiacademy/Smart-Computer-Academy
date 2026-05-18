import { useQuery } from "@tanstack/react-query";
import {
  Award, FileText, Download, TrendingUp,
  CheckCircle2, XCircle, ChevronRight,
  Target, GraduationCap, Medal
} from "lucide-react";
import api from "../../../api/axios";
import { motion } from "framer-motion";

const MyResults = () => {
  const { data: resultsData, isLoading } = useQuery({
    queryKey: ["my-results"],
    queryFn: () => api.get("/exams/my-results"),
  });

  const results = resultsData?.data?.data || [];
  const averagePercentage = results.length > 0 ? Math.round(results.reduce((acc, r) => acc + (r.marksObtained / r.examId.totalMarks) * 100, 0) / results.length) : 0;

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Academic Results</h1>
          <p className="text-gray-500 font-medium">Review your performance across all examinations.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
            <Medal className="text-accent" size={24} />
            <div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Aggregate</p>
              <p className="text-xl font-black text-gray-900">{averagePercentage}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Results Timeline/List */}
        <div className="lg:col-span-2 space-y-6">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-32 bg-gray-100 rounded-3xl animate-pulse"></div>
            ))
          ) : results.length > 0 ? results.map((result, i) => (
            <motion.div
              key={result._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-black text-xl ${result.marksObtained >= result.examId.passingMarks ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                    }`}>
                    {result.grade || 'A'}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900 mb-1">{result.examId?.title}</h3>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{new Date(result.examId?.examDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-10">
                  <div className="text-center">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Score</p>
                    <p className="text-2xl font-black text-gray-900">{result.marksObtained} <span className="text-sm text-gray-400">/ {result.examId?.totalMarks}</span></p>
                  </div>
                  <div className="h-10 w-px bg-gray-50"></div>
                  <button className="w-12 h-12 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                    <Download size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          )) : (
            <div className="bg-white p-20 text-center rounded-[3rem] border border-gray-100">
              <div className="w-20 h-20 bg-gray-50 text-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award size={40} />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">No results yet</h3>
              <p className="text-gray-400 font-medium">Your examination results will appear here once published by the faculty.</p>
            </div>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
          <div className="bg-primary p-8 rounded-[2.5rem] text-white shadow-xl shadow-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
            <GraduationCap className="text-accent mb-8" size={40} />
            <h4 className="text-2xl font-black mb-4 leading-tight">Your Academic Progress</h4>
            <p className="text-white/60 text-sm leading-relaxed mb-8">
              Maintain an average score of 60% or higher to qualify for premium internships and placement support.
            </p>
            <button className="w-full py-4 bg-white/10 hover:bg-white/20 transition-all rounded-2xl text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2">
              Download Marksheet <FileText size={18} />
            </button>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Performance Index</h4>
            <div className="space-y-6">
              {[
                { label: 'Practical Skills', value: 85, color: 'bg-primary' },
                { label: 'Theoretical Knowledge', value: 72, color: 'bg-accent' },
                { label: 'Project Work', value: 90, color: 'bg-success' }
              ].map((stat, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs font-black uppercase tracking-widest mb-2">
                    <span className="text-gray-500">{stat.label}</span>
                    <span className="text-gray-900">{stat.value}%</span>
                  </div>
                  <div className="h-2 bg-gray-50 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.value}%` }}
                      className={`h-full ${stat.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyResults;
