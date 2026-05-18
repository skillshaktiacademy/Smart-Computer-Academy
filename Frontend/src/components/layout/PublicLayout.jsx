import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Menu, X, LogIn, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "About", path: "/about" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
    { name: "Franchise", path: "/franchise" },
    { name: "Verify", path: "/verify-certificate" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">SS</span>
              </div>
              <span className="text-primary font-bold text-xl hidden md:block">
                Skill Shakti Academy
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-600 hover:text-primary font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
            {isAuthenticated ? (
              <Link
                to={`/dashboard/${user.role}`}
                className="btn-primary flex items-center space-x-2"
              >
                <span>Dashboard</span>
                <ChevronRight size={18} />
              </Link>
            ) : (
              <Link to="/login" className="btn-primary flex items-center space-x-2">
                <LogIn size={18} />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-primary"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary rounded-lg font-medium"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 px-4">
                {isAuthenticated ? (
                  <Link
                    to={`/dashboard/${user.role}`}
                    onClick={() => setIsOpen(false)}
                    className="w-full btn-primary flex justify-center"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="w-full btn-primary flex justify-center"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

import content from "../../data/siteContent.json";

const Footer = () => (
  <footer className="bg-primary text-white pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-primary font-bold text-xl">SS</span>
            </div>
            <span className="text-white font-bold text-2xl">Skill Shakti Academy</span>
          </div>
          <p className="text-gray-300 max-w-md leading-relaxed">
            {content.about.paragraph1}
          </p>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-6">Quick Links</h4>
          <ul className="space-y-3">
            {content.footerLinks.quickLinks.map((link, i) => (
              <li key={i}><Link to={link.href} className="hover:text-accent transition-colors">{link.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-6">Contact Us</h4>
          <p className="text-gray-300 mb-2">{content.footerLinks.contact.address}</p>
          <p className="text-gray-300 mb-2 font-bold">{content.footerLinks.contact.phone}</p>
          <p className="text-gray-300">{content.footerLinks.contact.email}</p>
        </div>
      </div>
      <div className="border-t border-white/10 pt-8 text-center text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Skill Shakti Academy. All rights reserved.</p>
        <p className="mt-2 text-[10px] uppercase tracking-widest opacity-50">Empowering Bihar through Digital Literacy</p>
      </div>
    </div>
  </footer>
);

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Outlet />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
