import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { 
  LayoutDashboard, FlaskConical, Bot, FileText, Settings, 
  Leaf, ChevronRight, Bell, Search, Menu, X, TrendingUp,
  Zap, Globe
} from 'lucide-react';

const navItems = [
  { path: '/analyze', icon: FlaskConical, label: 'Analyze', badge: null },
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', badge: null },
  { path: '/agents', icon: Bot, label: 'AI Agents', badge: '6' },
  { path: '/documents', icon: FileText, label: 'Documents', badge: null },
  { path: '/settings', icon: Settings, label: 'Settings', badge: null },
];

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0B0F19' }}>
      {/* Sidebar */}
      <aside className={`sidebar-hidden ${mobileOpen ? 'block' : ''}`} style={{
        width: 240, minHeight: '100vh', background: 'rgba(10,15,26,0.95)',
        borderRight: '1px solid rgba(255,255,255,0.06)', display: 'flex',
        flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 50,
        backdropFilter: 'blur(20px)'
      }}>
        {/* Logo */}
        <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            <div style={{
              width: 34, height: 34, background: 'linear-gradient(135deg, #10b981, #059669)',
              borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(16,185,129,0.35)'
            }}>
              <Leaf size={18} color="white" />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: '#f0fdf4', lineHeight: 1 }}>EcoChain</div>
              <div style={{ fontSize: 10, color: '#10b981', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>AI Platform</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
          <div style={{ marginBottom: 4, padding: '0 8px 8px', fontSize: 10, color: 'rgba(148,163,184,0.5)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Navigation
          </div>
          {navItems.map(({ path, icon: Icon, label, badge }) => (
            <div
              key={path}
              className={`nav-item ${location.pathname === path ? 'active' : ''}`}
              onClick={() => { navigate(path); setMobileOpen(false); }}
            >
              <Icon size={16} />
              <span style={{ flex: 1 }}>{label}</span>
              {badge && (
                <span style={{
                  background: 'rgba(16,185,129,0.2)', color: '#10b981', fontSize: 10,
                  fontWeight: 700, padding: '1px 6px', borderRadius: 4
                }}>{badge}</span>
              )}
              {location.pathname === path && <ChevronRight size={12} style={{ marginLeft: 'auto', color: '#10b981' }} />}
            </div>
          ))}

          <div style={{ marginTop: 20, marginBottom: 4, padding: '0 8px 8px', fontSize: 10, color: 'rgba(148,163,184,0.5)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Quick Stats
          </div>
          {[
            { icon: TrendingUp, label: 'Sustainability', value: '78%', color: '#10b981' },
            { icon: Globe, label: 'Carbon Saved', value: '2.1t', color: '#3b82f6' },
            { icon: Zap, label: 'AI Actions', value: '247', color: '#f59e0b' },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px',
              borderRadius: 8, marginBottom: 2
            }}>
              <Icon size={14} color={color} />
              <span style={{ fontSize: 13, color: 'rgba(148,163,184,0.7)', flex: 1 }}>{label}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color }}>{value}</span>
            </div>
          ))}
        </nav>

        {/* Bottom */}
        <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0' }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #10b981, #3b82f6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'white'
            }}>JD</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0' }}>John Doe</div>
              <div style={{ fontSize: 11, color: '#10b981' }}>Pro Plan</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div style={{ flex: 1, marginLeft: 240, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Top bar */}
        <header style={{
          height: 60, borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex',
          alignItems: 'center', padding: '0 24px', gap: 16, position: 'sticky', top: 0, zIndex: 40,
          background: 'rgba(11,15,25,0.9)', backdropFilter: 'blur(20px)'
        }}>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ display: 'none', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 4 }}
            className="mobile-menu-btn"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Search */}
          <div style={{
            flex: 1, maxWidth: 400, display: 'flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 8, padding: '0 12px', height: 36
          }}>
            <Search size={14} color="rgba(148,163,184,0.5)" />
            <input
              placeholder="Search suppliers, products, analyses..."
              style={{
                background: 'none', border: 'none', outline: 'none', fontSize: 13,
                color: '#e2e8f0', fontFamily: 'DM Sans, sans-serif', flex: 1
              }}
            />
            <span style={{ fontSize: 10, color: 'rgba(148,163,184,0.4)', fontFamily: 'Space Mono, monospace' }}>⌘K</span>
          </div>

          <div style={{ flex: 1 }} />

          {/* Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, 
            background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)',
            borderRadius: 6, padding: '4px 10px' }}>
            <div className="status-dot" style={{ width: 6, height: 6 }} />
            <span style={{ fontSize: 12, color: '#10b981', fontWeight: 500 }}>All Agents Active</span>
          </div>

          <button style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 8, width: 36, height: 36, display: 'flex', alignItems: 'center',
            justifyContent: 'center', cursor: 'pointer', position: 'relative', color: '#94a3b8'
          }}>
            <Bell size={16} />
            <span style={{
              position: 'absolute', top: 6, right: 6, width: 8, height: 8,
              background: '#10b981', borderRadius: '50%', border: '2px solid #0B0F19'
            }} />
          </button>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 49 }}
        />
      )}
    </div>
  );
}
