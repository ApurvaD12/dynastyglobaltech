import { Link } from 'react-router-dom';

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-9 h-9 flex-shrink-0">
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <rect width="36" height="36" rx="8" fill="#2563eb"/>
          <path d="M8 10h8l6 8-6 8H8l6-8-6-8z" fill="white" opacity="0.9"/>
          <path d="M18 10h10l-6 8 6 8H18l6-8-6-8z" fill="white" opacity="0.5"/>
        </svg>
      </div>
      <div className="leading-none">
        <span className="text-white font-black text-base">Dynasty</span>
        <span className="text-accent-light font-black text-base">Global</span>
        <span className="text-white font-black text-base">Tech</span>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-primary text-gray-400 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-2">
          <Logo />
          <p className="text-sm leading-relaxed max-w-sm mt-4">
            Delivering exceptional digital experiences from first consultation to final launch. Web development, mobile apps, and custom software solutions.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {[['/', 'Home'], ['/about', 'About Us'], ['/services', 'Services'], ['/contact', 'Contact']].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="hover:text-white transition-colors hover:translate-x-1 inline-block">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="tel:+919763700083" className="hover:text-white transition-colors">📞 +91 97637 00083</a></li>
            <li><a href="mailto:rajcomp94@gmail.com" className="hover:text-white transition-colors">✉️ rajcomp94@gmail.com</a></li>
            <li className="text-xs leading-relaxed">📍 Indira Nagar, Nashik - 422009</li>
            <li className="text-xs leading-relaxed">📍 College Road, Nashik - 422005</li>
            <li className="text-xs">🕐 Mon–Sat: 8AM – 9:30PM</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 py-5 text-center text-xs text-gray-600">
        © 2026 DynastyGlobalTech
      </div>
    </footer>
  );
}
