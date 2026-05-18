import { useQuery } from "@tanstack/react-query";
import {
  Award, Download, Eye, ExternalLink,
  ShieldCheck, Calendar, ShieldAlert,
  Search, Filter, Globe, Share2, Rocket
} from "lucide-react";
import api from "../../../api/axios";
import { motion } from "framer-motion";

const MyCertificates = () => {
  const { data: certsData, isLoading } = useQuery({
    queryKey: ["my-certificates"],
    queryFn: () => api.get("/certificates/my"),
  });

  const certificates = certsData?.data?.data || [];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900">My Credentials</h1>
          <p className="text-gray-500 font-medium">Manage and share your verifiable academic certificates.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm text-gray-400 hover:text-primary transition-all">
            <Share2 size={22} />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="h-64 bg-gray-100 rounded-[2.5rem] animate-pulse"></div>
          ))}
        </div>
      ) : certificates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-1000"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                    <Award size={32} />
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Issue Date</span>
                    <span className="text-xs font-bold text-gray-900">{new Date(cert.issueDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-black text-gray-900 mb-2 leading-tight">{cert.courseId?.title}</h3>
                <p className="text-xs font-black text-primary uppercase tracking-widest mb-8">Certificate No: {cert.certificateNo}</p>

                <div className="grid grid-cols-2 gap-4">
                  <button className="flex-1 py-4 bg-gray-50 hover:bg-primary hover:text-white transition-all rounded-2xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2">
                    <Eye size={16} /> Preview
                  </button>
                  <button className="flex-1 py-4 bg-gray-50 hover:bg-primary hover:text-white transition-all rounded-2xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2">
                    <Download size={16} /> Download
                  </button>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-success">
                    <ShieldCheck size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Verified Digital Credential</span>
                  </div>
                  <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 hover:text-primary cursor-pointer transition-all">
                    <Globe size={18} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-20 text-center rounded-[3rem] border border-gray-100 shadow-sm">
          <div className="w-24 h-24 bg-primary/5 text-primary/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <Rocket size={48} />
          </div>
          <h3 className="text-2xl font-black text-gray-900 mb-3">Keep Learning!</h3>
          <p className="text-gray-400 font-medium max-w-sm mx-auto leading-relaxed">
            Certificates are issued automatically once you complete your course and pass the final examination.
          </p>
          <Link to="/dashboard/student/materials" className="mt-8 inline-flex items-center gap-2 btn-primary py-3 px-8">
            Go to Study Materials <ExternalLink size={18} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyCertificates;
