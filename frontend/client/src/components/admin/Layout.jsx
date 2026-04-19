import { Outlet, NavLink, useNavigate } from 'react-router-dom';

const nav = [
  { to: '/admin', icon: '🏠', label: 'Dashboard', end: true },
  { to: '/admin/enquiries', icon: '📩', label: 'Enquiries' },
  { to: '/admin/services', icon: '⚙️', label: 'Services' },
  { to: '/admin/content', icon: '📝', label: 'Content' }
];

export default function Layout() {
  const navigate = useNavigate();
  const logout = () => { localStorage.removeItem('dgt_admin_token'); navigate('/admin/login'); };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 flex flex-col fixed h-full">
        <div className="px-6 py-5 border-b border-slate-700/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black">D</div>
            <div>
              <p className="text-white font-bold text-sm">DGT Admin</p>
              <p className="text-slate-400 text-xs">Dynasty Global Tech</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {nav.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <span>{item.icon}</span> {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-slate-700/50">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors w-full"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-64 p-8 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}