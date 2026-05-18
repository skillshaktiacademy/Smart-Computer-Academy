import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

const StatsCard = ({ title, value, icon: Icon, trend, trendValue, color = "primary" }) => {
  const colors = {
    primary: "bg-primary/10 text-primary",
    accent: "bg-accent/10 text-accent",
    success: "bg-success/10 text-success",
    error: "bg-error/10 text-error",
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between"
    >
      <div>
        <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">{title}</p>
        <h3 className="text-3xl font-black text-gray-900 mb-2">{value}</h3>
        {trend && (
          <div className={`flex items-center text-xs font-bold ${trend === "up" ? "text-success" : "text-error"}`}>
            {trend === "up" ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
            <span>{trendValue}% {trend === "up" ? "increase" : "decrease"}</span>
          </div>
        )}
      </div>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors[color]}`}>
        <Icon size={24} />
      </div>
    </motion.div>
  );
};

export default StatsCard;
