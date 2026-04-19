import { useState, useCallback } from 'react';
import axios from 'axios';

const contactInfo = [
  { icon: '📞', label: 'Phone', value: '+91 97637 00083', href: 'tel:+919763700083' },
  { icon: '✉️', label: 'Email', value: 'rajcomp94@gmail.com', href: 'mailto:rajcomp94@gmail.com' },
  { icon: '📍', label: 'Indira Nagar Branch', value: '5-6, Adarsha Complex, Opp. Rajsarthi Soc., Indira Nagar, Nashik - 422009', href: null },
  { icon: '📍', label: 'College Road Branch', value: '5, Gangalila Apartment, Opp. Sai Baba Temple, College Road, Nashik - 422005', href: null },
  { icon: '🕐', label: 'Business Hours', value: 'Mon–Sat: 8:00 AM – 9:30 PM', href: null },
];

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = 'Full name is required';
    if (!email.trim()) e.email = 'Email address is required';
    else if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email)) e.email = 'Enter a valid email (e.g. name@example.com)';
    if (!phone.trim()) e.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(phone)) e.phone = 'Enter a valid 10-digit phone number';
    if (!message.trim()) e.message = 'Message is required';
    else if (message.trim().length < 10) e.message = 'Message must be at least 10 characters';
    return e;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus('sending');
    try {
      await axios.post('/api/contact', { name, email, phone, message });
      setStatus('success');
      setName(''); setEmail(''); setPhone(''); setMessage('');
    } catch {
      setStatus('error');
    }
  };

  // Only allow digits in phone
  const handlePhone = useCallback(e => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(val);
  }, []);

  const inputClass = (field) =>
    `w-full border-2 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-0 focus:border-accent ${
      errors[field] ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300 bg-white'
    }`;

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="animated-gradient py-24 text-center relative overflow-hidden">
        <div className="orb w-96 h-96 bg-accent/15 -top-20 -left-20" />
        <div className="relative max-w-4xl mx-auto px-4">
          <span className="section-label text-accent-light">Get In Touch</span>
          <h1 className="text-5xl md:text-6xl font-black text-white mt-3 mb-4 animate-fade-up">Contact Us</h1>
          <p className="text-gray-400 text-xl">Let's discuss your project requirements.</p>
        </div>
      </section>

      <section className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12">

          {/* Form */}
          <div className="bg-white rounded-3xl shadow-card p-8 border border-border">
            <h2 className="text-2xl font-bold text-primary mb-8">Send Us a Message</h2>

            {status === 'success' ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">✅</div>
                <h3 className="text-xl font-bold text-primary mb-2">Enquiry Submitted!</h3>
                <p className="text-gray-500 mb-6">Your enquiry has been submitted. We will contact you shortly.</p>
                <button onClick={() => setStatus('idle')} className="btn-primary">Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    autoComplete="name"
                    className={inputClass('name')}
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1.5">⚠ {errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    autoComplete="email"
                    className={inputClass('email')}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1.5">⚠ {errors.email}</p>}
                </div>

                {/* Phone — numbers only, max 10 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                    <span className="text-gray-400 font-normal ml-1">(10 digits)</span>
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={10}
                    autoComplete="tel"
                    className={inputClass('phone')}
                    value={phone}
                    onChange={handlePhone}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1.5">⚠ {errors.phone}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={5}
                    className={`w-full border-2 rounded-xl px-4 py-3 text-sm outline-none resize-none transition-all duration-200 focus:ring-0 focus:border-accent ${
                      errors.message ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1.5">⚠ {errors.message}</p>}
                </div>

                {status === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                    Something went wrong. Please try again or email us at rajcomp94@gmail.com
                  </div>
                )}

                <button type="submit" disabled={status === 'sending'}
                  className="w-full btn-primary justify-center py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0">
                  {status === 'sending' ? (
                    <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span> Sending...</>
                  ) : 'Submit Enquiry'}
                </button>
              </form>
            )}
          </div>

          {/* Info + Maps */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-card p-8 border border-border">
              <h3 className="text-xl font-bold text-primary mb-6">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-lg flex-shrink-0">{item.icon}</div>
                    <div>
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-0.5">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-sm font-medium text-primary hover:text-accent transition-colors">{item.value}</a>
                      ) : (
                        <p className="text-sm font-medium text-primary">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Indira Nagar — actual Raj Computers location */}
            <div className="rounded-3xl overflow-hidden shadow-card border border-border">
              <div className="bg-primary px-4 py-2.5">
                <p className="text-white text-xs font-semibold">📍 Raj Computers — Indira Nagar, Nashik</p>
              </div>
              <iframe
                title="Raj Computers Indira Nagar Nashik"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3748.8!2d73.7898!3d19.9975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeba3b6e8c4c7%3A0xec17ed8c5bc356ec!2sRaj%20Computers%2094%2C%20Indira%20Nagar%2C%20Nashik%2C%20Maharashtra%20422009!5e0!3m2!1sen!2sin!4v1713000000000!5m2!1sen!2sin"
                width="100%" height="240" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* College Road — actual Raj Computers location */}
            <div className="rounded-3xl overflow-hidden shadow-card border border-border">
              <div className="bg-surface px-4 py-2.5">
                <p className="text-white text-xs font-semibold">📍 Raj Computers — College Road, Nashik</p>
              </div>
              <iframe
                title="Raj Computers College Road Nashik"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3748.2!2d73.7898!3d20.0059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeb9b6e8c4c7%3A0x4976a440f6077aff!2sRaj%20Computers%2094%2C%20College%20Road%2C%20Nashik%2C%20Maharashtra%20422005!5e0!3m2!1sen!2sin!4v1713000000000!5m2!1sen!2sin"
                width="100%" height="220" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
