import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3 group">
      <div className="relative w-9 h-9 flex-shrink-0">
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <rect width="36" height="36" rx="8" fill="#2563eb"/>
          <path d="M8 10h8l6 8-6 8H8l6-8-6-8z" fill="white" opacity="0.9"/>
          <path d="M18 10h10l-6 8 6 8H18l6-8-6-8z" fill="white" opacity="0.5"/>
        </svg>
      </div>
      <div className="leading-none">
        <span className="text-white font-black text-base tracking-tight">Dynasty</span>
        <span className="text-accent-light font-black text-base tracking-tight">Global</span>
        <span className="text-white font-black text-base tracking-tight">Tech</span>
      </div>
    </Link>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  const navLinks = [
    { to: '/', label: 'Home', end: true },
    { to: '/about', label: 'About', end: false },
    { to: '/services', label: 'Services', end: false },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-primary/95 backdrop-blur-md shadow-2xl border-b border-white/5' : 'bg-primary'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Logo />

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink to={to} end={end}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'text-accent-light bg-accent/10' : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`
                }>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/admin/login"
            className="text-gray-300 hover:text-white text-sm font-medium px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
            Admin
          </Link>
          <Link to="/contact"
            className="bg-accent hover:bg-accent-dark text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5">
            Contact Us
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors" onClick={() => setOpen(!open)}>
          {open ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-primary/98 backdrop-blur-md border-t border-white/10 px-4 py-4 space-y-1">
          {navLinks.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end}
              className={({ isActive }) =>
                `block text-sm font-medium py-2.5 px-4 rounded-xl ${
                  isActive ? 'text-accent-light bg-accent/10' : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`
              }>
              {label}
            </NavLink>
          ))}
          <Link to="/admin/login" className="block text-gray-300 hover:text-white text-sm font-medium py-2.5 px-4 rounded-xl hover:bg-white/5 transition-colors">
            Admin Login
          </Link>
          <div className="pt-2">
            <Link to="/contact" className="block bg-accent text-white text-sm font-semibold px-5 py-3 rounded-xl text-center shadow-lg shadow-accent/25">
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
