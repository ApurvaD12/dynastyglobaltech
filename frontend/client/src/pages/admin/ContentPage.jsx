import { useEffect, useState } from 'react';
import api from '../../utils/api';

export default function ContentPage() {
  const [hero, setHero] = useState({ heading: '', subheading: '', ctaText: '' });
  const [about, setAbout] = useState({ heading: '', subheading: '', body: '', certifications: [] });
  const [heroMsg, setHeroMsg] = useState('');
  const [aboutMsg, setAboutMsg] = useState('');
  const [uploading, setUploading] = useState(false);
  const [certName, setCertName] = useState('');

  useEffect(() => {
    api.get('/content/hero').then(r => setHero(r.data)).catch(() => {});
    api.get('/content/about').then(r => setAbout(r.data)).catch(() => {});
  }, []);

  const saveHero = async e => {
    e.preventDefault();
    await api.put('/content/hero', hero);
    setHeroMsg('Hero content saved!');
    setTimeout(() => setHeroMsg(''), 3000);
  };

  const saveAbout = async e => {
    e.preventDefault();
    await api.put('/content/about', { heading: about.heading, subheading: about.subheading, body: about.body });
    setAboutMsg('About content saved!');
    setTimeout(() => setAboutMsg(''), 3000);
  };

  const uploadCert = async e => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('image', file);
    fd.append('name', certName || file.name);
    try {
      const { data } = await api.post('/content/about/certifications', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setAbout(prev => ({ ...prev, certifications: data.content.certifications }));
      setCertName('');
    } catch { alert('Upload failed'); }
    finally { setUploading(false); e.target.value = ''; }
  };

  const removeCert = async url => {
    const filename = url.split('/').pop();
    await api.delete(`/content/about/certifications/${filename}`);
    setAbout(prev => ({ ...prev, certifications: prev.certifications.filter(c => c.url !== url) }));
  };

  const Input = ({ label, value, onChange, placeholder }) => (
    <div>
      <label className="block text-xs font-medium text-slate-600 mb-1">{label}</label>
      <input className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        value={value} onChange={onChange} placeholder={placeholder} />
    </div>
  );

  const Textarea = ({ label, value, onChange, rows = 3, placeholder }) => (
    <div>
      <label className="block text-xs font-medium text-slate-600 mb-1">{label}</label>
      <textarea rows={rows} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        value={value} onChange={onChange} placeholder={placeholder} />
    </div>
  );

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-slate-800">Content Management</h1>

      {/* Hero */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="font-semibold text-slate-700 mb-5">🏠 Hero Section</h2>
        <form onSubmit={saveHero} className="space-y-4">
          <Input label="Main Heading" value={hero.heading} onChange={e => setHero({ ...hero, heading: e.target.value })} placeholder="Building Digital Solutions..." />
          <Textarea label="Subheading" value={hero.subheading} onChange={e => setHero({ ...hero, subheading: e.target.value })} placeholder="DynastyGlobalTech delivers..." />
          <Input label="CTA Button Text" value={hero.ctaText} onChange={e => setHero({ ...hero, ctaText: e.target.value })} placeholder="Get a Free Consultation" />
          {heroMsg && <p className="text-green-600 text-sm bg-green-50 border border-green-200 px-4 py-2 rounded-xl">{heroMsg}</p>}
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors">Save Hero</button>
        </form>
      </div>

      {/* About */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="font-semibold text-slate-700 mb-5">ℹ️ About Section</h2>
        <form onSubmit={saveAbout} className="space-y-4">
          <Input label="Heading" value={about.heading} onChange={e => setAbout({ ...about, heading: e.target.value })} placeholder="About DynastyGlobalTech" />
          <Input label="Subheading" value={about.subheading} onChange={e => setAbout({ ...about, subheading: e.target.value })} placeholder="Innovation. Excellence. Trust." />
          <Textarea label="Body Text" rows={6} value={about.body} onChange={e => setAbout({ ...about, body: e.target.value })} placeholder="Company description..." />
          {aboutMsg && <p className="text-green-600 text-sm bg-green-50 border border-green-200 px-4 py-2 rounded-xl">{aboutMsg}</p>}
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors">Save About</button>
        </form>
      </div>

      {/* Certifications */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="font-semibold text-slate-700 mb-5">🏆 Certifications</h2>
        <div className="flex gap-3 mb-4">
          <input
            className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Certification name (e.g. ISO 9001)"
            value={certName}
            onChange={e => setCertName(e.target.value)}
          />
          <label className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-colors">
            {uploading ? 'Uploading...' : '+ Upload Image'}
            <input type="file" accept="image/*" className="hidden" onChange={uploadCert} disabled={uploading} />
          </label>
        </div>

        {about.certifications?.length > 0 ? (
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
            {about.certifications.map((cert, i) => (
              <div key={i} className="relative group rounded-xl border border-slate-200 overflow-hidden">
                <img src={cert.url} alt={cert.name} className="w-full h-20 object-contain p-2" />
                <p className="text-xs text-center text-slate-500 pb-2 px-1 truncate">{cert.name}</p>
                <button
                  onClick={() => removeCert(cert.url)}
                  className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >✕</button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400 text-center py-6 bg-slate-50 rounded-xl">No certifications uploaded yet</p>
        )}
      </div>
    </div>
  );
}