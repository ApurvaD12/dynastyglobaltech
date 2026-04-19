import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

export default function Dashboard() {
  const [stats, setStats] = useState({ enquiries: 0, newEnquiries: 0, services: 0 });

  useEffect(() => {
    Promise.all([api.get('/contact'), api.get('/services')]).then(([e, s]) => {
      setStats({
        enquiries: e.data.length,
        newEnquiries: e.data.filter(x => x.status === 'new').length,
        services: s.data.length
      });
    }).catch(() => {});
  }, []);

  const cards = [
    { label: 'Total Enquiries', value: stats.enquiries, icon: '📩', to: '/enquiries', color: 'bg-blue-50 border-blue-200 text-blue-700' },
    { label: 'New Enquiries', value: stats.newEnquiries, icon: '🔔', to: '/enquiries', color: 'bg-orange-50 border-orange-200 text-orange-700' },
    { label: 'Services', value: stats.services, icon: '⚙️', to: '/services', color: 'bg-green-50 border-green-200 text-green-700' },
    { label: 'Manage Content', value: 'Edit', icon: '📝', to: '/content', color: 'bg-purple-50 border-purple-200 text-purple-700' }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Welcome back, Admin. Here's what's happening.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {cards.map(c => (
          <Link key={c.label} to={c.to} className={`rounded-2xl border p-6 ${c.color} hover:shadow-md transition-shadow`}>
            <div className="text-3xl mb-3">{c.icon}</div>
            <p className="text-3xl font-black">{c.value}</p>
            <p className="text-sm font-medium mt-1 opacity-80">{c.label}</p>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="font-bold text-slate-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { to: '/enquiries', label: 'View All Enquiries', icon: '📩' },
            { to: '/services', label: 'Edit Services', icon: '⚙️' },
            { to: '/content', label: 'Update Content', icon: '📝' }
          ].map(a => (
            <Link key={a.to} to={a.to} className="flex items-center gap-3 p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors text-sm font-medium text-slate-700">
              <span className="text-xl">{a.icon}</span> {a.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
