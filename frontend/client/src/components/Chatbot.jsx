import { useState, useRef, useEffect } from 'react';

const faqs = [
  { triggers: ['service', 'offer', 'do you', 'what do'], answer: 'We offer two core services:\n1. 🌐 Web Development — Custom websites, e-commerce, enterprise web apps\n2. 📱 App Development — iOS, Android & cross-platform mobile apps\n\nVisit our Services page for full details.' },
  { triggers: ['contact', 'reach', 'phone', 'email', 'call', 'address', 'location', 'where'], answer: '📞 Phone: +91 97637 00083\n✉️ Email: rajcomp94@gmail.com\n\n📍 Indira Nagar Branch:\n5-6, Adarsha Complex, Opp. Rajsarthi Soc., Indira Nagar, Nashik - 422009\n\n📍 College Road Branch:\n5, Gangalila Apt., Opp. Sai Baba Temple, College Road, Nashik - 422005' },
  { triggers: ['price', 'cost', 'charge', 'rate', 'quote', 'budget'], answer: 'Our pricing is project-based and depends on scope, complexity, and timeline.\n\nOur adaptive pricing model offers flexibility without cost overruns. Contact us for a FREE consultation and custom quote!' },
  { triggers: ['time', 'long', 'duration', 'deadline', 'deliver', 'weeks'], answer: 'Our streamlined onboarding ensures a smooth start within two weeks.\n\n• Simple website: 2–4 weeks\n• Complex web app: 6–12 weeks\n• Mobile app: 8–16 weeks\n\nWe use Agile methodology for on-time delivery.' },
  { triggers: ['technology', 'tech', 'stack', 'use', 'built', 'framework'], answer: 'We use modern technologies:\n🌐 Web: React, Node.js, MongoDB, PHP, Laravel, Next.js\n📱 Mobile: React Native, Flutter, Swift, Kotlin\n☁️ Cloud: AWS, Firebase, Azure\n🛠️ Tools: JIRA, TFS, Azure DevOps' },
  { triggers: ['about', 'company', 'who', 'experience', 'years'], answer: 'DynastyGlobalTech is a premier software company with 10+ years of experience.\n\n✅ 100+ Web Projects Delivered\n✅ 50+ iOS & Android Apps\n✅ 99+ Companies Trust Us\n✅ Serving 15+ Countries' },
  { triggers: ['maintenance', 'support', 'after', 'launch', 'update'], answer: 'Yes! We ensure ongoing maintenance post-launch:\n• Analyzing feedback & fixing defects\n• Updating libraries & dependencies\n• Performance monitoring\n• Security patches & enhancements\n\nYour success is our long-term commitment.' },
  { triggers: ['hello', 'hi', 'hey', 'greet', 'start'], answer: 'Hello! 👋 Welcome to DynastyGlobalTech!\n\nI\'m here to help you with information about our services, pricing, timeline, or contact details. What would you like to know?' }
];

const quickReplies = ['What services do you offer?', 'Contact & Address?', 'How long does a project take?', 'What technologies do you use?'];

function getBotReply(input) {
  const lower = input.toLowerCase();
  const match = faqs.find(f => f.triggers.some(t => lower.includes(t)));
  return match?.answer || "I'm not sure about that. Please contact us directly:\n📞 +91 97637 00083\n✉️ rajcomp94@gmail.com\n\nWe'd love to help! 😊";
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! 👋 I'm DynastyBot. How can I help you today?\n\nAsk me about our services, pricing, or contact info!" }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setMessages(prev => [...prev, { from: 'user', text: msg }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { from: 'bot', text: getBotReply(msg) }]);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-80 sm:w-96 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 max-h-[500px]">
          <div className="bg-gradient-to-r from-primary to-accent px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-lg">🤖</div>
              <div>
                <p className="text-white font-semibold text-sm">DynastyBot</p>
                <p className="text-green-300 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block"></span> Online
                </p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white text-xl leading-none">✕</button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50 min-h-[200px]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm whitespace-pre-line ${m.from === 'user' ? 'bg-accent text-white rounded-br-sm' : 'bg-white text-gray-800 shadow-sm rounded-bl-sm border border-gray-100'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100 text-gray-400 text-sm">
                  <span className="animate-pulse">typing...</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <div className="px-3 py-2 bg-white border-t border-gray-100 flex flex-wrap gap-1">
            {quickReplies.map((q, i) => (
              <button key={i} onClick={() => sendMessage(q)}
                className="text-xs bg-red-50 text-accent border border-accent/30 rounded-full px-2.5 py-1 hover:bg-accent hover:text-white transition-colors">
                {q}
              </button>
            ))}
          </div>
          <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input
              className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
              placeholder="Type a message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={() => sendMessage()} className="bg-accent hover:bg-accent-dark text-white px-3 py-2 rounded-xl text-sm transition-colors">➤</button>
          </div>
        </div>
      )}
      <button onClick={() => setOpen(!open)}
        className="w-14 h-14 bg-accent hover:bg-accent-dark text-white rounded-full shadow-lg flex items-center justify-center text-2xl transition-all hover:scale-110"
        aria-label="Open chat">
        {open ? '✕' : '💬'}
      </button>
    </div>
  );
}
