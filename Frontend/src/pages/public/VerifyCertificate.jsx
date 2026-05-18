import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, Search, Loader2, AlertCircle, 
  CheckCircle2, User, BookOpen, Calendar, 
  Building2, Award, Printer, Download, QrCode
} from "lucide-react";
import Meta from "../../components/common/Meta";
import api from "../../api/axios";
import { toast } from "react-toastify";

const VerifyCertificate = () => {
  const [certificateNo, setCertificateNo] = useState("");
  const [certificateData, setCertificateData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!certificateNo) return;
    
    setIsLoading(true);
    setError("");
    setCertificateData(null);
    
    try {
      const response = await api.get(`/public/verify-certificate/${certificateNo}`);
      setCertificateData(response.data.data);
      toast.success("Certificate verified successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid certificate number. Please check and try again.");
      toast.error("Verification failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Meta 
        title="ISO Certificate Verification Portal | Smart Computer Academy" 
        description="Verify the authenticity of professional MERN, DCA, ADCA, and Tally Prime + GST certificates issued by Smart Computer Academy Kahalgaon online." 
        keywords="verify computer certificate, ISO certificate verification, Smart Computer Academy verification, verify computer diploma online" 
      />

      <div className="bg-gray-50 min-h-screen py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-20 h-20 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-8"
              >
                <ShieldCheck size={40} />
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Certificate Verification</h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                Smart Computer Academy certificates are unique and globally verifiable. 
                Enter the certificate number below to confirm its authenticity.
              </p>
            </div>

            {/* Verification Form */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white/45 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/60 shadow-xl mb-16"
            >
              <form onSubmit={handleVerify} className="flex flex-col md:flex-row gap-6">
                <div className="flex-grow relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
                  <input 
                    type="text"
                    value={certificateNo}
                    onChange={(e) => setCertificateNo(e.target.value)}
                    placeholder="Enter Certificate Number (e.g., SSA/CERT/2024/00001)"
                    className="w-full pl-14 pr-4 py-5 bg-gray-50 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-bold text-lg border-2 border-transparent focus:border-primary/20"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary px-12 py-5 text-lg font-black uppercase tracking-widest flex items-center justify-center space-x-3 shadow-lg shadow-primary/20"
                >
                  {isLoading ? <Loader2 className="animate-spin" size={24} /> : <span>Verify Now</span>}
                </button>
              </form>
              
              <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-8 border-t border-gray-50 pt-8">
                <div className="flex items-center text-gray-400 font-bold text-sm">
                  <CheckCircle2 size={18} className="mr-2 text-success" /> Secure Verification
                </div>
                <div className="flex items-center text-gray-400 font-bold text-sm">
                  <QrCode size={18} className="mr-2" /> QR Code Supported
                </div>
              </div>
            </motion.div>

            {/* Result Display */}
            <AnimatePresence mode="wait">
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-20"
                >
                  <Loader2 className="animate-spin text-primary mx-auto mb-4" size={48} />
                  <p className="text-gray-500 font-bold">Verifying record in national database...</p>
                </motion.div>
              )}

              {error && !isLoading && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-error/5 border border-error/20 p-8 rounded-3xl flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 bg-error/10 text-error rounded-full flex items-center justify-center mb-6">
                    <AlertCircle size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">Record Not Found</h3>
                  <p className="text-gray-500 font-medium max-w-md">{error}</p>
                </motion.div>
              )}

              {certificateData && !isLoading && (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  className="bg-white/45 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-success/30 relative"
                >
                  {/* Verified Badge */}
                  <div className="absolute top-0 right-0 p-6">
                    <div className="bg-success text-white px-6 py-2 rounded-full font-black text-sm uppercase tracking-widest flex items-center shadow-lg shadow-success/20">
                      <CheckCircle2 size={18} className="mr-2" /> Verified Authenticity
                    </div>
                  </div>

                  <div className="p-12 md:p-16">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                      {/* Left Side: Photo/Avatar Placeholder */}
                      <div className="w-48 h-48 bg-gray-50 rounded-2xl flex items-center justify-center border-4 border-gray-100 shadow-inner">
                        <User size={80} className="text-gray-300" />
                      </div>

                      {/* Right Side: Details */}
                      <div className="flex-grow">
                        <h2 className="text-4xl font-black text-gray-900 mb-2">{certificateData.studentName}</h2>
                        <p className="text-primary font-black uppercase tracking-widest text-sm mb-10">{certificateData.certificateNo}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                          <div className="flex items-start space-x-4">
                            <BookOpen size={24} className="text-gray-400 mt-1" />
                            <div>
                              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Course Completed</p>
                              <p className="text-lg font-bold text-gray-800">{certificateData.course}</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-4">
                            <Calendar size={24} className="text-gray-400 mt-1" />
                            <div>
                              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Date of Issue</p>
                              <p className="text-lg font-bold text-gray-800">
                                {new Date(certificateData.issueDate).toLocaleDateString("en-IN", {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric"
                                })}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-4">
                            <Building2 size={24} className="text-gray-400 mt-1" />
                            <div>
                              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Franchise Center</p>
                              <p className="text-lg font-bold text-gray-800">{certificateData.franchiseName}</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-4">
                            <Award size={24} className="text-gray-400 mt-1" />
                            <div>
                              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Academic Status</p>
                              <p className="text-lg font-bold text-success flex items-center">
                                <CheckCircle2 size={18} className="mr-2" /> Passed with Excellence
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-8 border-t border-gray-100">
                          <button className="flex items-center space-x-2 text-primary font-black hover:bg-primary/5 px-4 py-2 rounded-lg transition-all">
                            <Printer size={18} /> <span>Print Copy</span>
                          </button>
                          <button className="flex items-center space-x-2 text-primary font-black hover:bg-primary/5 px-4 py-2 rounded-lg transition-all">
                            <Download size={18} /> <span>Download PDF</span>
                          </button>
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

export default VerifyCertificate;
