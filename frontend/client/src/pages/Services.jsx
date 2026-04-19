import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const serviceColors = {
  'web-development': { accent: '#2563eb', light: 'rgba(37,99,235,0.08)', border: 'rgba(37,99,235,0.2)' },
  'app-development': { accent: '#7c3aed', light: 'rgba(124,58,237,0.08)', border: 'rgba(124,58,237,0.2)' },
};

const getEmoji = (s) => {
  if (s.slug === 'web-development') return '🌐';
  if (s.slug === 'app-development') return '📱';
  return '💡';
};

const defaultServices = [
  {
    _id: 'web-development',
    title: 'Web Development',
    slug: 'web-development',
    description: 'We craft high-performance, scalable web applications tailored to your business goals. From custom websites to enterprise platforms, we build experiences that convert and grow.',
    features: [
      'Custom website design and development',
      'Responsive mobile-first layouts',
      'E-commerce and payment integration',
      'CMS and backend API development',
      'Performance optimization and SEO',
      'Ongoing support and maintenance'
    ],
    benefits: [
      'Fast delivery with a proven process',
      'Solutions designed to scale',
      'High-quality code and architecture',
      'Optimized for conversions and speed',
      'Clear communication on every step'
    ],
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'TypeScript'],
    order: 1
  },
  {
    _id: 'app-development',
    title: 'App Development',
    slug: 'app-development',
    description: 'Transform your app idea into a polished iOS and Android experience with intuitive design, fast performance, and robust backend support.',
    features: [
      'Native iOS and Android development',
      'Cross-platform solutions with React Native',
      'Push notifications and real-time features',
      'API integration and backend services',
      'App Store and Play Store deployment',
      'User-centered interface and usability testing'
    ],
    benefits: [
      'Expert mobile developers with real app experience',
      'Modern designs focused on engagement',
      'Ongoing maintenance after launch',
      'Transparent progress and communication',
      'Apps built to support business growth'
    ],
    techStack: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
    order: 2
  }
];

