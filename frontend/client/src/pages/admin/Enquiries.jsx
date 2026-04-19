import { useEffect, useState } from 'react';
import api from '../../utils/api';

const statusColors = { new: 'bg-blue-100 text-blue-700', read: 'bg-gray-100 text-gray-600', replied: 'bg-green-100 text-green-700' };

export default function Enquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetch = () => {
    setLoading(true);
    api.get('/contact').then(r => setEnquiries(r.data)).finally(() => setLoading(false));
  };

  useEffect(() => { fetch(); }, []);

  const updateStatus = async (id, status) => {
    await api.patch(`/contact/${id}/status`, { status });
    fetch();
  };

  const deleteEnquiry = async id => {
    if (!confirm('Delete this enquiry?')) return;
    await api.delete(`/contact/${id}`);
    fetch();
  };

  const filtered = filter === 'all' ? enquiries : enquiries.filter(e => e.status === filter);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Enquiries</h1>
          <p className="text-slate-500 text-sm mt-1">{enquiries.length} total, {enquiries.filter(e => e.status === 'new').length} new</p>
        </div>
        <div className="flex gap-2">
          {['all', 'new', 'read', 'replied'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${filter === f ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
          <p className="text-4xl mb-3">📭</p>
          <p className="text-slate-500">No enquiries found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(e => (
            <div key={e._id} className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-semibold text-slate-800">{e.name}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[e.status]}`}>{e.status}</span>
                  </div>
                  <p className="text-sm text-blue-600">{e.email}</p>
                  {e.phone && <p className="text-sm text-slate-500">{e.phone}</p>}
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">{e.message}</p>
                  <p className="text-xs text-slate-400 mt-2">{new Date(e.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <select
                    value={e.status}
                    onChange={ev => updateStatus(e._id, ev.target.value)}
                    className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                  </select>
                  <button onClick={() => deleteEnquiry(e._id)} className="text-xs text-red-500 hover:text-red-700 font-medium">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}