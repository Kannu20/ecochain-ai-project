import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Leaf, ArrowRight, Zap, Globe, Shield, BarChart3,
  Bot, TrendingDown, Star, ChevronRight, ExternalLink,
  CheckCircle, GitBranch, Package
} from 'lucide-react';

function AnimatedCounter({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const start = Date.now();
        const tick = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(ease * end));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, duration]);

  return <div ref={ref}>{count.toLocaleString()}{suffix}</div>;
}

const features = [
  { icon: GitBranch, title: 'Supplier Intelligence', desc: 'AI-powered supplier discovery, scoring, and real-time ESG compliance monitoring across 50,000+ verified suppliers worldwide.', color: '#10b981', tag: 'Smart Sourcing' },
  { icon: TrendingDown, title: 'Carbon Tracking', desc: 'Scope 1, 2, and 3 emission calculations with automated reporting aligned to GHG Protocol and TCFD frameworks.', color: '#3b82f6', tag: 'Climate Action' },
  { icon: Shield, title: 'Risk Prediction', desc: 'ML-driven supply chain risk forecasting covering geopolitical, climate, regulatory, and financial vectors.', color: '#f59e0b', tag: 'Risk Mgmt' },
  { icon: Zap, title: 'Smart Recommendations', desc: 'Autonomous optimization agent delivers ranked, ROI-calculated sustainability improvements in real-time.', color: '#8b5cf6', tag: 'AI Powered' },
  { icon: Bot, title: 'AI Agent Swarm', desc: '6 specialized AI agents collaborate autonomously to process, analyze, and synthesize sustainability intelligence.', color: '#ec4899', tag: 'Multi-Agent' },
  { icon: BarChart3, title: 'Business Analytics', desc: 'Integrated P&L impact modeling, sustainability ROI tracking, and executive-ready reporting dashboards.', color: '#06b6d4', tag: 'Analytics' },
];

const stats = [
  { value: 10000, suffix: '+', label: 'Products Analyzed', sub: 'Across 120+ categories' },
  { value: 250000, suffix: 'kg', label: 'CO₂ Reduced', sub: 'Since platform launch' },
  { value: 5000, suffix: '+', label: 'Suppliers Tracked', sub: 'In 67 countries' },
  { value: 50000, suffix: '+', label: 'AI Decisions', sub: 'Powered by 6 agents' },
];

const steps = [
  { n: '01', title: 'Input Product Details', desc: 'Enter your product, category, target market, budget, and supply preferences. Takes under 2 minutes.' },
  { n: '02', title: 'Agents Start Processing', desc: 'Six specialized AI agents simultaneously analyze suppliers, emissions, risks, and market conditions.' },
  { n: '03', title: 'Data Synthesis', desc: 'The Manager Agent aggregates insights from all agents into a unified sustainability intelligence matrix.' },
  { n: '04', title: 'Score & Optimize', desc: 'Receive a comprehensive sustainability score with ranked optimization opportunities and cost impact.' },
  { n: '05', title: 'Interactive Dashboard', desc: 'Explore your full analytics dashboard with live charts, supplier comparisons, and what-if simulations.' },
];

