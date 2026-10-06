import { useState } from 'react';
import { Bot, Globe, Leaf, Shield, Zap, BarChart3, X, ChevronRight, Activity, Clock } from 'lucide-react';
import { agentLogs } from '../data/mockData';

const agentDefs = [
  {
    id: 'manager', icon: Bot, label: 'Manager Agent', role: 'Orchestrator',
    color: '#10b981', bgColor: 'rgba(16,185,129,0.1)', borderColor: 'rgba(16,185,129,0.3)',
    status: 'active',
    desc: 'Central coordination agent that receives user requests, delegates tasks to specialized agents, monitors their progress, and synthesizes final responses.',
    capabilities: ['Task delegation', 'Response aggregation', 'Error handling', 'Priority management'],
    model: 'Mistral Large', calls: 247, avgLatency: '1.2s', successRate: '99.1%',
  },
  {
    id: 'supplier', icon: Globe, label: 'Supplier Agent', role: 'Intelligence',
    color: '#3b82f6', bgColor: 'rgba(59,130,246,0.1)', borderColor: 'rgba(59,130,246,0.3)',
    status: 'active',
    desc: 'Searches and scores suppliers from a database of 50,000+ verified partners. Evaluates ESG credentials, production capacity, certifications, and historical reliability.',
    capabilities: ['Supplier discovery', 'ESG scoring', 'Certification validation', 'Capacity analysis'],
    model: 'Mistral Medium', calls: 1834, avgLatency: '2.8s', successRate: '97.4%',
  },
  {
    id: 'carbon', icon: Leaf, label: 'Carbon Agent', role: 'Climate',
    color: '#10b981', bgColor: 'rgba(16,185,129,0.1)', borderColor: 'rgba(16,185,129,0.3)',
    status: 'active',
    desc: 'Calculates Scope 1, 2, and 3 greenhouse gas emissions using EPA emission factors, LCA databases, and real shipping data. Provides GHG Protocol-aligned reports.',
    capabilities: ['Scope 1/2/3 calculation', 'LCA integration', 'Carbon offsetting', 'TCFD reporting'],
    model: 'Mistral Medium', calls: 1621, avgLatency: '3.1s', successRate: '98.7%',
  },
  {
    id: 'risk', icon: Shield, label: 'Risk Agent', role: 'Analysis',
    color: '#f59e0b', bgColor: 'rgba(245,158,11,0.1)', borderColor: 'rgba(245,158,11,0.3)',
    status: 'active',
    desc: 'Monitors and predicts supply chain risks across geopolitical stability, climate resilience, regulatory compliance, financial health, and reputational factors.',
    capabilities: ['Geopolitical analysis', 'Climate risk modeling', 'Regulatory tracking', 'Financial health'],
    model: 'Mistral Small', calls: 982, avgLatency: '1.9s', successRate: '96.2%',
  },
  {
    id: 'recommendation', icon: Zap, label: 'Recommendation Agent', role: 'Optimizer',
    color: '#8b5cf6', bgColor: 'rgba(139,92,246,0.1)', borderColor: 'rgba(139,92,246,0.3)',
    status: 'active',
    desc: 'Generates ranked, ROI-calculated sustainability optimization recommendations based on analysis from all other agents. Prioritizes by impact and feasibility.',
    capabilities: ['ROI calculation', 'Trade-off analysis', 'Implementation planning', 'Impact forecasting'],
    model: 'Mistral Large', calls: 743, avgLatency: '4.2s', successRate: '98.1%',
  },
  {
    id: 'analytics', icon: BarChart3, label: 'Analytics Agent', role: 'Reporting',
    color: '#ec4899', bgColor: 'rgba(236,72,153,0.1)', borderColor: 'rgba(236,72,153,0.3)',
    status: 'active',
    desc: 'Compiles data from all agents into interactive dashboards, executive reports, and time-series analytics. Handles data visualization and metric computation.',
    capabilities: ['Dashboard generation', 'Trend analysis', 'Metric aggregation', 'Export formatting'],
    model: 'Mistral Medium', calls: 524, avgLatency: '2.4s', successRate: '99.6%',
  },
];

