import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import { BellRing, UserCircle, Search, Menu } from "lucide-react";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../store/slices/uiSlice";

const TopNavbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-20">
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => dispatch(toggleSidebar())}
          className="lg:hidden p-2 text-gray-500 hover:text-primary"
        >
          <Menu size={24} />
        </button>
        <div className="relative hidden md:block w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search students, courses..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <button className="relative p-2 text-gray-500 hover:text-primary hover:bg-gray-50 rounded-full transition-all">
          <BellRing size={22} />
          <span className="absolute top-1 right-1 w-4 h-4 bg-error text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
            3
          </span>
        </button>
        
        <div className="flex items-center space-x-3 pl-6 border-l border-gray-100">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-900">{user?.name}</p>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">{user?.role?.replace('_', ' ')}</p>
          </div>
          <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center border border-primary/20 cursor-pointer">
            <UserCircle size={24} />
          </div>
        </div>
      </div>
    </header>
  );
};

const DashboardLayout = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      <Sidebar />
      <div className="flex-grow flex flex-col">
        <TopNavbar />
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
