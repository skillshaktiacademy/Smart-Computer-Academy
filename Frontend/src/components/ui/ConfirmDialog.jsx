import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X, Loader2 } from "lucide-react";

const ConfirmDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Action", 
  message = "Are you sure you want to perform this action? This cannot be undone.",
  confirmLabel = "Confirm",
  confirmColor = "bg-error",
  isLoading = false
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
          ></motion.div>
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="p-8">
              <div className="w-16 h-16 bg-error/10 text-error rounded-full flex items-center justify-center mb-6 mx-auto">
                <AlertTriangle size={32} />
              </div>
              
              <h3 className="text-2xl font-black text-gray-900 text-center mb-4">{title}</h3>
              <p className="text-gray-500 text-center leading-relaxed mb-8">
                {message}
              </p>
              
              <div className="flex gap-4">
                <button
                  onClick={onClose}
                  disabled={isLoading}
                  className="flex-1 py-3 px-6 rounded-xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  disabled={isLoading}
                  className={`flex-1 py-3 px-6 rounded-xl font-bold text-white shadow-lg flex items-center justify-center space-x-2 ${confirmColor} hover:opacity-90 transition-all`}
                >
                  {isLoading ? <Loader2 className="animate-spin" size={20} /> : <span>{confirmLabel}</span>}
                </button>
              </div>
            </div>
            
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmDialog;
