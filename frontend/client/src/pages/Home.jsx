import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const whyUs = [
  { icon: '🎯', title: 'Expert Team', desc: 'Certified professionals with deep expertise in modern web and mobile technologies.' },
  { icon: '⚡', title: 'Fast Delivery', desc: 'Agile methodology ensures on-time delivery without compromising quality.' },
  { icon: '📈', title: 'Scalable Solutions', desc: 'Architecture designed to grow seamlessly with your business needs.' },
  { icon: '✨', title: 'Clean Code', desc: 'Well-documented, maintainable code following industry best practices.' },
  { icon: '🛡️', title: 'Ongoing Support', desc: 'Dedicated post-launch support, monitoring, and continuous improvements.' },
  { icon: '🎨', title: 'Modern UI/UX', desc: 'Pixel-perfect designs that deliver exceptional user experiences.' },
];

const steps = [
  { num: '01', title: 'Discovery', desc: 'We understand your goals, audience, and technical requirements.', icon: '🔍', color: 'from-blue-500 to-blue-600' },
  { num: '02', title: 'Design', desc: 'Wireframes and UI/UX prototypes crafted to your brand identity.', icon: '🎨', color: 'from-purple-500 to-purple-600' },
  { num: '03', title: 'Development', desc: 'Clean, scalable code built with modern frameworks.', icon: '⚙️', color: 'from-emerald-500 to-emerald-600' },
  { num: '04', title: 'Testing', desc: 'Rigorous QA testing across devices, browsers, and edge cases.', icon: '🧪', color: 'from-orange-500 to-orange-600' },
  { num: '05', title: 'Launch', desc: 'Smooth deployment with monitoring and ongoing maintenance.', icon: '🚀', color: 'from-rose-500 to-rose-600' },
];

// Service images from Unsplash (free, no auth needed)
const serviceImages = {
  'web-development': 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80',
  'app-development': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80',
};

const getIcon = (s) => {
  if (s.slug === 'web-development') return '🌐';
  if (s.slug === 'app-development') return '📱';
  return '💡';
};

function useReveal() {
  useEffect(() => {
    const run = () => {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
      }, { threshold: 0.08 });
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => obs.observe(el));
      return obs;
    };
    const obs = run();
    return () => obs.disconnect();
  }, []);
}

export default function Home() {
  const [services, setServices] = useState([]);
  const [servicesLoaded, setServicesLoaded] = useState(false);
  useReveal();

  useEffect(() => {
    axios.get('/api/services')
      .then(r => { setServices(r.data); setServicesLoaded(true); })
      .catch(() => setServicesLoaded(true));
  }, []);

  return (
    <main>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden animated-gradient">
        <div className="orb w-[600px] h-[600px] bg-accent/15 -top-40 -left-40" />
        <div className="orb w-[400px] h-[400px] bg-blue-400/10 top-1/2 -right-20" />
        <div className="orb w-[300px] h-[300px] bg-accent/10 bottom-0 left-1/3" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-20 w-full">
          <div className="max-w-4xl mx-auto text-center">
            <div className="badge mb-8 animate-fade-in">
              <span className="w-2 h-2 bg-emerald rounded-full animate-pulse-slow"></span>
              Premium Software Development Company
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[1.05] mb-6 animate-fade-up">
              We Build Digital Products{' '}
              <span className="gradient-text">That Drive</span>{' '}
              Business Growth
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: '0.15s' }}>
              DynastyGlobalTech delivers exceptional digital experiences from first consultation to final launch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <Link to="/contact" className="btn-primary text-base px-8 py-4">
                Start Your Project
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link to="/services" className="btn-outline text-base px-8 py-4">Explore Services</Link>
            </div>
            <div className="mt-16 flex flex-wrap justify-center gap-2 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              {['React', 'Node.js', 'MongoDB', 'React Native', 'Flutter', 'AWS', 'Next.js'].map(t => (
                <span key={t} className="bg-white/5 border border-white/10 text-gray-400 text-xs px-3 py-1.5 rounded-full">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-1.5">
            <div className="w-1 h-2.5 bg-white/40 rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* SERVICES — no reveal class so they always show */}
      <section className="py-24 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="section-label">What We Build</span>
            <h2 className="section-title">Our Core Services</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              End-to-end digital solutions designed to accelerate your business in the modern world.
            </p>
          </div>

          {!servicesLoaded ? (
            <div className="flex justify-center py-16">
              <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : services.length === 0 ? (
            <p className="text-center text-gray-400 py-16">No services found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((s) => (
                <div key={s._id} className="bg-white rounded-3xl overflow-hidden border border-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group">
                  {/* Service image */}
                  <div className="h-52 overflow-hidden bg-gray-100 relative">
                    <img
                      src={serviceImages[s.slug] || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80'}
                      alt={s.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={e => { e.target.style.display = 'none'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-4xl">{getIcon(s)}</div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">{s.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{s.description}</p>
                    {s.features?.length > 0 && (
                      <ul className="space-y-1.5 mb-5">
                        {s.features.slice(0, 4).map((f, fi) => (
                          <li key={fi} className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0"></span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}
                    <Link to={`/services#${s.slug}`}
                      className="inline-flex items-center gap-1.5 text-accent text-sm font-semibold hover:gap-3 transition-all">
                      Learn more
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FROM IDEA TO IMPLEMENTATION */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 reveal">
            <span className="section-label">Our Process</span>
            <h2 className="section-title">From Idea to Implementation</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              A proven 5-step process that takes your concept from a rough idea to a fully deployed product.
            </p>
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {steps.map((step, i) => (
                <div key={step.num} className="relative text-center reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg hover:scale-110 transition-transform duration-300 cursor-default`}>
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-accent text-white text-xs font-black rounded-full flex items-center justify-center">
                    {i + 1}
                  </div>
                  <h4 className="font-bold text-primary mb-1.5">{step.title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US — no reveal so always visible */}
      <section className="py-24 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="section-label">Why Choose Us</span>
            <h2 className="section-title">The DynastyGlobalTech Advantage</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              We deliver exceptional digital experiences from first consultation to final launch.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((w, i) => (
              <div key={w.title} className="glow-card card">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-2xl mb-4">
                  {w.icon}
                </div>
                <h3 className="font-bold text-primary mb-2">{w.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 animated-gradient relative overflow-hidden">
        <div className="orb w-96 h-96 bg-accent/20 -top-20 -right-20" />
        <div className="orb w-64 h-64 bg-blue-400/10 bottom-0 left-10" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5">
            Ready to Build Something <span className="gradient-text">Extraordinary?</span>
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Let's discuss your project requirements and create a solution that drives real results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary text-base px-10 py-4">Start Your Project</Link>
            <Link to="/services" className="btn-outline text-base px-10 py-4">View Services</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
