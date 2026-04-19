import { Link } from 'react-router-dom';

export default function HomeFooterLinks() {
  return (
    <div className="bg-primary text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-white font-black text-sm">D</div>
            <span className="text-white font-bold">DynastyGlobalTech</span>
          </div>
          <p className="text-sm leading-relaxed max-w-xs">
            Delivering tailored web and mobile app development services to benefit businesses with bespoke solutions.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[['/', 'Home'], ['/about', 'About Us'], ['/services', 'Services'], ['/contact', 'Contact']].map(([to, label]) => (
                <li key={to}><Link to={to} className="hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
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
      </div>
    </div>
  );
}
