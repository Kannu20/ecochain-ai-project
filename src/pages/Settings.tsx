import { useState } from 'react';
import { Settings as SettingsIcon, User, Key, Bell, Moon, Cpu, Shield, ChevronRight, CheckCircle2, Loader2, Eye, EyeOff } from 'lucide-react';

const modelOptions = [
  { id: 'mistral-large', name: 'Mistral Large', desc: 'Most capable — best for complex analysis', speed: 'Medium', cost: 'High', badge: 'Default' },
  { id: 'mistral-medium', name: 'Mistral Medium', desc: 'Balanced performance and speed', speed: 'Fast', cost: 'Medium', badge: null },
  { id: 'mistral-small', name: 'Mistral Small', desc: 'Fast and efficient for simpler tasks', speed: 'Very Fast', cost: 'Low', badge: null },
  { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', desc: 'Anthropic — excellent reasoning', speed: 'Medium', cost: 'High', badge: 'New' },
  { id: 'llama-3-70b', name: 'Llama 3 70B', desc: 'Open source — privacy-first option', speed: 'Fast', cost: 'Low', badge: null },
  { id: 'gpt-4o', name: 'GPT-4o', desc: 'OpenAI — broad knowledge base', speed: 'Medium', cost: 'High', badge: null },
];

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <div onClick={onChange} style={{
      width: 44, height: 24, borderRadius: 12, background: on ? 'rgba(16,185,129,0.8)' : 'rgba(255,255,255,0.1)',
      position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0,
      border: `1px solid ${on ? 'rgba(16,185,129,0.5)' : 'rgba(255,255,255,0.15)'}`
    }}>
      <div style={{
        width: 18, height: 18, borderRadius: '50%', background: 'white',
        position: 'absolute', top: 2, left: on ? 22 : 2, transition: 'left 0.2s',
        boxShadow: '0 1px 4px rgba(0,0,0,0.3)'
      }} />
    </div>
  );
}

function Section({ title, icon: Icon, children }: any) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 24, marginBottom: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={15} color="#10b981" />
        </div>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: '#f0fdf4' }}>{title}</h2>
      </div>
      {children}
    </div>
  );
}

