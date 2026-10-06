# EcoChain AI – Autonomous Sustainable Commerce Agent Swarm

> AI-powered sustainability intelligence platform for supply chain optimization

## 🚀 Tech Stack

**Frontend:** React 19 + TypeScript + Vite + Tailwind CSS + Recharts + React Router  
**Backend:** FastAPI + LangGraph (multi-agent orchestration)  
**Database:** PostgreSQL + ChromaDB (vector storage)  
**AI:** OpenRouter API (Mistral by default, switchable)  
**Deployment:** Vercel (frontend) · Render/Railway (backend)

## 📁 Project Structure

```
ecochain-ai/                  ← Frontend (this repo)
├── src/
│   ├── pages/
│   │   ├── Landing.tsx       ← Hero, features, stats, CTA
│   │   ├── Analyze.tsx       ← Product form + agent loading
│   │   ├── Dashboard.tsx     ← Charts, metrics, simulation
│   │   ├── Agents.tsx        ← Agent network visualization
│   │   ├── Documents.tsx     ← RAG document upload
│   │   └── Settings.tsx      ← Model, API, profile config
│   ├── components/
│   │   └── Layout.tsx        ← Sidebar + top nav shell
│   ├── data/
│   │   └── mockData.ts       ← Realistic supplier/carbon data
│   └── index.css             ← Design system + custom styles
└── dist/                     ← Production build output
```

## 🛠️ Setup

```bash
# Install dependencies
pnpm install

# Development
pnpm dev

# Production build
pnpm build
```

## 🌐 Pages & Routes

| Route         | Page        | Description                         |
|---------------|-------------|-------------------------------------|
| `/`           | Landing     | Marketing homepage                  |
| `/analyze`    | Analyze     | Product analysis form + agent flow  |
| `/dashboard`  | Dashboard   | Full analytics + supplier table     |
| `/agents`     | Agents      | AI agent network monitor            |
| `/documents`  | Documents   | RAG knowledge base upload           |
| `/settings`   | Settings    | Model, API, notifications           |

## 🤖 AI Agent Swarm (LangGraph)

```
Manager Agent
    ├── Supplier Agent    → Finds & scores suppliers (50k+ DB)
    ├── Carbon Agent      → Scope 1/2/3 emissions (GHG Protocol)
    ├── Risk Agent        → Geopolitical + climate risk scoring
    ├── Recommendation Agent → ROI-ranked optimizations
    └── Analytics Agent   → Dashboard generation
```

## 🔑 Environment Variables

```env
VITE_API_URL=https://your-backend.railway.app
VITE_OPENROUTER_API_KEY=your_key_here
```

## 🚢 Deploy to Vercel

```bash
npx vercel --prod
```

## 📊 Backend API (FastAPI)

```
POST   /analyze       → Run full agent analysis
GET    /suppliers     → List scored suppliers
GET    /analytics     → Aggregated metrics
POST   /upload        → Document ingestion (RAG)
GET    /agents        → Agent status + logs
POST   /simulation    → What-if scenario modeling
```

## 🎨 Design System

- **Background:** `#0B0F19` deep dark navy
- **Primary:** Emerald `#10b981` 
- **Accent:** Blue `#3b82f6`
- **Glass effects:** `rgba(255,255,255,0.03)` + `backdrop-filter: blur(20px)`
- **Typography:** DM Sans (UI) + Space Mono (data/code)
- **Grid:** 60px dot grid, gradient borders, glow effects

## 🏆 Features

- ✅ 6-page application with full routing
- ✅ Animated AI agent workflow visualization  
- ✅ Interactive carbon/profit/risk/supplier charts (Recharts)
- ✅ Sustainability score gauge
- ✅ What-if simulation engine
- ✅ Supplier intelligence table with certifications
- ✅ AI recommendation cards with ROI
- ✅ Document RAG upload + querying
- ✅ Model selection (Mistral/Claude/Llama/GPT-4o)
- ✅ Dark mode · Mobile responsive · Accessible
- ✅ Skeleton loaders, form validation, toast-ready
- ✅ Production build ready (Vercel/Netlify/Cloudflare)

## 📄 License
MIT – Built for EcoChain AI Hackathon 2025
