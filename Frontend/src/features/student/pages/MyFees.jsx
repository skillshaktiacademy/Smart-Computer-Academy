import { useQuery } from "@tanstack/react-query";
import { 
  CreditCard, Wallet, History, Receipt, 
  Download, ExternalLink, ShieldCheck, 
  AlertCircle, ChevronRight, DollarSign,
  CheckCircle2, Clock
} from "lucide-react";
import api from "../../../lib/axios";
import { motion } from "framer-motion";

const MyFees = () => {
  const { data: feesData, isLoading } = useQuery({
    queryKey: ["my-fees"],
    queryFn: () => api.get("/fees/my-history"),
  });

  const { data: studentStats } = useQuery({
    queryKey: ["student-dashboard-stats"],
    queryFn: () => api.get("/dashboard/student/stats"),
  });

  const history = feesData?.data?.data || [];
  const stats = studentStats?.data?.data || { pendingFees: 0 };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Fee Statement</h1>
          <p className="text-gray-500 font-medium">Manage your payments and download official receipts.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment History */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex items-center justify-between">
              <h3 className="text-xl font-black text-gray-900">Recent Transactions</h3>
              <History className="text-gray-400" size={20} />
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50/50">
                  <tr>
                    <th className="px-8 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Transaction ID</th>
                    <th className="px-8 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Date</th>
                    <th className="px-8 py-4 text-center text-xs font-black text-gray-400 uppercase tracking-widest">Amount</th>
                    <th className="px-8 py-4 text-right text-xs font-black text-gray-400 uppercase tracking-widest">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {isLoading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                      <tr key={i} className="animate-pulse"><td colSpan="4" className="p-8"><div className="h-4 bg-gray-100 rounded w-full"></div></td></tr>
                    ))
                  ) : history.length > 0 ? history.map((fee, i) => (
                    <tr key={fee._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-8 py-6">
                        <span className="text-xs font-black text-primary uppercase tracking-widest">{fee.transactionId || `PAY-${fee._id.slice(-6)}`}</span>
                        <p className="text-[10px] text-gray-400 font-medium">{fee.paymentMethod || 'Online'}</p>
                      </td>
                      <td className="px-8 py-6 text-sm font-medium text-gray-600">{new Date(fee.createdAt).toLocaleDateString()}</td>
                      <td className="px-8 py-6 text-center text-lg font-black text-gray-900">₹{fee.amount}</td>
                      <td className="px-8 py-6 text-right">
                        <button className="w-10 h-10 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-all ml-auto">
                          <Download size={18} />
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="4" className="px-8 py-20 text-center text-gray-400 font-bold italic">No payments recorded yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Payment Summary Sidebar */}
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-primary p-10 rounded-[2.5rem] text-white shadow-2xl shadow-primary/20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
            <Wallet className="text-accent mb-8" size={40} />
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white/50 mb-2">Current Balance</h4>
            <div className="flex items-baseline gap-2 mb-10">
              <span className="text-5xl font-black text-white">₹{stats.pendingFees}</span>
              <span className="text-sm font-bold text-white/40">Pending</span>
            </div>
            <button className="w-full py-4 bg-white text-primary hover:bg-accent hover:text-white transition-all rounded-2xl text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl">
              Pay Online Now <CreditCard size={18} />
            </button>
          </motion.div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-8">Payment Safety</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-success/5 text-success rounded-xl flex items-center justify-center shrink-0">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Encrypted Transactions</p>
                  <p className="text-xs text-gray-500 leading-relaxed">Your data is secured with 256-bit SSL encryption.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent/5 text-accent rounded-xl flex items-center justify-center shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Instant Receipts</p>
                  <p className="text-xs text-gray-500 leading-relaxed">Download official receipts immediately after payment.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-error/5 p-6 rounded-3xl border border-error/10 flex items-start gap-4">
            <AlertCircle className="text-error shrink-0" size={20} />
            <p className="text-xs font-bold text-error leading-relaxed">
              Late fees may apply if payments are not cleared by the 10th of every month.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyFees;