export default function Settings() {
  const [selectedModel, setSelectedModel] = useState('mistral-large');
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState({ email: true, risk: true, weekly: false, agents: true });
  const [apiKey, setApiKey] = useState('mr-xxxxxxxxxxxxxxxxxxxxxxxxxx');
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({ name: 'John Doe', email: 'john@company.com', company: 'Sustainable Goods Co.', role: 'Sustainability Manager', timezone: 'UTC+5:30' });

  const handleSave = async () => {
    setSaved(true);
    await new Promise(r => setTimeout(r, 2000));
    setSaved(false);
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <div style={{ marginBottom: 32 }}>
        <div className="section-eyebrow" style={{ marginBottom: 8 }}>Configuration</div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#f0fdf4', letterSpacing: '-0.02em', marginBottom: 8 }}>Settings</h1>
        <p style={{ fontSize: 13, color: 'rgba(148,163,184,0.6)' }}>Customize your EcoChain AI platform preferences and API configuration</p>
      </div>

      {/* Profile */}
      <Section title="Profile" icon={User}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[
            { key: 'name', label: 'Full Name' },
            { key: 'email', label: 'Email Address', type: 'email' },
            { key: 'company', label: 'Company Name' },
            { key: 'role', label: 'Job Title' },
          ].map(({ key, label, type }) => (
            <div key={key}>
              <label className="eco-label">{label}</label>
              <input className="eco-input" type={type || 'text'} value={(profile as any)[key]}
                onChange={e => setProfile({ ...profile, [key]: e.target.value })} />
            </div>
          ))}
          <div>
            <label className="eco-label">Timezone</label>
            <select className="eco-input" value={profile.timezone} onChange={e => setProfile({ ...profile, timezone: e.target.value })}>
              {['UTC-8', 'UTC-5', 'UTC+0', 'UTC+1', 'UTC+3', 'UTC+5:30', 'UTC+8'].map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
      </Section>

      {/* AI Model */}
      <Section title="AI Model Selection" icon={Cpu}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {modelOptions.map(model => (
            <div key={model.id}
              onClick={() => setSelectedModel(model.id)}
              style={{
                padding: '14px 18px', borderRadius: 10, cursor: 'pointer',
                border: `1px solid ${selectedModel === model.id ? 'rgba(16,185,129,0.4)' : 'rgba(255,255,255,0.07)'}`,
                background: selectedModel === model.id ? 'rgba(16,185,129,0.08)' : 'rgba(255,255,255,0.02)',
                transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 14
              }}>
              <div style={{
                width: 20, height: 20, borderRadius: '50%', border: `2px solid ${selectedModel === model.id ? '#10b981' : 'rgba(255,255,255,0.2)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s'
              }}>
                {selectedModel === model.id && <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#f0fdf4' }}>{model.name}</span>
                  {model.badge && (
                    <span style={{ fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 4, background: 'rgba(59,130,246,0.2)', color: '#60a5fa', letterSpacing: '0.06em' }}>{model.badge}</span>
                  )}
                </div>
                <div style={{ fontSize: 12, color: 'rgba(148,163,184,0.6)' }}>{model.desc}</div>
              </div>
              <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
                {[['Speed', model.speed], ['Cost', model.cost]].map(([k, v]) => (
                  <div key={k} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 11, color: 'rgba(148,163,184,0.4)' }}>{k}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#e2e8f0' }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* API Settings */}
      <Section title="API Configuration" icon={Key}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label className="eco-label">OpenRouter API Key</label>
            <div style={{ position: 'relative' }}>
              <input className="eco-input" type={showKey ? 'text' : 'password'} value={apiKey}
                onChange={e => setApiKey(e.target.value)} style={{ paddingRight: 44 }} />
              <button onClick={() => setShowKey(!showKey)} style={{
                position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(148,163,184,0.5)'
              }}>
                {showKey ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            <div style={{ fontSize: 11, color: 'rgba(148,163,184,0.4)', marginTop: 6 }}>
              Get your API key at <span style={{ color: '#3b82f6', cursor: 'pointer' }}>openrouter.ai/keys</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div>
              <label className="eco-label">Max Tokens</label>
              <input className="eco-input" defaultValue="4096" type="number" />
            </div>
            <div>
              <label className="eco-label">Temperature</label>
              <input className="eco-input" defaultValue="0.7" type="number" step="0.1" min="0" max="2" />
            </div>
          </div>
          <div style={{ padding: '12px 16px', background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', animation: 'pulse-glow 2s ease-in-out infinite' }} />
            <span style={{ fontSize: 13, color: 'rgba(148,163,184,0.8)' }}>API connection active · Last tested 4 minutes ago</span>
          </div>
        </div>
      </Section>

      {/* Appearance */}
      <Section title="Appearance & Display" icon={Moon}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {[
            { key: 'darkMode', label: 'Dark Mode', desc: 'Use the dark theme interface (recommended)', val: darkMode, set: () => setDarkMode(!darkMode) },
          ].map(({ label, desc, val, set }) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#f0fdf4', marginBottom: 2 }}>{label}</div>
                <div style={{ fontSize: 12, color: 'rgba(148,163,184,0.5)' }}>{desc}</div>
              </div>
              <Toggle on={val} onChange={set} />
            </div>
          ))}
        </div>
      </Section>

      {/* Notifications */}
      <Section title="Notifications" icon={Bell}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {[
            { key: 'email', label: 'Email Alerts', desc: 'Receive analysis results via email' },
            { key: 'risk', label: 'Risk Alerts', desc: 'Instant alerts when supply chain risk increases' },
            { key: 'weekly', label: 'Weekly Reports', desc: 'Sunday digest of sustainability metrics' },
            { key: 'agents', label: 'Agent Completions', desc: 'Notify when analysis agents complete tasks' },
          ].map(({ key, label, desc }) => (
            <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#f0fdf4', marginBottom: 2 }}>{label}</div>
                <div style={{ fontSize: 12, color: 'rgba(148,163,184,0.5)' }}>{desc}</div>
              </div>
              <Toggle on={(notifications as any)[key]} onChange={() => setNotifications({ ...notifications, [key]: !(notifications as any)[key] })} />
            </div>
          ))}
        </div>
      </Section>

      {/* Security */}
      <Section title="Security" icon={Shield}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { label: 'Two-Factor Authentication', desc: 'Add an extra layer of security to your account', badge: 'Enabled', badgeColor: '#10b981' },
            { label: 'API Audit Logs', desc: 'Review all API access and agent activity logs', badge: null },
            { label: 'Data Encryption', desc: 'All documents encrypted at rest (AES-256)', badge: 'Active', badgeColor: '#10b981' },
          ].map(({ label, desc, badge, badgeColor }) => (
            <div key={label} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '14px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer',
              transition: 'all 0.2s'
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(16,185,129,0.2)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)'}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#f0fdf4', marginBottom: 2 }}>{label}</div>
                <div style={{ fontSize: 12, color: 'rgba(148,163,184,0.5)' }}>{desc}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {badge && <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: `${badgeColor}20`, color: badgeColor }}>{badge}</span>}
                <ChevronRight size={15} color="rgba(148,163,184,0.4)" />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Save */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, paddingBottom: 32 }}>
        <button className="btn-secondary">Reset to Defaults</button>
        <button onClick={handleSave} className="btn-primary" style={{ minWidth: 140 }}>
          {saved ? <><CheckCircle2 size={16} /> Saved!</> : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
