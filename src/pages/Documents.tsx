import { useState, useRef } from 'react';
import { Upload, FileText, FileSpreadsheet, File, CheckCircle2, Loader2, X, Database, Search, Eye, Trash2 } from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'processing' | 'indexing' | 'ready' | 'error';
  progress: number;
  pages?: number;
  chunks?: number;
  uploadedAt: string;
}

const mockFiles: UploadedFile[] = [
  { id: '1', name: 'supplier_audit_Q2_2025.pdf', size: 2400000, type: 'pdf', status: 'ready', progress: 100, pages: 48, chunks: 96, uploadedAt: '2025-05-18 09:12' },
  { id: '2', name: 'carbon_inventory_2024.xlsx', size: 890000, type: 'xlsx', status: 'ready', progress: 100, pages: 12, chunks: 24, uploadedAt: '2025-05-17 14:30' },
  { id: '3', name: 'supplier_contracts_EU.pdf', size: 5100000, type: 'pdf', status: 'ready', progress: 100, pages: 124, chunks: 248, uploadedAt: '2025-05-16 11:05' },
  { id: '4', name: 'logistics_partners_list.csv', size: 140000, type: 'csv', status: 'ready', progress: 100, pages: 1, chunks: 8, uploadedAt: '2025-05-15 16:22' },
];

