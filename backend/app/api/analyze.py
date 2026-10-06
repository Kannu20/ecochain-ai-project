from fastapi import APIRouter, BackgroundTasks
from pydantic import BaseModel
from typing import Optional
from app.agents.langgraph_workflow import eco_workflow

router = APIRouter()

class AnalyzeRequest(BaseModel):
    product: str
    category: str
    market: str
    budget: float
    price: Optional[float] = None
    shipping: str
    packaging: str
    notes: Optional[str] = ""

@router.post("/")
async def analyze_product(req: AnalyzeRequest):
    """Run full EcoChain AI agent swarm analysis."""
    state = {
        "product": req.product, "category": req.category,
        "market": req.market, "budget": req.budget,
        "shipping": req.shipping, "packaging": req.packaging,
        "suppliers": None, "carbon_data": None, "risk_data": None,
        "recommendations": None, "analytics": None, "final_report": None
    }
    result = await eco_workflow.ainvoke(state)
    return {"status": "complete", "data": result}
