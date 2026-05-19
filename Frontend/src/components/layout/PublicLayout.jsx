import { useState, useEffect } from "react";
import { Outlet, Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Phone, MapPin, Mail, Facebook, Youtube, Instagram } from "lucide-react";

// ─── Navbar ──────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Shadow on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/courses", label: "Courses" },
    { to: "/about", label: "About Us" },
    { to: "/gallery", label: "Gallery" },
    { to: "/verify-certificate", label: "Verify Certificate" },
    { to: "/student-result", label: "Results" },
    { to: "/contact", label: "Contact" },
  ];

  const linkClass = ({ isActive }) =>
    `text-sm font-semibold transition-colors duration-200 ${
      isActive
        ? "text-red-600 border-b-2 border-red-600 pb-0.5"
        : "text-gray-700 hover:text-red-600"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      {/* Top Bar */}
      <div className="bg-gray-900 text-white text-xs py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <MapPin size={11} className="text-red-400" />
              S.S.V. College Road, Near STS Coaching, Kahalgaon
            </span>
            <span className="flex items-center gap-1">
              <Mail size={11} className="text-red-400" />
              smartcomputeracademy@gmail.com
            </span>
          </div>
          <a
            href="tel:+919905788324"
            className="flex items-center gap-1 text-red-400 font-bold hover:text-red-300 transition-colors"
          >
            <Phone size={11} />
            +91 99057 88324
          </a>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <img
              src="/logo.jpg"
              alt="Smart Computer Academy Logo"
              className="h-10 w-auto object-contain"
              onError={(e) => { e.target.style.display = "none"; }}
            />
            <div className="leading-tight">
              <p className="text-[13px] font-black text-gray-900 tracking-tight">
                Smart Computer
              </p>
              <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest">
                Academy
              </p>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.to === "/"} className={linkClass}>
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden sm:inline-flex items-center px-4 py-1.5 bg-red-600 text-white text-sm font-bold rounded-full hover:bg-gray-900 transition-colors duration-200"
            >
              Login
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation"
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-gray-100 pb-4 pt-2 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-red-50 text-red-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-red-600"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="pt-2 px-4">
              <Link
                to="/login"
                className="block text-center w-full py-2.5 bg-red-600 text-white text-sm font-bold rounded-xl hover:bg-gray-900 transition-colors"
              >
                Student / Admin Login
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

// ─── Footer ──────────────────────────────────────────────────────────────────
const Footer = () => {
  const quickLinks = [
    { to: "/courses", label: "Our Courses" },
    { to: "/about", label: "About Academy" },
    { to: "/gallery", label: "Photo Gallery" },
    { to: "/verify-certificate", label: "Verify Certificate" },
    { to: "/student-result", label: "Student Results" },
    { to: "/franchise", label: "Franchise Inquiry" },
    { to: "/contact", label: "Contact Us" },
  ];

  return (
    <footer className="bg-gray-950 text-gray-300 pt-12 pb-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/logo.jpg"
                alt="Smart Computer Academy"
                className="h-10 w-auto object-contain rounded-lg"
                onError={(e) => { e.target.style.display = "none"; }}
              />
              <div>
                <p className="text-white font-black text-sm tracking-tight">
                  Smart Computer Academy
                </p>
                <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">
                  Kahalgaon
                </p>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-gray-400 mb-4">
              Regd. By Govt. of India | ISO 9001:2015 Certified. Empowering students with quality computer education since day one.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-blue-600 transition-colors"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-red-600 transition-colors"
              >
                <Youtube size={16} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-pink-600 transition-colors"
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-xs text-gray-400 hover:text-red-400 transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-xs text-gray-400">
                <MapPin size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
                S.S.V. College Road, Near STS Coaching, Kahalgaon, Bihar
              </li>
              <li>
                <a
                  href="tel:+919905788324"
                  className="flex items-center gap-2 text-xs text-gray-400 hover:text-red-400 transition-colors"
                >
                  <Phone size={14} className="text-red-500 flex-shrink-0" />
                  +91 99057 88324
                </a>
              </li>
              <li>
                <a
                  href="mailto:smartcomputeracademy@gmail.com"
                  className="flex items-center gap-2 text-xs text-gray-400 hover:text-red-400 transition-colors"
                >
                  <Mail size={14} className="text-red-500 flex-shrink-0" />
                  smartcomputeracademy@gmail.com
                </a>
              </li>
            </ul>
            <div className="mt-4 text-[10px] text-gray-500 leading-relaxed">
              <p className="font-semibold text-gray-400 mb-1">Working Hours:</p>
              <p>Mon – Sat: 9:00 AM – 7:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] text-gray-500">
          <p>
            © {new Date().getFullYear()} Smart Computer Academy Kahalgaon. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link to="/franchise" className="hover:text-red-400 transition-colors">
              Franchise
            </Link>
            <Link to="/contact" className="hover:text-red-400 transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ─── Public Layout ────────────────────────────────────────────────────────────
const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
