import { useQuery } from "@tanstack/react-query";
import { 
  FileText, Video, Download, Search, 
  Filter, BookOpen, Clock, Lock,
  LayoutGrid, List, File, ExternalLink,
  Box, AlertCircle
} from "lucide-react";
import api from "../../../lib/axios";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const MyMaterials = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: materialsData, isLoading } = useQuery({
    queryKey: ["my-materials"],
    queryFn: () => api.get("/materials/my-course"),
  });

  const materials = materialsData?.data?.data || [];
  const filteredMaterials = materials.filter(m => m.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Learning Resources</h1>
          <p className="text-gray-500 font-medium">Access your course modules, lecture notes, and video tutorials.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-white p-2 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-2">
            <button 
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-400 hover:bg-gray-50'}`}
            >
              <LayoutGrid size={20} />
            </button>
            <button 
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-xl transition-all ${viewMode === 'list' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-400 hover:bg-gray-50'}`}
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
          <Search className="text-gray-400" size={22} />
          <input 
            type="text" 
            placeholder="Search by topic or title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow bg-transparent border-none outline-none text-sm font-bold text-gray-700"
          />
        </div>
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4 px-6 min-w-[200px]">
          <Filter className="text-gray-400" size={20} />
          <select className="flex-grow bg-transparent border-none outline-none text-xs font-black uppercase tracking-widest text-gray-900 cursor-pointer">
            <option>All Modules</option>
            <option>Module 1</option>
            <option>Module 2</option>
          </select>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-square bg-gray-100 rounded-[2rem] animate-pulse"></div>
            ))}
          </div>
        ) : filteredMaterials.length > 0 ? (
          viewMode === "grid" ? (
            <motion.div 
              key="grid"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {filteredMaterials.map((item, i) => (
                <motion.div 
                  key={item._id}
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-sm ${
                      item.type === 'video' ? 'bg-error/10 text-error' : 'bg-primary/10 text-primary'
                    }`}>
                      {item.type === 'video' ? <Video size={28} /> : <FileText size={28} />}
                    </div>
                    <h3 className="text-lg font-black text-gray-900 mb-2 line-clamp-2 leading-tight">{item.title}</h3>
                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-10">
                      <Clock size={12} /> {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <button className="w-full py-4 bg-gray-50 group-hover:bg-primary group-hover:text-white transition-all rounded-2xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2">
                    <Download size={18} /> Download {item.type.toUpperCase()}
                  </button>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="list"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {filteredMaterials.map((item) => (
                <div key={item._id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-primary/20 transition-all">
                  <div className="flex items-center gap-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      item.type === 'video' ? 'bg-error/10 text-error' : 'bg-primary/10 text-primary'
                    }`}>
                      {item.type === 'video' ? <Video size={20} /> : <FileText size={20} />}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{item.title}</h3>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Modified: {new Date(item.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <button className="p-4 bg-gray-50 text-gray-400 rounded-2xl hover:bg-primary hover:text-white transition-all">
                    <Download size={20} />
                  </button>
                </div>
              ))}
            </motion.div>
          )
        ) : (
          <div className="bg-white p-20 text-center rounded-[3rem] border border-gray-100 shadow-sm">
            <div className="w-24 h-24 bg-gray-50 text-gray-200 rounded-full flex items-center justify-center mx-auto mb-8">
              <Box size={48} />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-3">No Materials Found</h3>
            <p className="text-gray-400 font-medium max-w-sm mx-auto leading-relaxed">
              Your course materials will appear here once your instructor uploads them. Check back later!
            </p>
          </div>
        )}
      </AnimatePresence>

      <div className="bg-primary/5 p-8 rounded-[2.5rem] border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-8 mt-12">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-primary shadow-sm"><BookOpen size={32} /></div>
          <div>
            <h4 className="text-xl font-black text-gray-900">Need more resources?</h4>
            <p className="text-sm font-medium text-gray-500">Explore our digital library or contact your teacher for advanced topics.</p>
          </div>
        </div>
        <button className="btn-primary py-4 px-10 flex items-center gap-2 whitespace-nowrap">
          Open Digital Library <ExternalLink size={20} />
        </button>
      </div>
    </div>
  );
};

export default MyMaterials;
