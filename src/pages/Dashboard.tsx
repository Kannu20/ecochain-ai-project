import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Cell
} from 'recharts';
import { TrendingDown, DollarSign, Leaf, AlertTriangle, Star, ArrowUpRight, ArrowDownRight, Sliders, RefreshCw, Download } from 'lucide-react';
import { suppliers, carbonData, profitData, riskData, supplierComparison, recommendations } from '../data/mockData';

const riskColors = ['#10b981', '#10b981', '#10b981', '#10b981', '#10b981', '#10b981'];

function MetricCard({ icon: Icon, label, value, sub, trend, color }: any) {
  return (
    <div className="metric-card" style={{ cursor: 'default' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 9, background: `${color}15`,
          border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Icon size={17} color={color} />
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 600,
          color: trend > 0 ? '#10b981' : '#ef4444'
        }}>
          {trend > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {Math.abs(trend)}%
        </div>
      </div>
      <div style={{ fontSize: 28, fontWeight: 800, color: '#f0fdf4', letterSpacing: '-0.02em', lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 13, color: 'rgba(148,163,184,0.6)', marginTop: 4 }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: 'rgba(148,163,184,0.4)', marginTop: 3 }}>{sub}</div>}
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'rgba(13,20,35,0.97)', border: '1px solid rgba(16,185,129,0.25)',
      borderRadius: 10, padding: '12px 16px', fontSize: 13
    }}>
      <div style={{ color: 'rgba(148,163,184,0.7)', marginBottom: 8, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <div style={{ width: 8, height: 8, borderRadius: 2, background: p.color }} />
          <span style={{ color: 'rgba(148,163,184,0.8)', textTransform: 'capitalize' }}>{p.dataKey}:</span>
          <span style={{ color: '#f0fdf4', fontWeight: 600 }}>{p.value}</span>
        </div>
      ))}
    </div>
  );
};