const AgentNode = ({ label, top, delay }: { label: string; top: number; delay: string }) => (
  <div style={{
    position: 'absolute', top, left: '50%', transform: 'translateX(-50%)',
    background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.35)',
    borderRadius: 10, padding: '10px 20px', fontSize: 13, fontWeight: 600,
    color: '#6ee7b7', backdropFilter: 'blur(10px)', whiteSpace: 'nowrap',
    animation: `float 4s ease-in-out ${delay} infinite`,
    boxShadow: '0 4px 20px rgba(16,185,129,0.1)'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', animation: 'pulse-glow 2s ease-in-out infinite' }} />
      {label}
    </div>
  </div>
);

export default function Landing() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActiveStep(s => (s + 1) % steps.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ background: '#0B0F19', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Nav */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 48px', height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(11,15,25,0.85)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 34, height: 34, background: 'linear-gradient(135deg, #10b981, #059669)',
            borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(16,185,129,0.35)'
          }}>
            <Leaf size={18} color="white" />
          </div>
          <span style={{ fontWeight: 800, fontSize: 17, color: '#f0fdf4', letterSpacing: '-0.02em' }}>EcoChain<span style={{ color: '#10b981' }}>AI</span></span>
        </div>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {['Platform', 'Agents', 'Pricing', 'Docs'].map(l => (
            <span key={l} style={{ fontSize: 14, color: 'rgba(148,163,184,0.8)', cursor: 'pointer', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#10b981')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(148,163,184,0.8)')}>
              {l}
            </span>
          ))}
          <button onClick={() => navigate('/analyze')} className="btn-primary" style={{ padding: '8px 18px', fontSize: 13 }}>
            Get Started <ArrowRight size={14} />
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ paddingTop: 120, paddingBottom: 100, position: 'relative', overflow: 'hidden' }}>
        <div className="bg-grid" style={{ position: 'absolute', inset: 0, opacity: 0.6 }} />
        {/* Radial glow */}
        <div style={{
          position: 'absolute', top: -200, left: '50%', transform: 'translateX(-50%)',
          width: 800, height: 800, background: 'radial-gradient(ellipse, rgba(16,185,129,0.12) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', position: 'relative' }}>
          {/* Left */}
          <div>
            <div className="badge-emerald" style={{ marginBottom: 24, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Star size={10} fill="#10b981" /> Now with LangGraph Multi-Agent Orchestration
            </div>
            <h1 style={{
              fontSize: 58, fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.03em',
              color: '#f0fdf4', marginBottom: 24
            }}>
              AI-Powered<br />
              <span className="gradient-text">Sustainable Supply</span><br />
              Chain Intelligence
            </h1>
            <p style={{ fontSize: 18, color: 'rgba(148,163,184,0.85)', lineHeight: 1.7, marginBottom: 40, maxWidth: 480 }}>
              Optimize suppliers, reduce emissions, predict risks, and build smarter commerce systems using autonomous AI agent swarms.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/analyze')} className="btn-primary" style={{ fontSize: 15, padding: '13px 28px' }}>
                <Zap size={16} /> Start Analysis
              </button>
              <button onClick={() => navigate('/dashboard')} className="btn-secondary" style={{ fontSize: 15, padding: '13px 28px' }}>
                View Demo Dashboard <ArrowRight size={15} />
              </button>
            </div>

            <div style={{ display: 'flex', gap: 28, marginTop: 48 }}>
              {[
                { label: 'GOTS Certified Partners', val: '200+' },
                { label: 'Avg. Emission Reduction', val: '68%' },
                { label: 'ROI in 6 months', val: '340%' },
              ].map(({ label, val }) => (
                <div key={label}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#10b981', letterSpacing: '-0.02em' }}>{val}</div>
                  <div style={{ fontSize: 12, color: 'rgba(148,163,184,0.6)', marginTop: 2 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Agent visualization */}
          <div style={{ position: 'relative', height: 520, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              width: 1, height: '85%', background: 'linear-gradient(180deg, transparent, rgba(16,185,129,0.4) 20%, rgba(16,185,129,0.4) 80%, transparent)',
              position: 'absolute', left: '50%', top: '7.5%'
            }} />
            {[
              { label: '🧠 Manager Agent', top: 10, delay: '0s' },
              { label: '🏭 Supplier Agent', top: 100, delay: '0.4s' },
              { label: '🌿 Carbon Agent', top: 190, delay: '0.8s' },
              { label: '⚠️ Risk Agent', top: 280, delay: '1.2s' },
              { label: '💡 Recommendation Agent', top: 370, delay: '1.6s' },
              { label: '📊 Analytics Agent', top: 460, delay: '2.0s' },
            ].map(p => <AgentNode key={p.label} {...p} />)}

            {/* Connecting arrows */}
            {[100, 190, 280, 370, 460].map(top => (
              <div key={top} style={{
                position: 'absolute', top: top - 14, left: '50%', transform: 'translateX(-50%)',
                color: 'rgba(16,185,129,0.5)', fontSize: 14
              }}>↓</div>
            ))}

            {/* Background glow */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.06) 0%, transparent 70%)',
              borderRadius: 20
            }} />
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '80px 48px', maxWidth: 1200, margin: '0 auto' }}>
        <div className="section-divider" />
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="section-eyebrow" style={{ marginBottom: 12 }}>Platform Capabilities</div>
          <h2 style={{ fontSize: 40, fontWeight: 800, color: '#f0fdf4', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Everything you need to <span className="gradient-text-static">go green profitably</span>
          </h2>
          <p style={{ color: 'rgba(148,163,184,0.7)', fontSize: 16, maxWidth: 560, margin: '0 auto' }}>
            A complete sustainability intelligence stack, powered by autonomous AI agents and enterprise-grade data infrastructure.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {features.map(({ icon: Icon, title, desc, color, tag }, i) => (
            <div key={title} className="metric-card" style={{ cursor: 'default' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${color}44`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 10, background: `${color}18`,
                  border: `1px solid ${color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Icon size={20} color={color} />
                </div>
                <span style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
                  color, background: `${color}18`, padding: '3px 8px', borderRadius: 4
                }}>{tag}</span>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#f0fdf4', marginBottom: 10 }}>{title}</h3>
              <p style={{ fontSize: 13, color: 'rgba(148,163,184,0.7)', lineHeight: 1.65 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '80px 48px', maxWidth: 1200, margin: '0 auto' }}>
        <div className="section-divider" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <div className="section-eyebrow" style={{ marginBottom: 12 }}>How It Works</div>
            <h2 style={{ fontSize: 40, fontWeight: 800, color: '#f0fdf4', letterSpacing: '-0.02em', marginBottom: 32 }}>
              From product to <span className="gradient-text-static">sustainability score</span> in minutes
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, paddingBottom: i < steps.length - 1 ? 24 : 0 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 10, display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontFamily: 'Space Mono, monospace', fontSize: 12, fontWeight: 700,
                      transition: 'all 0.4s ease',
                      background: activeStep === i ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.04)',
                      border: activeStep === i ? '1px solid rgba(16,185,129,0.5)' : '1px solid rgba(255,255,255,0.08)',
                      color: activeStep === i ? '#10b981' : 'rgba(148,163,184,0.5)',
                      boxShadow: activeStep === i ? '0 0 20px rgba(16,185,129,0.2)' : 'none',
                    }}>{step.n}</div>
                    {i < steps.length - 1 && <div style={{ width: 1, flex: 1, minHeight: 20, background: activeStep === i ? 'rgba(16,185,129,0.4)' : 'rgba(255,255,255,0.08)', margin: '6px 0', transition: 'background 0.4s' }} />}
                  </div>
                  <div style={{ paddingTop: 8, paddingBottom: i < steps.length - 1 ? 20 : 0, opacity: activeStep === i ? 1 : 0.5, transition: 'opacity 0.4s' }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#f0fdf4', marginBottom: 6 }}>{step.title}</div>
                    <div style={{ fontSize: 13, color: 'rgba(148,163,184,0.7)', lineHeight: 1.6 }}>{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16, padding: 32, backdropFilter: 'blur(20px)'
            }}>
              <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                <div className="status-dot" />
                <span style={{ fontSize: 13, color: '#10b981', fontWeight: 600 }}>Analysis Running</span>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 5 }}>
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="loading-dot" style={{ width: 5, height: 5, borderRadius: '50%', background: '#10b981' }} />
                  ))}
                </div>
              </div>
              {[
                { agent: 'Supplier Agent', status: 'Searching...', pct: 85, color: '#10b981' },
                { agent: 'Carbon Agent', status: 'Calculating...', pct: 72, color: '#3b82f6' },
                { agent: 'Risk Agent', status: 'Analyzing...', pct: 60, color: '#f59e0b' },
                { agent: 'Recommendation Agent', status: 'Optimizing...', pct: 40, color: '#8b5cf6' },
                { agent: 'Analytics Agent', status: 'Generating...', pct: 25, color: '#ec4899' },
              ].map(({ agent, status, pct, color }) => (
                <div key={agent} style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 13, color: '#e2e8f0', fontWeight: 500 }}>{agent}</span>
                    <span style={{ fontSize: 12, color, fontFamily: 'Space Mono, monospace' }}>{status}</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}, ${color}88)` }} />
                  </div>
                </div>
              ))}
              <div style={{
                marginTop: 24, padding: '14px 16px', borderRadius: 10,
                background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)'
              }}>
                <div className="mono" style={{ fontSize: 11, color: '#10b981', lineHeight: 1.8 }}>
                  <div>{'>'} Organic Cotton T-Shirt</div>
                  <div>{'>'} 6 suppliers identified</div>
                  <div>{'>'} Emissions: 2.1 kg CO₂e/unit</div>
                  <div>{'>'} Risk score: LOW (28/100)</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {'>'} Generating dashboard<span className="cursor">_</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '80px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="section-divider" />
          <div style={{
            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 20, padding: '60px 80px', backdropFilter: 'blur(20px)',
            position: 'relative', overflow: 'hidden'
          }}>
            <div className="bg-dots" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
            <div style={{ position: 'relative', textAlign: 'center', marginBottom: 60 }}>
              <div className="section-eyebrow" style={{ marginBottom: 12 }}>Impact Numbers</div>
              <h2 style={{ fontSize: 36, fontWeight: 800, color: '#f0fdf4', letterSpacing: '-0.02em' }}>
                Real results, at scale
              </h2>
            </div>
            <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
              {stats.map(({ value, suffix, label, sub }, i) => (
                <div key={label} style={{
                  textAlign: 'center', padding: '0 24px',
                  borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none'
                }}>
                  <div style={{ fontSize: 48, fontWeight: 800, color: '#10b981', letterSpacing: '-0.03em', lineHeight: 1, fontFamily: 'Space Mono, monospace' }}>
                    <AnimatedCounter end={value} suffix={suffix} />
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#f0fdf4', marginTop: 12, marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 12, color: 'rgba(148,163,184,0.5)' }}>{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 48px 120px', maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <div className="section-eyebrow" style={{ marginBottom: 20 }}>Ready to Decarbonize?</div>
        <h2 style={{ fontSize: 52, fontWeight: 800, color: '#f0fdf4', letterSpacing: '-0.03em', marginBottom: 20 }}>
          Start your <span className="gradient-text">sustainability journey</span> today
        </h2>
        <p style={{ fontSize: 17, color: 'rgba(148,163,184,0.7)', marginBottom: 40, maxWidth: 500, margin: '0 auto 40px' }}>
          Join 800+ companies already optimizing their supply chains with EcoChain AI's autonomous agent platform.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/analyze')} className="btn-primary" style={{ fontSize: 16, padding: '14px 32px' }}>
            <Leaf size={18} /> Analyze My Product
          </button>
          <button onClick={() => navigate('/dashboard')} className="btn-secondary" style={{ fontSize: 16, padding: '14px 32px' }}>
            Explore Dashboard <ExternalLink size={15} />
          </button>
        </div>
        <div style={{ marginTop: 32, display: 'flex', gap: 24, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          {['SOC 2 Type II', 'GDPR Compliant', 'ISO 27001', 'GHG Protocol Aligned'].map(l => (
            <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'rgba(148,163,184,0.5)' }}>
              <CheckCircle size={12} color="#10b981" /> {l}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '40px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 28, height: 28, background: 'linear-gradient(135deg, #10b981, #059669)',
              borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Leaf size={14} color="white" />
            </div>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#f0fdf4' }}>EcoChain<span style={{ color: '#10b981' }}>AI</span></span>
          </div>
          <div style={{ display: 'flex', gap: 32 }}>
            {['Documentation', 'GitHub', 'About', 'Contact', 'Privacy'].map(l => (
              <span key={l} style={{ fontSize: 13, color: 'rgba(148,163,184,0.5)', cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#10b981')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(148,163,184,0.5)')}>
                {l}
              </span>
            ))}
          </div>
          <div style={{ fontSize: 12, color: 'rgba(148,163,184,0.3)' }}>
            © 2025 EcoChain AI. Built with 🌿
          </div>
        </div>
      </footer>
    </div>
  );
}
