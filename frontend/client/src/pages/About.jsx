import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const values = [
  { icon: '🎯', title: 'Client-First', desc: 'Every decision is driven by your business goals and end-user needs.' },
  { icon: '⚡', title: 'Agile Execution', desc: 'We deliver on time using proven Agile methodology and transparent communication.' },
  { icon: '💎', title: 'Quality Code', desc: 'Clean, maintainable code that meets the highest engineering standards.' },
  { icon: '🔒', title: 'Confidentiality', desc: 'Your intellectual property and business data are fully protected.' },
];

const team = [
  { name: 'Harshada Sandesh Gite', photo: '/team/68ea02d4c5f4b.jpg' },
  { name: 'Sandesh Nanasaheb Gite', photo: '/team/68ea0313ed621.jpeg' },
];

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

export default function About() {
  const [about, setAbout] = useState({ heading: '', subheading: '', body: '' });
  useReveal();

  useEffect(() => {
    axios.get('/api/content/about').then(r => setAbout(r.data)).catch(() => {});
  }, []);

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="animated-gradient py-24 text-center relative overflow-hidden">
        <div className="orb w-96 h-96 bg-accent/15 -top-20 -left-20" />
        <div className="orb w-64 h-64 bg-blue-400/10 bottom-0 right-10" />
        <div className="relative max-w-4xl mx-auto px-4">
          <span className="section-label text-accent-light">About Us</span>
          <h1 className="text-5xl md:text-6xl font-black text-white mt-3 mb-4 animate-fade-up">
            {about.heading || 'About DynastyGlobalTech'}
          </h1>
          <p className="text-gray-400 text-xl">{about.subheading || 'Innovation. Excellence. Trust.'}</p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="reveal-left">
            <span className="section-label">Our Story</span>
            <h2 className="section-title mb-6">Building Digital Excellence Since Day One</h2>
            <div className="text-gray-600 leading-relaxed space-y-4">
              {(about.body ||
                'DynastyGlobalTech helps businesses grow through innovative software solutions, modern websites, mobile apps, and digital transformation.\n\nFounded on the principles of quality and client-first thinking, we partner with startups, SMEs, and enterprises to build technology that makes a real difference. Our team of certified engineers and designers work collaboratively to deliver projects on time, within budget, and beyond expectations.\n\nFrom concept to deployment, we are your trusted technology partner.'
              ).split('\n\n').map((p, i) => <p key={i} className="text-sm leading-relaxed">{p}</p>)}
            </div>
            <Link to="/contact" className="mt-8 btn-primary inline-flex">
              Work With Us
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 reveal-right">
            {values.map((v, i) => (
              <div key={v.title} className="glow-card bg-light rounded-2xl p-5 border border-border hover:border-accent/30 transition-all">
                <div className="text-3xl mb-3">{v.icon}</div>
                <h4 className="font-bold text-primary text-sm mb-1">{v.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 reveal">
            <span className="section-label">Why Choose Us</span>
            <h2 className="section-title">We Go the Extra Mile</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              We deliver exceptional digital experiences from first consultation to final launch.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '👨‍💻', title: 'Expert Team', desc: 'Certified professionals with deep expertise in modern web and mobile technologies, delivering quality at every stage.' },
              { icon: '🎯', title: 'Results-Driven', desc: 'Every solution is tailored to meet real business demands, ensuring measurable outcomes and ROI for our clients.' },
              { icon: '🏆', title: 'Proven Track Record', desc: 'Since our founding, we have helped businesses build successful digital products with consistent results and client satisfaction.' },
            ].map((w, i) => (
              <div key={w.title} className="glow-card card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-2xl mb-4">{w.icon}</div>
                <h3 className="font-bold text-primary mb-2">{w.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <span className="section-label">Our People</span>
          <h2 className="section-title mt-1 mb-14">Meet the Team</h2>
          <div className="flex flex-col sm:flex-row gap-10 justify-center items-center">
            {team.map((m, i) => (
              <div key={m.name} className="reveal group" style={{ transitionDelay: `${i * 0.15}s` }}>
                <div className="w-64 bg-white rounded-3xl shadow-card hover:shadow-card-hover overflow-hidden border border-border transition-all duration-300 hover:-translate-y-2">
                  <div className="h-72 overflow-hidden bg-gray-100">
                    <img src={m.photo} alt={m.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="font-bold text-primary">{m.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