function RiskBar({ category, score, benchmark }: any) {
  const color = score < 30 ? '#10b981' : score < 60 ? '#f59e0b' : '#ef4444';
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontSize: 13, color: '#e2e8f0', fontWeight: 500 }}>{category}</span>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: 'rgba(148,163,184,0.5)' }}>Industry: {benchmark}</span>
          <span style={{ fontSize: 14, fontWeight: 700, color, fontFamily: 'Space Mono, monospace' }}>{score}</span>
        </div>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${score}%`, background: `linear-gradient(90deg, ${color}, ${color}88)` }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
        <div className="progress-bar" style={{ width: '100%', height: 3 }}>
          <div style={{ width: `${benchmark}%`, height: '100%', background: 'rgba(255,255,255,0.12)', borderRadius: 999 }} />
        </div>
      </div>
    </div>
  );
}

function ScoreGauge({ score }: { score: number }) {
  const angle = -90 + (score / 100) * 180;
  const r = 80;
  const cx = 100, cy = 100;
  const startAngle = -Math.PI;
  const endAngle = 0;
  const arcStart = { x: cx + r * Math.cos(startAngle), y: cy + r * Math.sin(startAngle) };
  const arcEnd = { x: cx + r * Math.cos(endAngle), y: cy + r * Math.sin(endAngle) };
  const needleEnd = {
    x: cx + (r - 10) * Math.cos((angle - 90) * Math.PI / 180),
    y: cy + (r - 10) * Math.sin((angle - 90) * Math.PI / 180)
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg width="200" height="120" viewBox="0 0 200 120">
        <defs>
          <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
        <path d={`M ${arcStart.x} ${arcStart.y} A ${r} ${r} 0 0 1 ${arcEnd.x} ${arcEnd.y}`}
          fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="14" strokeLinecap="round" />
        <path d={`M ${arcStart.x} ${arcStart.y} A ${r} ${r} 0 0 1 ${arcEnd.x} ${arcEnd.y}`}
          fill="none" stroke="url(#arcGrad)" strokeWidth="14" strokeLinecap="round"
          strokeDasharray={`${(score / 100) * 251} 251`} />
        <line x1={cx} y1={cy} x2={needleEnd.x} y2={needleEnd.y}
          stroke="#f0fdf4" strokeWidth="2" strokeLinecap="round" />
        <circle cx={cx} cy={cy} r="5" fill="#10b981" />
        <text x={cx} y={cy + 25} textAnchor="middle" fill="#f0fdf4" fontSize="26" fontWeight="800" fontFamily="Space Mono">{score}</text>
        <text x={cx} y={cy + 42} textAnchor="middle" fill="rgba(148,163,184,0.6)" fontSize="10">/100</text>
      </svg>
      <div style={{ fontSize: 13, color: '#10b981', fontWeight: 700, marginTop: -10 }}>Excellent Score</div>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [simPackaging, setSimPackaging] = useState('recycled');
  const [simShipping, setSimShipping] = useState('sea');
  const [showSim, setShowSim] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { setTimeout(() => setLoaded(true), 300); }, []);

  const riskScore = simShipping === 'air' ? 42 : 28;
  const emissionScore = simShipping === 'air' ? 8.4 : simShipping === 'sea' ? 0.6 : 2.1;

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', opacity: loaded ? 1 : 0, transition: 'opacity 0.5s' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <div className="section-eyebrow" style={{ marginBottom: 6 }}>Sustainability Dashboard</div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#f0fdf4', letterSpacing: '-0.02em' }}>Organic Cotton T-Shirt</h1>
          <p style={{ fontSize: 13, color: 'rgba(148,163,184,0.6)', marginTop: 4 }}>Last analyzed: 2 minutes ago · EU Market · Sea Freight · Recycled Packaging</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => navigate('/analyze')} className="btn-secondary" style={{ padding: '9px 16px', fontSize: 13 }}>
            <RefreshCw size={14} /> Re-analyze
          </button>
          <button className="btn-primary" style={{ padding: '9px 16px', fontSize: 13 }}>
            <Download size={14} /> Export PDF
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14, marginBottom: 24 }}>
        <MetricCard icon={DollarSign} label="Estimated Unit Cost" value="$12.40" sub="Per unit at scale" trend={-8} color="#10b981" />
        <MetricCard icon={TrendingDown} label="Expected Profit Margin" value="43.2%" sub="After all costs" trend={12} color="#3b82f6" />
        <MetricCard icon={Leaf} label="CO₂ Emissions" value="2.1 kg" sub="Per unit (CO₂e)" trend={-32} color="#10b981" />
        <MetricCard icon={AlertTriangle} label="Risk Score" value="28/100" sub="LOW — Safe zone" trend={-15} color="#f59e0b" />
        <MetricCard icon={Star} label="Supplier Rating" value="4.7/5" sub="NordicSustain AB" trend={5} color="#8b5cf6" />
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 20, background: 'rgba(255,255,255,0.03)', padding: 4, borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)', width: 'fit-content' }}>
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'suppliers', label: 'Suppliers' },
          { id: 'recommendations', label: 'Recommendations' },
          { id: 'simulation', label: 'What-If Sim' },
        ].map(({ id, label }) => (
          <button key={id} onClick={() => setActiveTab(id)} style={{
            padding: '8px 18px', borderRadius: 7, fontSize: 13, fontWeight: 600,
            cursor: 'pointer', border: 'none', fontFamily: 'DM Sans, sans-serif',
            background: activeTab === id ? 'rgba(16,185,129,0.2)' : 'transparent',
            color: activeTab === id ? '#10b981' : 'rgba(148,163,184,0.6)',
            transition: 'all 0.2s'
          }}>{label}</button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 18 }}>
          {/* Carbon Chart */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#f0fdf4' }}>Carbon Footprint Trend</div>
                <div style={{ fontSize: 12, color: 'rgba(148,163,184,0.5)', marginTop: 2 }}>kg CO₂e per unit · vs industry avg</div>
              </div>
              <div className="badge-emerald">-32% YTD</div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={carbonData}>
                <defs>
                  <linearGradient id="carbonGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="industryGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: 'rgba(148,163,184,0.5)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(148,163,184,0.5)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={2.5} fill="url(#carbonGrad)" name="Your emissions" dot={false} />
                <Area type="monotone" dataKey="industry" stroke="#ef4444" strokeWidth={1.5} fill="url(#industryGrad)" name="Industry avg" dot={false} strokeDasharray="4 4" />
                <Line type="monotone" dataKey="target" stroke="#3b82f6" strokeWidth={1.5} dot={false} strokeDasharray="4 4" name="Target" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Score Gauge */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 24 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#f0fdf4', marginBottom: 4 }}>Sustainability Score</div>
            <div style={{ fontSize: 12, color: 'rgba(148,163,184,0.5)', marginBottom: 16 }}>Composite index · 8 dimensions</div>
            <ScoreGauge score={78} />
            <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Emissions', v: 84 },
                { label: 'Supplier Ethics', v: 91 },
                { label: 'Circular Economy', v: 72 },
                { label: 'Social Impact', v: 68 },
              ].map(({ label, v }) => (
                <div key={label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontSize: 12, color: 'rgba(148,163,184,0.7)' }}>{label}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#10b981', fontFamily: 'Space Mono, monospace' }}>{v}</span>
                  </div>
                  <div className="progress-bar"><div className="progress-fill" style={{ width: `${v}%` }} /></div>
                </div>
              ))}
            </div>
          </div>

          {/* Profit Chart */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#f0fdf4' }}>Revenue & Profit Analysis</div>
                <div style={{ fontSize: 12, color: 'rgba(148,163,184,0.5)', marginTop: 2 }}>Monthly USD · Sustainable product line</div>
              </div>
              <div className="badge-blue">+163% MoM</div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={profitData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: 'rgba(148,163,184,0.5)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(148,163,184,0.5)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="revenue" fill="rgba(59,130,246,0.6)" radius={[3, 3, 0, 0]} name="revenue" />
                <Bar dataKey="profit" fill="#10b981" radius={[3, 3, 0, 0]} name="profit" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Risk Chart */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 24 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#f0fdf4', marginBottom: 4 }}>Risk Breakdown</div>
            <div style={{ fontSize: 12, color: 'rgba(148,163,184,0.5)', marginBottom: 20 }}>Score vs industry benchmark</div>
            {riskData.map(r => <RiskBar key={r.category} {...r} />)}
          </div>
        </div>
      )}

      {activeTab === 'suppliers' && (
        <div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#f0fdf4', marginBottom: 4 }}>Supplier Intelligence Report</div>
            <div style={{ fontSize: 13, color: 'rgba(148,163,184,0.6)' }}>6 qualified suppliers identified · Sorted by sustainability score</div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, overflow: 'hidden', marginBottom: 20 }}>
            <table className="eco-table">
              <thead>
                <tr>
                  <th>Supplier</th>
                  <th>Country</th>
                  <th>Rating</th>
                  <th>Unit Cost</th>
                  <th>Delivery (days)</th>
                  <th>CO₂e/unit</th>
                  <th>Risk</th>
                  <th>Certifications</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((s, i) => (
                  <tr key={s.id}>
                    <td>
                      <div style={{ fontWeight: 600, color: '#f0fdf4' }}>{s.name}</div>
                      <div style={{ fontSize: 11, color: 'rgba(148,163,184,0.4)', marginTop: 1 }}>#{String(i + 1).padStart(3, '0')}</div>
                    </td>
                    <td><span style={{ fontSize: 13 }}>🌍</span> {s.country}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Star size={12} fill="#f59e0b" color="#f59e0b" />
                        <span style={{ fontWeight: 700, color: '#f59e0b', fontFamily: 'Space Mono, monospace' }}>{s.rating}</span>
                      </div>
                    </td>
                    <td><span style={{ fontWeight: 700, color: '#10b981', fontFamily: 'Space Mono, monospace' }}>${s.cost.toFixed(2)}</span></td>
                    <td><span style={{ color: '#e2e8f0' }}>{s.delivery}d</span></td>
                    <td><span style={{ color: s.emissions < 2 ? '#10b981' : s.emissions < 3 ? '#f59e0b' : '#ef4444', fontFamily: 'Space Mono, monospace', fontWeight: 600 }}>{s.emissions} kg</span></td>
                    <td>
                      <span style={{
                        padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600,
                        background: s.risk === 'Very Low' ? 'rgba(16,185,129,0.2)' : s.risk === 'Low' ? 'rgba(16,185,129,0.12)' : 'rgba(245,158,11,0.15)',
                        color: s.risk === 'Very Low' || s.risk === 'Low' ? '#10b981' : '#f59e0b'
                      }}>{s.risk}</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                        {s.certifications.slice(0, 2).map(cert => (
                          <span key={cert} style={{
                            fontSize: 10, padding: '1px 6px', borderRadius: 3, fontWeight: 600,
                            background: 'rgba(59,130,246,0.12)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.2)'
                          }}>{cert}</span>
                        ))}
                        {s.certifications.length > 2 && <span style={{ fontSize: 10, color: 'rgba(148,163,184,0.5)' }}>+{s.certifications.length - 2}</span>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Supplier radar */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 24 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#f0fdf4', marginBottom: 20 }}>Multi-Dimension Comparison</div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={supplierComparison} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: 'rgba(148,163,184,0.5)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(148,163,184,0.5)', fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="sustainability" fill="#10b981" radius={[3, 3, 0, 0]} />
                <Bar dataKey="cost" fill="#3b82f6" radius={[3, 3, 0, 0]} />
                <Bar dataKey="delivery" fill="#f59e0b" radius={[3, 3, 0, 0]} />
                <Bar dataKey="quality" fill="#8b5cf6" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 12 }}>
              {[['#10b981','Sustainability'],['#3b82f6','Cost Efficiency'],['#f59e0b','Delivery'],['#8b5cf6','Quality']].map(([c,l]) => (
                <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'rgba(148,163,184,0.7)' }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: c }} />{l}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'recommendations' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ marginBottom: 8 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#f0fdf4', marginBottom: 4 }}>AI-Generated Recommendations</div>
            <div style={{ fontSize: 13, color: 'rgba(148,163,184,0.6)' }}>5 optimization opportunities · Est. total savings: $21,100/mo · +48% sustainability improvement</div>
          </div>
          {recommendations.map(r => (
            <div key={r.id} style={{
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 14, padding: 24, display: 'flex', gap: 20, alignItems: 'flex-start',
              transition: 'all 0.2s',
              cursor: 'pointer'
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(16,185,129,0.25)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'; }}>
              <div style={{ fontSize: 32, flexShrink: 0 }}>{r.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: '#f0fdf4' }}>{r.title}</span>
                  <span style={{
                    fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 4,
                    background: r.priority === 'High' ? 'rgba(239,68,68,0.15)' : 'rgba(245,158,11,0.15)',
                    color: r.priority === 'High' ? '#ef4444' : '#f59e0b', letterSpacing: '0.06em', textTransform: 'uppercase'
                  }}>{r.priority}</span>
                  <span style={{ fontSize: 10, color: 'rgba(148,163,184,0.5)', marginLeft: 4 }}>· {r.category}</span>
                </div>
                <p style={{ fontSize: 13, color: 'rgba(148,163,184,0.7)', lineHeight: 1.6, marginBottom: 14 }}>{r.description}</p>
                <div style={{ display: 'flex', gap: 16 }}>
                  <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 8, padding: '8px 14px' }}>
                    <div style={{ fontSize: 11, color: 'rgba(148,163,184,0.5)', marginBottom: 2 }}>IMPACT</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#10b981' }}>{r.impact}</div>
                  </div>
                  <div style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 8, padding: '8px 14px' }}>
                    <div style={{ fontSize: 11, color: 'rgba(148,163,184,0.5)', marginBottom: 2 }}>SAVINGS</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#60a5fa' }}>{r.savings}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'simulation' && (
        <div>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#f0fdf4', marginBottom: 4 }}>What-If Simulation Engine</div>
            <div style={{ fontSize: 13, color: 'rgba(148,163,184,0.6)' }}>Adjust parameters and see how they impact sustainability metrics in real-time</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 20 }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 24 }}>
              <h3 style={{ fontSize: 13, fontWeight: 700, color: '#10b981', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Sliders size={14} /> Parameters
              </h3>
              <div style={{ marginBottom: 20 }}>
                <label className="eco-label">Packaging Type</label>
                <select className="eco-input" value={simPackaging} onChange={e => setSimPackaging(e.target.value)}>
                  {['recycled', 'biodegradable', 'plastic', 'minimal'].map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label className="eco-label">Shipping Method</label>
                <select className="eco-input" value={simShipping} onChange={e => setSimShipping(e.target.value)}>
                  {['sea', 'rail', 'road', 'air'].map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                </select>
              </div>
              <div style={{ marginTop: 20 }}>
                <div style={{ fontSize: 12, color: 'rgba(148,163,184,0.5)', marginBottom: 12 }}>Impact Preview</div>
                {[
                  { label: 'CO₂e/unit', val: `${emissionScore} kg`, prev: '8.4 kg', good: emissionScore < 5 },
                  { label: 'Risk Score', val: `${riskScore}/100`, prev: '42/100', good: riskScore < 40 },
                  { label: 'Cost/unit', val: simShipping === 'air' ? '$18.20' : '$12.40', prev: '$18.20', good: simShipping !== 'air' },
                ].map(({ label, val, prev, good }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <span style={{ fontSize: 13, color: 'rgba(148,163,184,0.7)' }}>{label}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 11, color: 'rgba(148,163,184,0.4)', textDecoration: 'line-through' }}>{prev}</span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: good ? '#10b981' : '#ef4444', fontFamily: 'Space Mono, monospace' }}>{val}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 24 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#f0fdf4', marginBottom: 16 }}>Emission Scenarios</div>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={[
                    { method: 'Air', value: 8.4 },
                    { method: 'Road', value: 4.2 },
                    { method: 'Rail', value: 1.8 },
                    { method: 'Sea', value: 0.6 },
                    { method: simShipping.charAt(0).toUpperCase() + simShipping.slice(1) + ' (Sim)', value: emissionScore },
                  ]} barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                    <XAxis dataKey="method" tick={{ fill: 'rgba(148,163,184,0.5)', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: 'rgba(148,163,184,0.5)', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" name="CO₂e/unit" radius={[4, 4, 0, 0]}>
                      {[8.4, 4.2, 1.8, 0.6, emissionScore].map((v, i) => (
                        <Cell key={i} fill={i === 4 ? '#10b981' : `rgba(${Math.floor(v * 20)}, ${Math.floor(200 - v * 15)}, ${Math.floor(100 - v * 10)}, 0.8)`} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 14, padding: 24 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#10b981', marginBottom: 12 }}>
                  🎯 Optimal Configuration Found
                </div>
                <p style={{ fontSize: 13, color: 'rgba(148,163,184,0.7)', lineHeight: 1.65 }}>
                  Switching to <strong style={{ color: '#f0fdf4' }}>Sea Freight + Recycled Packaging</strong> reduces your carbon footprint by <strong style={{ color: '#10b981' }}>93%</strong> vs air freight while saving <strong style={{ color: '#3b82f6' }}>$5,800/month</strong> in shipping costs. Estimated delivery time impact: +10 days.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
