import { useEffect, useState } from 'react';
import api from '../../utils/api';

const empty = { title: '', slug: '', description: '', features: '', benefits: '', icon: '' };

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [msg, setMsg] = useState({ text: '', type: '' });

  const fetch = () => api.get('/services').then(r => setServices(r.data));
  useEffect(() => { fetch(); }, []);

  const showMsg = (text, type = 'success') => {
    setMsg({ text, type });
    setTimeout(() => setMsg({ text: '', type: '' }), 3000);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.title || !form.description) { showMsg('Title and description are required', 'error'); return; }
    const payload = {
      ...form,
      slug: form.slug || form.title.toLowerCase().replace(/\s+/g, '-'),
      features: form.features ? form.features.split('\n').filter(Boolean) : [],
      benefits: form.benefits ? form.benefits.split('\n').filter(Boolean) : []
    };
    try {
      if (editId) { await api.put(`/services/${editId}`, payload); showMsg('Service updated!'); }
      else { await api.post('/services', payload); showMsg('Service created!'); }
      setForm(empty); setEditId(null); fetch();
    } catch (err) {
      showMsg(err.response?.data?.message || 'Error saving service', 'error');
    }
  };

  const startEdit = s => {
    setEditId(s._id);
    setForm({ title: s.title, slug: s.slug, description: s.description, icon: s.icon || '', features: s.features?.join('\n') || '', benefits: s.benefits?.join('\n') || '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async id => {
    if (!confirm('Delete this service?')) return;
    await api.delete(`/services/${id}`);
    fetch();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Services</h1>

      {/* Form */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
        <h2 className="font-semibold text-slate-700 mb-5">{editId ? 'Edit Service' : 'Add New Service'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Title *</label>
              <input className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Web Development" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Icon (emoji)</label>
              <input className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="🌐" value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Description *</label>
            <textarea rows={3} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Service description..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Features (one per line)</label>
              <textarea rows={4} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Custom Design&#10;Responsive Layout&#10;SEO Optimized" value={form.features} onChange={e => setForm({ ...form, features: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Benefits (one per line)</label>
              <textarea rows={4} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Faster delivery&#10;Scalable solution&#10;Better ROI" value={form.benefits} onChange={e => setForm({ ...form, benefits: e.target.value })} />
            </div>
          </div>
          {msg.text && (
            <div className={`text-sm px-4 py-3 rounded-xl ${msg.type === 'error' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-green-50 text-green-600 border border-green-200'}`}>
              {msg.text}
            </div>
          )}
          <div className="flex gap-3">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors">
              {editId ? 'Update Service' : 'Add Service'}
            </button>
            {editId && (
              <button type="button" onClick={() => { setEditId(null); setForm(empty); }} className="px-6 py-2.5 rounded-xl text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List */}
      <div className="space-y-3">
        {services.map(s => (
          <div key={s._id} className="bg-white rounded-2xl border border-slate-200 p-5 flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <span className="text-3xl">{s.icon || '⚙️'}</span>
              <div>
                <p className="font-semibold text-slate-800">{s.title}</p>
                <p className="text-sm text-slate-500 mt-1 line-clamp-2">{s.description}</p>
                <p className="text-xs text-slate-400 mt-1">{s.features?.length || 0} features · {s.benefits?.length || 0} benefits</p>
              </div>
            </div>
            <div className="flex gap-3 shrink-0">
              <button onClick={() => startEdit(s)} className="text-sm text-blue-600 hover:underline font-medium">Edit</button>
              <button onClick={() => handleDelete(s._id)} className="text-sm text-red-500 hover:underline font-medium">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}