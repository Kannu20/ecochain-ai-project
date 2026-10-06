from fastapi import APIRouter
router = APIRouter()

@router.get("/")
async def get_analytics():
    """Aggregated platform analytics and sustainability KPIs."""
    return {
        "sustainability_score": 78,
        "total_analyses": 247,
        "carbon_saved_kg": 12400,
        "active_agents": 6
    }