function FileIcon({ type }: { type: string }) {
  const config: Record<string, { icon: any, color: string, bg: string }> = {
    pdf: { icon: FileText, color: '#ef4444', bg: 'rgba(239,68,68,0.15)' },
    xlsx: { icon: FileSpreadsheet, color: '#10b981', bg: 'rgba(16,185,129,0.15)' },
    csv: { icon: FileSpreadsheet, color: '#3b82f6', bg: 'rgba(59,130,246,0.15)' },
    doc: { icon: FileText, color: '#8b5cf6', bg: 'rgba(139,92,246,0.15)' },
  };
  const { icon: Icon, color, bg } = config[type] || { icon: File, color: '#94a3b8', bg: 'rgba(148,163,184,0.15)' };
  return (
    <div style={{ width: 38, height: 38, borderRadius: 8, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <Icon size={18} color={color} />
    </div>
  );
}

function StatusBadge({ status }: { status: UploadedFile['status'] }) {
  const map = {
    uploading: { label: 'Uploading', color: '#3b82f6', bg: 'rgba(59,130,246,0.15)' },
    processing: { label: 'Processing', color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' },
    indexing: { label: 'Indexing', color: '#8b5cf6', bg: 'rgba(139,92,246,0.15)' },
    ready: { label: 'Indexed ✓', color: '#10b981', bg: 'rgba(16,185,129,0.15)' },
    error: { label: 'Error', color: '#ef4444', bg: 'rgba(239,68,68,0.15)' },
  };
  const { label, color, bg } = map[status];
  return (
    <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: bg, color, letterSpacing: '0.04em' }}>
      {label}
    </span>
  );
}

function formatSize(bytes: number) {
  if (bytes < 1000000) return `${(bytes / 1000).toFixed(0)} KB`;
  return `${(bytes / 1000000).toFixed(1)} MB`;
}

export default function Documents() {
  const [files, setFiles] = useState<UploadedFile[]>(mockFiles);
  const [dragging, setDragging] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [ragQuery, setRagQuery] = useState('');
  const [ragResult, setRagResult] = useState('');
  const [ragLoading, setRagLoading] = useState(false);

  const processFile = async (file: File) => {
    const id = Date.now().toString();
    const ext = file.name.split('.').pop()?.toLowerCase() || 'file';
    const newFile: UploadedFile = {
      id, name: file.name, size: file.size, type: ext,
      status: 'uploading', progress: 0, uploadedAt: new Date().toLocaleString()
    };
    setFiles(prev => [newFile, ...prev]);

    for (let p = 0; p <= 100; p += 20) {
      await new Promise(r => setTimeout(r, 200));
      setFiles(prev => prev.map(f => f.id === id ? { ...f, progress: p } : f));
    }
    setFiles(prev => prev.map(f => f.id === id ? { ...f, status: 'processing' } : f));
    await new Promise(r => setTimeout(r, 1200));
    setFiles(prev => prev.map(f => f.id === id ? { ...f, status: 'indexing' } : f));
    await new Promise(r => setTimeout(r, 1500));
    setFiles(prev => prev.map(f => f.id === id ? { ...f, status: 'ready', progress: 100, pages: Math.floor(Math.random() * 50) + 5, chunks: Math.floor(Math.random() * 60) + 10 } : f));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    Array.from(e.dataTransfer.files).forEach(processFile);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) Array.from(e.target.files).forEach(processFile);
  };

  const handleRagQuery = async () => {
    if (!ragQuery.trim()) return;
    setRagLoading(true);
    setRagResult('');
    await new Promise(r => setTimeout(r, 2000));
    const answers: Record<string, string> = {
      default: 'Based on your uploaded documents, the analysis shows that **NordicSustain AB** (Sweden) scores highest on ESG compliance (96/100) with GOTS, B Corp, and EU Ecolabel certifications. Their Q2 2025 audit report confirms zero child labor violations and renewable energy usage of 94%. Carbon emissions are 1.2 kg CO₂e/unit — 71% below industry average. Recommended as primary supplier for EU market compliance.',
    };
    setRagResult(answers.default);
    setRagLoading(false);
  };

  const totalChunks = files.filter(f => f.status === 'ready').reduce((s, f) => s + (f.chunks || 0), 0);
  const readyFiles = files.filter(f => f.status === 'ready').length;

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      <div style={{ marginBottom: 32 }}>
        <div className="section-eyebrow" style={{ marginBottom: 8 }}>Knowledge Base</div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#f0fdf4', letterSpacing: '-0.02em', marginBottom: 8 }}>Document Intelligence</h1>
        <p style={{ fontSize: 13, color: 'rgba(148,163,184,0.6)' }}>Upload supplier contracts, audit reports, and data sheets — AI agents will use them as context</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { label: 'Total Documents', val: files.length, icon: FileText, color: '#3b82f6' },
          { label: 'Indexed Documents', val: readyFiles, icon: Database, color: '#10b981' },
          { label: 'Vector Chunks', val: totalChunks.toLocaleString(), icon: Database, color: '#8b5cf6' },
          { label: 'RAG Queries', val: '1,847', icon: Search, color: '#f59e0b' },
        ].map(({ label, val, icon: Icon, color }) => (
          <div key={label} className="metric-card" style={{ cursor: 'default' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <Icon size={16} color={color} />
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, marginTop: 4 }} />
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#f0fdf4', fontFamily: 'Space Mono, monospace' }}>{val}</div>
            <div style={{ fontSize: 11, color: 'rgba(148,163,184,0.5)', marginTop: 4 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Upload zone */}
      <div
        className={`drag-area ${dragging ? 'dragging' : ''}`}
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        style={{ marginBottom: 24 }}
      >
        <input ref={inputRef} type="file" multiple accept=".pdf,.csv,.xlsx,.doc,.docx" style={{ display: 'none' }} onChange={handleFileInput} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Upload size={24} color="#10b981" />
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#f0fdf4', marginBottom: 6 }}>Drop files here or click to browse</div>
            <div style={{ fontSize: 13, color: 'rgba(148,163,184,0.6)' }}>Supports PDF, CSV, XLSX, DOC · Max 50MB per file</div>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { label: 'Supplier Contracts', icon: '📑' },
              { label: 'Audit Reports', icon: '📋' },
              { label: 'Carbon Data', icon: '🌿' },
              { label: 'Compliance Docs', icon: '⚖️' },
            ].map(({ label, icon }) => (
              <span key={label} style={{ fontSize: 12, padding: '3px 10px', borderRadius: 6, background: 'rgba(255,255,255,0.04)', color: 'rgba(148,163,184,0.7)', border: '1px solid rgba(255,255,255,0.08)' }}>
                {icon} {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* File list */}
      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, overflow: 'hidden', marginBottom: 24 }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#f0fdf4' }}>Knowledge Base Files</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 7, padding: '0 10px', height: 32 }}>
            <Search size={12} color="rgba(148,163,184,0.5)" />
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search files..." style={{ background: 'none', border: 'none', outline: 'none', fontSize: 12, color: '#e2e8f0', fontFamily: 'DM Sans, sans-serif', width: 160 }} />
          </div>
        </div>
        {files.filter(f => !searchQuery || f.name.toLowerCase().includes(searchQuery.toLowerCase())).map((file, i) => (
          <div key={file.id} style={{
            padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 14,
            borderBottom: i < files.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
            transition: 'background 0.15s'
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
            <FileIcon type={file.type} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#f0fdf4', marginBottom: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</div>
              <div style={{ fontSize: 11, color: 'rgba(148,163,184,0.5)', display: 'flex', gap: 12 }}>
                <span>{formatSize(file.size)}</span>
                {file.pages && <span>{file.pages} pages</span>}
                {file.chunks && <span>{file.chunks} chunks</span>}
                <span>{file.uploadedAt}</span>
              </div>
              {(file.status === 'uploading' || file.status === 'processing') && (
                <div className="progress-bar" style={{ marginTop: 6 }}>
                  <div className="progress-fill" style={{ width: `${file.progress}%` }} />
                </div>
              )}
            </div>
            <StatusBadge status={file.status} />
            <div style={{ display: 'flex', gap: 6 }}>
              <button style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 7, width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#94a3b8' }}>
                <Eye size={13} />
              </button>
              <button onClick={() => setFiles(prev => prev.filter(f => f.id !== file.id))}
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 7, width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#ef4444' }}>
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* RAG Query */}
      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Search size={15} color="#10b981" />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#f0fdf4' }}>Query Your Documents (RAG)</div>
            <div style={{ fontSize: 12, color: 'rgba(148,163,184,0.5)' }}>Ask questions — agents will search across all indexed documents</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, marginBottom: ragResult || ragLoading ? 16 : 0 }}>
          <input className="eco-input" value={ragQuery} onChange={e => setRagQuery(e.target.value)}
            placeholder="e.g. Which suppliers have GOTS certification and lowest carbon emissions?"
            onKeyDown={e => e.key === 'Enter' && handleRagQuery()} style={{ flex: 1 }} />
          <button onClick={handleRagQuery} className="btn-primary" style={{ padding: '10px 20px', flexShrink: 0 }} disabled={ragLoading}>
            {ragLoading ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Search size={16} />}
            Query
          </button>
        </div>
        {ragLoading && (
          <div style={{ padding: '16px', background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: 10, display: 'flex', gap: 10, alignItems: 'center' }}>
            <Loader2 size={16} color="#10b981" style={{ animation: 'spin 1s linear infinite', flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: 'rgba(148,163,184,0.7)' }}>Searching across {totalChunks} vector chunks in {readyFiles} documents...</span>
          </div>
        )}
        {ragResult && !ragLoading && (
          <div style={{ padding: '18px 20px', background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
              <CheckCircle2 size={14} color="#10b981" />
              <span style={{ fontSize: 12, color: '#10b981', fontWeight: 700 }}>AI RESPONSE · {readyFiles} documents searched · {totalChunks} chunks retrieved</span>
            </div>
            <p style={{ fontSize: 14, color: '#e2e8f0', lineHeight: 1.75 }}
              dangerouslySetInnerHTML={{ __html: ragResult.replace(/\*\*(.*?)\*\*/g, '<strong style="color:#f0fdf4">$1</strong>') }} />
          </div>
        )}
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
