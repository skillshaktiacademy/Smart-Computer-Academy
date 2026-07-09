import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  CreditCard, Search, User, BookOpen, 
  Wallet, Receipt, History, Loader2,
  CheckCircle2, AlertCircle, Printer, Download,
  ArrowRight, ShieldCheck
} from "lucide-react";
import api from "../../../api/axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const FeeCollection = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const queryClient = useQueryClient();

  const { data: studentsData, isLoading: loadingStudents } = useQuery({
    queryKey: ["franchise-students-fees"],
    queryFn: () => api.get("/students/my-center"),
  });

  const students = studentsData?.data?.data || [];

  const { data: historyData } = useQuery({
    queryKey: ["fee-history", selectedStudent?._id],
    queryFn: () => api.get(`/fees/student/${selectedStudent._id}`),
    enabled: !!selectedStudent,
  });

  const feeHistory = historyData?.data?.data || [];

  const collectMutation = useMutation({
    mutationFn: (data) => franchiseAPI.collectFee(selectedStudent._id, data),
    onSuccess: () => {
      toast.success("Fee collected successfully!");
      queryClient.invalidateQueries(["fee-history", selectedStudent?._id]);
      setAmount("");
    },
    onError: (err) => toast.error(err.response?.data?.message || "Collection failed")
  });

  const handleCollect = (e) => {
    e.preventDefault();
    if (!selectedStudent || !amount) return;
    collectMutation.mutate({
      studentId: selectedStudent._id,
      amount: Number(amount),
      paymentMethod,
      transactionId: paymentMethod === "cash" ? `CASH-${Date.now()}` : `ONL-${Date.now()}`
    });
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Fee Management</h1>
          <p className="text-gray-500 font-medium">Record fee collections and track payment history.</p>
        </div>
        <button className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-primary transition-all">
          <History size={22} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Selection & Collection Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Student Selector */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
              <User className="text-primary" size={20} /> Select Student
            </h3>
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text"
                placeholder="Search by name or enrollment number..."
                className="input-field pl-12 py-3.5"
                onChange={(e) => {
                  const query = e.target.value.toLowerCase();
                  if (query.length > 2) {
                    const found = students.find(s => s.name.toLowerCase().includes(query) || s.enrollmentNo.toLowerCase().includes(query));
                    if (found) setSelectedStudent(found);
                  }
                }}
              />
            </div>

            <AnimatePresence mode="wait">
              {selectedStudent ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-6 bg-primary/5 rounded-2xl border border-primary/10"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center font-black text-primary border-2 border-primary/20">
                      {selectedStudent.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 text-lg">{selectedStudent.name}</h4>
                      <p className="text-xs font-black text-primary uppercase tracking-widest">{selectedStudent.enrollmentNo}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Course</p>
                    <p className="font-bold text-gray-700">{selectedStudent.courseId?.title}</p>
                  </div>
                </motion.div>
              ) : (
                <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-3xl">
                  <p className="text-gray-400 font-bold">Search and select a student to begin collection</p>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Collection Form */}
          {selectedStudent && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
            >
              <h3 className="text-lg font-black text-gray-900 mb-8 flex items-center gap-2">
                <Wallet className="text-accent" size={20} /> Collect Fee Payment
              </h3>
              
              <form onSubmit={handleCollect} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Amount to Collect (₹)</label>
                    <div className="relative">
                      <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input 
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="input-field pl-12 py-4 text-xl font-black text-primary"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Payment Method</label>
                    <div className="grid grid-cols-2 gap-4">
                      {["cash", "online"].map((method) => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => setPaymentMethod(method)}
                          className={`flex items-center justify-center gap-2 py-4 rounded-xl border-2 font-black uppercase tracking-widest text-xs transition-all ${
                            paymentMethod === method 
                            ? "border-primary bg-primary/5 text-primary" 
                            : "border-gray-50 text-gray-400"
                          }`}
                        >
                          {method === "cash" ? <Wallet size={16} /> : <ShieldCheck size={16} />}
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-accent/10 p-6 rounded-2xl flex items-center gap-4">
                  <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center shrink-0">
                    <AlertCircle size={20} />
                  </div>
                  <p className="text-xs font-bold text-accent-700 leading-relaxed text-accent">
                    Ensure the student's identity and fee ledger before completing the transaction. 
                    Receipts are automatically generated and sent to the student.
                  </p>
                </div>

                <button 
                  type="submit"
                  disabled={collectMutation.isLoading || !amount}
                  className="w-full btn-primary py-5 text-lg font-black uppercase tracking-widest shadow-lg shadow-primary/20 flex items-center justify-center gap-3"
                >
                  {collectMutation.isLoading ? <Loader2 className="animate-spin" size={24} /> : (
                    <>
                      <CheckCircle2 size={24} />
                      <span>Process Collection</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          )}
        </div>

        {/* Sidebar: Summary & History */}
        <div className="space-y-8">
          {selectedStudent && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-primary text-white p-8 rounded-3xl shadow-xl shadow-primary/20 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
              <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-8 text-white/50">Fee Summary</h4>
              <div className="space-y-6">
                <div>
                  <p className="text-3xl font-black">₹{selectedStudent.totalFee}</p>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Total Course Fee</p>
                </div>
                <div className="h-px bg-white/10"></div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-2xl font-black text-accent">₹{selectedStudent.pendingFee || (selectedStudent.totalFee - (selectedStudent.paidFee || 0))}</p>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Balance Pending</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-success">₹{selectedStudent.paidFee || 0}</p>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Paid Already</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-black text-gray-900 mb-8 flex items-center gap-2">
              <History className="text-gray-400" size={20} /> Collection History
            </h3>
            <div className="space-y-6">
              {feeHistory.length > 0 ? feeHistory.map((fee, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center group-hover:bg-primary/5 group-hover:text-primary transition-all">
                      <Receipt size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">₹{fee.amount}</p>
                      <p className="text-[10px] text-gray-400 font-medium">{new Date(fee.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <button className="p-2 text-gray-300 hover:text-primary transition-all opacity-0 group-hover:opacity-100">
                    <Printer size={16} />
                  </button>
                </div>
              )) : (
                <div className="text-center py-8">
                  <p className="text-xs font-bold text-gray-400 italic">No recent transactions</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeeCollection;
