import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ChevronRight, PhoneCall, Mail, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import logoImg from "../../assets/logo.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "About", path: "/about" },
    { name: "Gallery", path: "/gallery" },
    { name: "Franchise", path: "/franchise" },
    { name: "Verify", path: "/verify-certificate" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100/60 py-3" 
        : "bg-white/80 backdrop-blur-sm border-b border-gray-50/50 py-4"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <img
                src={logoImg}
                alt="Smart Computer Academy Logo"
                className="w-10 h-10 rounded-xl object-cover shadow-sm ring-1 ring-red-100 group-hover:ring-red-400 transition-all duration-300"
              />
              <div className="flex flex-col">
                <span className="text-gray-900 font-black text-sm tracking-tight leading-none uppercase">
                  Smart Computer
                </span>
                <span className="text-red-600 font-extrabold text-[10px] uppercase tracking-widest leading-none mt-0.5">
                  Academy • Kahalgaon
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-xs font-bold uppercase tracking-widest transition-colors duration-200 hover:text-red-600 ${
                    isActive ? "text-red-600 font-extrabold" : "text-gray-600"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/dashboard/${user.role}`)}
                className="bg-gray-900 hover:bg-red-600 text-white text-[10px] font-extrabold uppercase tracking-widest px-4 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span>Dashboard</span>
                <ChevronRight size={14} />
              </motion.button>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-gray-600 hover:text-red-600 text-xs font-bold uppercase tracking-widest px-3 py-2 transition-colors"
                >
                  Login
                </Link>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/contact")}
                  className="bg-red-600 hover:bg-gray-900 text-white text-[10px] font-extrabold uppercase tracking-widest px-4 py-2.5 rounded-xl transition-all duration-300 shadow-sm cursor-pointer"
                >
                  Admission Open
                </motion.button>
              </>
            )}
          </div>

          {/* Mobile Hamburguer menu toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-red-600 transition-colors p-1"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Clean, elegant) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden shadow-md mt-3"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-xs font-extrabold uppercase tracking-widest hover:bg-red-50 hover:text-red-600 transition-all ${
                      isActive ? "bg-red-50 text-red-600" : "text-gray-600"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-gray-100/50 flex flex-col gap-2 px-2">
                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      navigate(`/dashboard/${user.role}`);
                    }}
                    className="w-full bg-gray-900 hover:bg-red-600 text-white text-xs font-bold py-3 rounded-xl text-center cursor-pointer"
                  >
                    Dashboard
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="w-full bg-slate-100 hover:bg-slate-200 text-gray-800 text-xs font-bold py-3 rounded-xl text-center block"
                    >
                      Login
                    </Link>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        navigate("/contact");
                      }}
                      className="w-full bg-red-600 hover:bg-gray-900 text-white text-xs font-bold py-3 rounded-xl text-center cursor-pointer"
                    >
                      Admission Open
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-gray-950 text-slate-400 pt-16 pb-8 border-t border-gray-900 z-10 relative">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        
        {/* Branding Column */}
        <div className="col-span-1 md:col-span-2 space-y-5">
          <div className="flex items-center space-x-2">
            <img
              src={logoImg}
              alt="Smart Computer Academy"
              className="w-10 h-10 rounded-xl object-cover ring-1 ring-red-800"
            />
            <span className="text-white font-black text-lg tracking-tight uppercase">Smart Computer Academy</span>
          </div>
          <p className="text-xs text-slate-400 max-w-sm leading-relaxed font-medium">
            Smart Computer Academy Kahalgaon is an ISO 9001:2015 certified premier vocational IT institute registered under the Govt. of India. We specialize in Tally Prime, ADCA, coding, and administrative computer capabilities.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white text-xs font-extrabold uppercase tracking-widest mb-5">Quick Navigation</h4>
          <ul className="space-y-2.5 text-xs font-semibold">
            <li><Link to="/courses" className="hover:text-red-500 transition-colors">Computer Courses</Link></li>
            <li><Link to="/about" className="hover:text-red-500 transition-colors">Our Story & Founder</Link></li>
            <li><Link to="/franchise" className="hover:text-red-500 transition-colors">Franchise Program</Link></li>
            <li><Link to="/verify-certificate" className="hover:text-red-500 transition-colors">Verify Certificate</Link></li>
            <li><Link to="/contact" className="hover:text-red-500 transition-colors">Contact Support</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h4 className="text-white text-xs font-extrabold uppercase tracking-widest">Kahalgaon Campus</h4>
          <ul className="space-y-3 text-xs font-medium text-slate-400">
            <li className="flex items-start gap-2.5">
              <MapPin size={15} className="text-red-600 mt-0.5 flex-shrink-0" />
              <span>S.S.V. College Road, Near STS Coaching, Kahalgaon, Bihar</span>
            </li>
            <li className="flex items-center gap-2.5">
              <PhoneCall size={15} className="text-red-600 flex-shrink-0" />
              <a href="tel:+919905788324" className="hover:text-red-500 transition-colors font-bold">+91 99057 88324</a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={15} className="text-red-600 flex-shrink-0" />
              <a href="mailto:info@smartcomputeracademy.com" className="hover:text-red-500 transition-colors">info@smartcomputeracademy.com</a>
            </li>
          </ul>
        </div>

      </div>

      {/* Dividers and Copyright */}
      <div className="border-t border-gray-900 pt-8 mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
        <p>&copy; {new Date().getFullYear()} Smart Computer Academy. All rights reserved.</p>
        <p className="text-slate-600">ISO 9001:2015 Certified Center | Udyam Regd</p>
      </div>
    </div>
  </footer>
);

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/20">
      <Navbar />
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