export default function Agents() {
  const [selected, setSelected] = useState<typeof agentDefs[0] | null>(null);

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div className="section-eyebrow" style={{ marginBottom: 8 }}>Agent Swarm</div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#f0fdf4', letterSpacing: '-0.02em', marginBottom: 8 }}>AI Agent Network</h1>
        <p style={{ fontSize: 13, color: 'rgba(148,163,184,0.6)' }}>6 specialized autonomous agents · LangGraph orchestrated · Real-time status</p>
      </div>

      {/* Network overview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
        {[
          { label: 'Active Agents', val: '6/6', color: '#10b981' },
          { label: 'Requests Today', val: '1,247', color: '#3b82f6' },
          { label: 'Avg Response', val: '2.6s', color: '#f59e0b' },
          { label: 'Success Rate', val: '98.2%', color: '#8b5cf6' },
        ].map(({ label, val, color }) => (
          <div key={label} className="metric-card" style={{ cursor: 'default' }}>
            <div style={{ fontSize: 24, fontWeight: 800, color, fontFamily: 'Space Mono, monospace', letterSpacing: '-0.02em' }}>{val}</div>
            <div style={{ fontSize: 12, color: 'rgba(148,163,184,0.6)', marginTop: 4 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Agent graph visualization */}
      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 28, marginBottom: 24, position: 'relative', overflow: 'hidden' }}>
        <div className="bg-dots" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />
        <div style={{ position: 'relative', textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#10b981', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Agent Communication Topology</div>
        </div>
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
          {/* Manager in center */}
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', marginBottom: 20 }}>
            <div style={{
              width: 80, height: 80, borderRadius: 20, background: 'rgba(16,185,129,0.15)',
              border: '2px solid rgba(16,185,129,0.4)', display: 'flex', alignItems: 'center',
              justifyContent: 'center', flexDirection: 'column', gap: 6,
              boxShadow: '0 0 40px rgba(16,185,129,0.2)'
            }} className="animate-pulse-glow">
              <Bot size={28} color="#10b981" />
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#10b981', marginTop: 8 }}>Manager Agent</div>
            <div style={{ fontSize: 11, color: 'rgba(148,163,184,0.5)' }}>Orchestrator</div>
          </div>

          {/* Sub agents */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, width: '100%', flexWrap: 'wrap' }}>
            {agentDefs.slice(1).map(({ id, icon: Icon, label, role, color, bgColor, borderColor }) => (
              <div key={id} onClick={() => setSelected(agentDefs.find(a => a.id === id) || null)}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', transition: 'transform 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'}>
                <div style={{
                  width: 64, height: 64, borderRadius: 16, background: bgColor, border: `1px solid ${borderColor}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 0 20px ${color}22`
                }}>
                  <Icon size={24} color={color} />
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#e2e8f0', marginTop: 8, textAlign: 'center', maxWidth: 80 }}>{label.replace(' Agent', '')}</div>
                <div style={{ fontSize: 10, color: 'rgba(148,163,184,0.5)', textAlign: 'center' }}>{role}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                  <div className="status-dot" style={{ width: 6, height: 6 }} />
                  <span style={{ fontSize: 10, color: '#10b981' }}>Active</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Agent cards grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {agentDefs.map(agent => (
          <div
            key={agent.id}
            onClick={() => setSelected(agent)}
            style={{
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 14, padding: 20, cursor: 'pointer', transition: 'all 0.2s'
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = agent.borderColor;
              (e.currentTarget as HTMLElement).style.background = agent.bgColor;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
              <div style={{
                width: 42, height: 42, borderRadius: 10, background: agent.bgColor,
                border: `1px solid ${agent.borderColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <agent.icon size={20} color={agent.color} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div className="status-dot" />
                <span style={{ fontSize: 11, color: '#10b981', fontWeight: 600 }}>Online</span>
              </div>
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#f0fdf4', marginBottom: 3 }}>{agent.label}</div>
            <div style={{ fontSize: 11, color: agent.color, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>{agent.role}</div>
            <p style={{ fontSize: 12, color: 'rgba(148,163,184,0.65)', lineHeight: 1.6, marginBottom: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {agent.desc}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 10, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              {[
                { label: 'Calls', val: agent.calls.toLocaleString() },
                { label: 'Latency', val: agent.avgLatency },
                { label: 'Success', val: agent.successRate },
              ].map(({ label, val }) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#e2e8f0', fontFamily: 'Space Mono, monospace' }}>{val}</div>
                  <div style={{ fontSize: 10, color: 'rgba(148,163,184,0.4)', marginTop: 2 }}>{label}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: 12, fontSize: 12, color: agent.color }}>
              View details <ChevronRight size={12} style={{ marginLeft: 4 }} />
            </div>
          </div>
        ))}
      </div>

      {/* Detail panel */}
      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', zIndex: 200, display: 'flex', justifyContent: 'flex-end' }}
          onClick={() => setSelected(null)}>
          <div style={{ width: 520, height: '100vh', background: '#0d1525', borderLeft: `1px solid ${selected.borderColor}`, overflowY: 'auto', padding: 32 }}
            onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14, background: selected.bgColor,
                  border: `1px solid ${selected.borderColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <selected.icon size={24} color={selected.color} />
                </div>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#f0fdf4' }}>{selected.label}</div>
                  <div style={{ fontSize: 12, color: selected.color, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{selected.role}</div>
                </div>
              </div>
              <button onClick={() => setSelected(null)} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#94a3b8' }}>
                <X size={16} />
              </button>
            </div>

            <div style={{ marginBottom: 24, padding: 16, background: selected.bgColor, border: `1px solid ${selected.borderColor}`, borderRadius: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <Activity size={14} color={selected.color} />
                <span style={{ fontSize: 12, color: selected.color, fontWeight: 600 }}>CURRENT STATUS</span>
              </div>
              <div style={{ fontSize: 13, color: '#e2e8f0' }}>Idle — Waiting for next request. Last processed 18 seconds ago.</div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: selected.color, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12 }}>Description</div>
              <p style={{ fontSize: 14, color: 'rgba(148,163,184,0.8)', lineHeight: 1.7 }}>{selected.desc}</p>
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: selected.color, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12 }}>Capabilities</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {selected.capabilities.map(c => (
                  <span key={c} style={{ fontSize: 12, padding: '4px 10px', borderRadius: 6, background: selected.bgColor, border: `1px solid ${selected.borderColor}`, color: selected.color }}>{c}</span>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: selected.color, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12 }}>Performance Metrics</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[
                  { label: 'Model', val: selected.model },
                  { label: 'Total Calls', val: selected.calls.toLocaleString() },
                  { label: 'Avg Latency', val: selected.avgLatency },
                  { label: 'Success Rate', val: selected.successRate },
                ].map(({ label, val }) => (
                  <div key={label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, padding: '12px 14px' }}>
                    <div style={{ fontSize: 11, color: 'rgba(148,163,184,0.5)', marginBottom: 4 }}>{label}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#f0fdf4', fontFamily: 'Space Mono, monospace' }}>{val}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: selected.color, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Clock size={14} /> Recent Action Log
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '16px 18px' }}>
                {(agentLogs as any)[selected.id]?.map((log: any, i: number) => (
                  <div key={i} style={{ display: 'flex', gap: 12, marginBottom: i < 4 ? 10 : 0 }}>
                    <span className="mono" style={{ fontSize: 11, color: selected.color, flexShrink: 0 }}>{log.time}</span>
                    <span style={{ fontSize: 12, color: 'rgba(148,163,184,0.7)', lineHeight: 1.6 }}>{log.msg}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