function useReveal(deps = []) {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, deps);
}

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  useReveal([services]);

  useEffect(() => {
    axios.get('/api/services')
      .then(r => {
        setServices(r.data.length ? r.data : defaultServices);
        setLoading(false);
      })
      .catch(() => {
        setServices(defaultServices);
        setLoading(false);
      });
  }, []);

  // Scroll to anchor after services load
  useEffect(() => {
    if (!loading && location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  }, [loading, location.hash]);

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="animated-gradient py-24 text-center relative overflow-hidden">
        <div className="orb w-96 h-96 bg-accent/15 -top-20 -left-20" />
        <div className="orb w-64 h-64 bg-purple-400/10 bottom-0 right-10" />
        <div className="relative max-w-4xl mx-auto px-4">
          <span className="section-label text-accent-light">What We Offer</span>
          <h1 className="text-5xl md:text-6xl font-black text-white mt-3 mb-5 animate-fade-up">
            Our <span className="gradient-text">Services</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Comprehensive digital solutions built with cutting-edge technology to accelerate your business.
          </p>
        </div>
      </section>

      {/* Services */}
      {loading ? (
        <div className="py-32 text-center">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading services...</p>
        </div>
      ) : services.length === 0 ? (
        <div className="py-32 text-center text-gray-400">No services available.</div>
      ) : (
        services.map((s, i) => {
          const colors = serviceColors[s.slug] || serviceColors['web-development'];
          const emoji = getEmoji(s);
          const isEven = i % 2 === 0;

          return (
            <section key={s._id || s.slug} id={s.slug} className={`py-24 ${isEven ? 'bg-white' : 'bg-light'}`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Service header */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-16 reveal">
                  <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl shadow-xl flex-shrink-0"
                    style={{ background: colors.light, border: `2px solid ${colors.border}` }}>
                    {emoji}
                  </div>
                  <div>
                    <h2 className="text-4xl font-black text-primary">{s.title}</h2>
                    <p className="text-gray-500 mt-2 max-w-2xl leading-relaxed">{s.description}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-[1.45fr_1fr] gap-12 items-start">
                  {/* Features */}
                  <div className="reveal-left">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-bold"
                        style={{ background: colors.accent }}>✦</div>
                      <h3 className="text-xl font-bold text-primary">What We Offer</h3>
                    </div>
                    <div className="space-y-3">
                      {s.features?.map((f, fi) => (
                        <div key={fi} className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-border hover:border-accent/30 hover:shadow-md transition-all duration-300 group">
                          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform"
                            style={{ background: colors.accent }}>
                            {fi + 1}
                          </div>
                          <p className="text-gray-700 text-sm leading-relaxed">{f}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="reveal-right space-y-8">
                    <div className="rounded-[2rem] overflow-hidden bg-gradient-to-br from-slate-950/5 via-slate-50 to-slate-100 border border-border shadow-xl">
                      <div className="h-[28rem] flex flex-col items-center justify-center gap-5 px-10 text-center">
                        <div className="w-24 h-24 rounded-full flex items-center justify-center bg-white/95 shadow-xl text-5xl">
                          {emoji}
                        </div>
                        <div>
                          <h3 className="text-3xl font-black text-slate-900">{s.title}</h3>
                          <p className="mt-4 text-gray-600 leading-relaxed max-w-lg mx-auto">
                            {s.slug === 'web-development'
                              ? 'Beautiful, conversion-ready websites designed for speed, reliability, and SEO.'
                              : 'Mobile apps with polished UI, fast performance, and delightful user experiences.'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4">
                      <div className="rounded-3xl border border-border bg-white p-5 shadow-sm">
                        <p className="text-xs uppercase tracking-[0.24em] text-gray-400 mb-3">Service Snapshot</p>
                        <ul className="space-y-3 text-sm text-gray-700">
                          <li>• {s.slug === 'web-development' ? 'Responsive websites across all devices' : 'Native-like performance on iOS and Android'}</li>
                          <li>• {s.slug === 'web-development' ? 'SEO-ready pages that load fast' : 'Real-time features and offline support'}</li>
                          <li>• {s.slug === 'web-development' ? 'Secure backend and modern UX' : 'App store deployment and updates'}</li>
                        </ul>
                      </div>

                      {s.techStack?.length > 0 && (
                        <div className="rounded-3xl border border-border bg-white p-5 shadow-sm">
                          <p className="text-xs uppercase tracking-[0.24em] text-gray-400 mb-3">Tech Stack</p>
                          <div className="flex flex-wrap gap-2">
                            {s.techStack.map(t => (
                              <span key={t} className="bg-slate-50 border border-border text-gray-600 text-xs px-3 py-1.5 rounded-full font-medium">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <Link to="/contact"
                        className="inline-flex items-center justify-center gap-2 w-full text-white font-semibold px-6 py-3 rounded-xl transition-all hover:opacity-95 hover:shadow-lg"
                        style={{ background: colors.accent }}>
                        Contact Us
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })
      )}

      {/* CTA */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 reveal">
            <span className="section-label text-accent-light">Why Choose Us</span>
            <h2 className="text-4xl font-black text-primary mt-3">Why DynastyGlobalTech is the right partner for your digital growth</h2>
            <p className="text-gray-500 max-w-2xl mx-auto mt-4">
              We combine technical excellence, fast delivery, and long-term support to turn your project into a business advantage.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="p-6 rounded-3xl bg-white border border-border shadow-sm hover:shadow-lg transition-all duration-300 reveal">
              <h3 className="text-xl font-bold text-primary mb-3">Strategic Expertise</h3>
              <p className="text-gray-600 leading-relaxed">We build solutions that align with your business goals and deliver measurable results.</p>
            </div>
            <div className="p-6 rounded-3xl bg-white border border-border shadow-sm hover:shadow-lg transition-all duration-300 reveal">
              <h3 className="text-xl font-bold text-primary mb-3">Modern Technologies</h3>
              <p className="text-gray-600 leading-relaxed">We use contemporary stacks for fast, maintainable, and scalable applications.</p>
            </div>
            <div className="p-6 rounded-3xl bg-white border border-border shadow-sm hover:shadow-lg transition-all duration-300 reveal">
              <h3 className="text-xl font-bold text-primary mb-3">Transparent Process</h3>
              <p className="text-gray-600 leading-relaxed">You get clear communication, regular updates, and a team that keeps you in control.</p>
            </div>
            <div className="p-6 rounded-3xl bg-white border border-border shadow-sm hover:shadow-lg transition-all duration-300 reveal">
              <h3 className="text-xl font-bold text-primary mb-3">Post-Launch Support</h3>
              <p className="text-gray-600 leading-relaxed">We continue to support and refine your product after launch for long-term success.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 animated-gradient text-center relative overflow-hidden">
        <div className="orb w-80 h-80 bg-accent/20 -top-10 right-10" />
        <div className="relative max-w-2xl mx-auto px-4 reveal">
          <h2 className="text-3xl font-black text-white mb-4">Have a Project in Mind?</h2>
          <p className="text-gray-400 mb-8">Let's discuss your project requirements and build something extraordinary.</p>
          <Link to="/contact" className="btn-primary text-base px-10 py-4">Contact Us</Link>
        </div>
      </section>
    </main>
  );
}
