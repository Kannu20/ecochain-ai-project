import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FlaskConical, ArrowRight, Loader2, CheckCircle2, Bot, Zap, Globe, Shield, BarChart3, Package } from 'lucide-react';

const agents = [
  { id: 'supplier', icon: Globe, label: 'Supplier Agent', desc: 'Searching 50,000+ supplier database...', color: '#10b981', delay: 0 },
  { id: 'carbon', icon: Zap, label: 'Carbon Agent', desc: 'Calculating Scope 1, 2 & 3 emissions...', color: '#3b82f6', delay: 800 },
  { id: 'risk', icon: Shield, label: 'Risk Agent', desc: 'Analyzing geopolitical & climate risks...', color: '#f59e0b', delay: 1600 },
  { id: 'recommendation', icon: Bot, label: 'Recommendation Agent', desc: 'Generating optimization strategies...', color: '#8b5cf6', delay: 2400 },
  { id: 'analytics', icon: BarChart3, label: 'Analytics Agent', desc: 'Building your dashboard...', color: '#ec4899', delay: 3200 },
];

export default function Analyze() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    product: '', category: '', market: '', budget: '', price: '',
    shipping: '', packaging: '', notes: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [agentStatus, setAgentStatus] = useState<Record<string, 'waiting' | 'running' | 'done'>>({});
  const [currentAgentIdx, setCurrentAgentIdx] = useState(-1);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.product.trim()) e.product = 'Product name is required';
    if (!form.category) e.category = 'Please select a category';
    if (!form.market.trim()) e.market = 'Target market is required';
    if (!form.budget || isNaN(Number(form.budget))) e.budget = 'Valid budget is required';
    if (!form.shipping) e.shipping = 'Please select shipping method';
    if (!form.packaging) e.packaging = 'Please select packaging type';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    setAgentStatus({});
    setCurrentAgentIdx(0);

    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];
      setCurrentAgentIdx(i);
      setAgentStatus(prev => ({ ...prev, [agent.id]: 'running' }));
      await new Promise(r => setTimeout(r, 1200 + Math.random() * 600));
      setAgentStatus(prev => ({ ...prev, [agent.id]: 'done' }));
    }

    setTimeout(() => navigate('/dashboard'), 800);
  };

  if (loading) {
    return (
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '40px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 16, background: 'rgba(16,185,129,0.15)',
            border: '1px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', margin: '0 auto 20px'
          }}>
            <Bot size={28} color="#10b981" />
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#f0fdf4', letterSpacing: '-0.02em', marginBottom: 10 }}>
            Agent Swarm Activated
          </h2>
          <p style={{ color: 'rgba(148,163,184,0.7)', fontSize: 15 }}>
            Analyzing <strong style={{ color: '#f0fdf4' }}>{form.product}</strong> — {form.category} category
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {agents.map(({ id, icon: Icon, label, desc, color }, i) => {
            const status = agentStatus[id] || 'waiting';
            return (
              <div key={id} style={{
                background: status === 'running' ? `${color}0d` : status === 'done' ? 'rgba(16,185,129,0.05)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${status === 'running' ? `${color}40` : status === 'done' ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.06)'}`,
                borderRadius: 12, padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 16,
                transition: 'all 0.4s ease'
              }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 10, flexShrink: 0,
                  background: status !== 'waiting' ? `${color}18` : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${status !== 'waiting' ? `${color}33` : 'rgba(255,255,255,0.08)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.4s'
                }}>
                  <Icon size={18} color={status !== 'waiting' ? color : 'rgba(148,163,184,0.4)'} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: status !== 'waiting' ? '#f0fdf4' : 'rgba(148,163,184,0.5)', marginBottom: 3, transition: 'all 0.4s' }}>
                    {label}
                  </div>
                  <div style={{ fontSize: 13, color: status === 'running' ? color : status === 'done' ? '#10b981' : 'rgba(148,163,184,0.35)', transition: 'all 0.4s' }}>
                    {status === 'done' ? '✓ Complete' : status === 'running' ? desc : 'Waiting...'}
                  </div>
                </div>
                <div style={{ flexShrink: 0 }}>
                  {status === 'done' && <CheckCircle2 size={20} color="#10b981" />}
                  {status === 'running' && <Loader2 size={20} color={color} style={{ animation: 'spin 1s linear infinite' }} />}
                  {status === 'waiting' && <div style={{ width: 20, height: 20, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.1)' }} />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Terminal */}
        <div style={{ marginTop: 28, background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '18px 20px' }}>
          <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
            {['#ef4444', '#f59e0b', '#10b981'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
          </div>
          <div className="mono" style={{ fontSize: 12, color: '#10b981', lineHeight: 1.9 }}>
            {Object.entries(agentStatus).map(([id, status]) => (
              <div key={id} style={{ opacity: status !== 'waiting' ? 1 : 0.3 }}>
                <span style={{ color: '#6ee7b7' }}>{'>'}</span> {agents.find(a => a.id === id)?.label}: {status === 'done' ? '✓ Completed' : status === 'running' ? 'Processing...' : 'Queued'}
              </div>
            ))}
            {currentAgentIdx >= 0 && <div><span className="cursor">_</span></div>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '8px 0' }}>
      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10, background: 'rgba(16,185,129,0.12)',
            border: '1px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <FlaskConical size={18} color="#10b981" />
          </div>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: '#f0fdf4', letterSpacing: '-0.02em' }}>Sustainability Analysis</h1>
            <p style={{ fontSize: 13, color: 'rgba(148,163,184,0.6)', marginTop: 2 }}>AI agents will analyze your product across 40+ sustainability metrics</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24 }}>
        {/* Product Info */}
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 28 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: '#10b981', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20 }}>Product Information</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <label className="eco-label">Product Name *</label>
              <input className="eco-input" value={form.product} onChange={e => setForm({ ...form, product: e.target.value })}
                placeholder="e.g. Organic Cotton T-Shirt" />
              {errors.product && <div style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors.product}</div>}
            </div>
            <div>
              <label className="eco-label">Category *</label>
              <select className="eco-input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                <option value="">Select category</option>
                {['Clothing', 'Electronics', 'Furniture', 'Food', 'Personal Care', 'Sports', 'Other'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {errors.category && <div style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors.category}</div>}
            </div>
            <div>
              <label className="eco-label">Target Market *</label>
              <input className="eco-input" value={form.market} onChange={e => setForm({ ...form, market: e.target.value })}
                placeholder="e.g. EU, North America" />
              {errors.market && <div style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors.market}</div>}
            </div>
          </div>
        </div>

        {/* Financial */}
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 28 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: '#3b82f6', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20 }}>Financial Parameters</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
            <div>
              <label className="eco-label">Production Budget (USD) *</label>
              <input className="eco-input" type="number" value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })}
                placeholder="e.g. 50000" />
              {errors.budget && <div style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors.budget}</div>}
            </div>
            <div>
              <label className="eco-label">Expected Selling Price (USD)</label>
              <input className="eco-input" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })}
                placeholder="e.g. 89" />
            </div>
          </div>
        </div>

        {/* Logistics */}
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 28 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: '#f59e0b', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20 }}>Logistics & Packaging</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
            <div>
              <label className="eco-label">Preferred Shipping *</label>
              <select className="eco-input" value={form.shipping} onChange={e => setForm({ ...form, shipping: e.target.value })}>
                <option value="">Select shipping</option>
                {['Air', 'Rail', 'Sea', 'Road', 'Multi-modal'].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.shipping && <div style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors.shipping}</div>}
            </div>
            <div>
              <label className="eco-label">Packaging Type *</label>
              <select className="eco-input" value={form.packaging} onChange={e => setForm({ ...form, packaging: e.target.value })}>
                <option value="">Select packaging</option>
                {['Recycled Paper', 'Biodegradable', 'Plastic-free', 'Minimal', 'Plastic', 'Mixed'].map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              {errors.packaging && <div style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors.packaging}</div>}
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label className="eco-label">Additional Notes & Requirements</label>
              <textarea className="eco-input" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })}
                placeholder="Any specific sustainability certifications required, supplier preferences, regional compliance requirements..."
                style={{ minHeight: 80, resize: 'vertical' }} />
            </div>
          </div>
        </div>

        {/* Agent preview */}
        <div style={{ background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: 14, padding: 24 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: '#10b981', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>
            🤖 Agents That Will Activate
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {[
              { label: '🧠 Manager Agent', desc: 'Orchestrates all agents' },
              { label: '🏭 Supplier Agent', desc: 'Finds best suppliers' },
              { label: '🌿 Carbon Agent', desc: 'Measures emissions' },
              { label: '⚠️ Risk Agent', desc: 'Assesses supply risks' },
              { label: '💡 Recommend Agent', desc: 'Optimization ideas' },
              { label: '📊 Analytics Agent', desc: 'Dashboard generation' },
            ].map(({ label, desc }) => (
              <div key={label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: '10px 12px' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0', marginBottom: 3 }}>{label}</div>
                <div style={{ fontSize: 11, color: 'rgba(148,163,184,0.6)' }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <button onClick={handleSubmit} className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: 16, padding: '15px' }}>
          <FlaskConical size={18} />
          Analyze Sustainability Now
          <ArrowRight size={16} />
        </button>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
