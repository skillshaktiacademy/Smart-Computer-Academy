import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, Search, Loader2, AlertCircle, 
  GraduationCap, ClipboardList, TrendingUp, 
  Award, CheckCircle2, XCircle
} from "lucide-react";
import Meta from "../../components/common/Meta";
import api from "../../api/axios";
import { toast } from "react-toastify";

import { breadcrumbJsonLd } from "../../utils/seo";

const StudentResult = () => {
  const [enrollmentNo, setEnrollmentNo] = useState("");
  const [resultData, setResultData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLookup = async (e) => {
    e.preventDefault();
    if (!enrollmentNo) return;
    
    setIsLoading(true);
    setError("");
    setResultData(null);
    
    try {
      // Backend route for public result lookup
      const response = await api.get(`/public/results/${enrollmentNo}`);
      setResultData(response.data.data);
      toast.success("Result found!");
    } catch (err) {
      setError(err.response?.data?.message || "Record not found. Please check your Enrollment Number.");
      toast.error("Lookup failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const resultSchema = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Online Results", path: "/student-result" }
  ]);

  return (
    <>
      <Meta 
        title="Online Student Result Portal | Verify Marks & Performance" 
        description="Check your exam marks, grades, passing percentage, and performance summary online. Enter your Smart Computer Academy enrollment number to view results." 
        keywords="student result lookup, computer center exam result, Smart Computer Academy marksheet verification, check results online Kahalgaon" 
        schema={resultSchema}
      />

      <div className="bg-gray-50 min-h-screen py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-20 h-20 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mx-auto mb-8"
              >
                <FileText size={40} />
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Online Result Portal</h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                Access your academic performance records instantly. 
                Enter your enrollment number to view your latest exam results.
              </p>
            </div>

            {/* Lookup Form */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 mb-16"
            >
              <form onSubmit={handleLookup} className="flex flex-col md:flex-row gap-6">
                <div className="flex-grow relative">
                  <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
                  <input 
                    type="text"
                    value={enrollmentNo}
                    onChange={(e) => setEnrollmentNo(e.target.value)}
                    placeholder="Enrollment Number (e.g., SSA-2024-00001)"
                    className="w-full pl-14 pr-4 py-5 bg-gray-50 rounded-2xl outline-none focus:ring-4 focus:ring-accent/10 transition-all font-bold text-lg border-2 border-transparent focus:border-accent/20"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="bg-accent hover:bg-accent/90 text-white px-12 py-5 text-lg font-black uppercase tracking-widest flex items-center justify-center space-x-3 shadow-lg shadow-accent/20 rounded-2xl transition-all"
                >
                  {isLoading ? <Loader2 className="animate-spin" size={24} /> : <span>Search Result</span>}
                </button>
              </form>
            </motion.div>

            {/* Result Display */}
            <AnimatePresence mode="wait">
              {isLoading && (
                <div className="text-center py-20">
                  <Loader2 className="animate-spin text-accent mx-auto mb-4" size={48} />
                  <p className="text-gray-500 font-bold">Accessing student records...</p>
                </div>
              )}

              {error && !isLoading && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-error/5 border border-error/20 p-12 rounded-3xl flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 bg-error/10 text-error rounded-full flex items-center justify-center mb-6">
                    <AlertCircle size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">Result Not Found</h3>
                  <p className="text-gray-500 font-medium max-w-md">{error}</p>
                </motion.div>
              )}

              {resultData && !isLoading && (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
                >
                  {/* Status Bar */}
                  <div className={`py-4 px-8 flex items-center justify-between ${resultData.isPassed ? "bg-success" : "bg-error"}`}>
                    <span className="text-white font-black uppercase tracking-widest text-sm">Exam Result Statement</span>
                    <span className="text-white font-black text-sm uppercase flex items-center">
                      {resultData.isPassed ? <CheckCircle2 size={18} className="mr-2" /> : <XCircle size={18} className="mr-2" />}
                      {resultData.isPassed ? "Result: PASSED" : "Result: FAILED"}
                    </span>
                  </div>

                  <div className="p-10 md:p-16">
                    <div className="flex flex-col md:flex-row gap-12 items-start">
                      <div className="flex-grow w-full">
                        <div className="flex justify-between items-end mb-10 pb-6 border-b border-gray-50">
                          <div>
                            <h2 className="text-4xl font-black text-gray-900 mb-1">{resultData.studentName}</h2>
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Enrollment: {resultData.enrollmentNo}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Grade</p>
                            <p className={`text-4xl font-black ${resultData.isPassed ? "text-success" : "text-error"}`}>{resultData.grade}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                            <div className="flex items-center text-accent mb-4"><ClipboardList size={20} className="mr-2" /> <span className="text-[10px] font-black uppercase tracking-widest">Total Marks</span></div>
                            <p className="text-2xl font-black text-gray-900">{resultData.totalMarks}</p>
                          </div>
                          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                            <div className="flex items-center text-primary mb-4"><TrendingUp size={20} className="mr-2" /> <span className="text-[10px] font-black uppercase tracking-widest">Marks Obtained</span></div>
                            <p className="text-2xl font-black text-gray-900">{resultData.marksObtained}</p>
                          </div>
                          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                            <div className="flex items-center text-success mb-4"><Award size={20} className="mr-2" /> <span className="text-[10px] font-black uppercase tracking-widest">Percentage</span></div>
                            <p className="text-2xl font-black text-gray-900">{((resultData.marksObtained / resultData.totalMarks) * 100).toFixed(2)}%</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest">Performance Remarks</h4>
                          <p className="text-gray-600 font-medium leading-relaxed p-6 bg-white border border-gray-100 rounded-2xl italic">
                            "{resultData.remarks || (resultData.isPassed ? "Congratulations! You have successfully passed the examination with good performance." : "Your performance was below the passing threshold. Please consult your center head for re-examination details.")}"
                          </p>
                        </div>
                        
                        <div className="mt-12 text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                          Digitally generated statement • Smart Computer Academy Examination Cell
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentResult;
