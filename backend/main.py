from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import analyze, suppliers, analytics, upload, agents, simulation

app = FastAPI(
    title="EcoChain AI Backend",
    description="Autonomous Sustainable Commerce Agent Swarm API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analyze.router, prefix="/analyze", tags=["Analysis"])
app.include_router(suppliers.router, prefix="/suppliers", tags=["Suppliers"])
app.include_router(analytics.router, prefix="/analytics", tags=["Analytics"])
app.include_router(upload.router, prefix="/upload", tags=["Documents"])
app.include_router(agents.router, prefix="/agents", tags=["Agents"])
app.include_router(simulation.router, prefix="/simulation", tags=["Simulation"])

@app.get("/health")
async def health():
    return {"status": "healthy", "version": "1.0.0", "agents": 6}
