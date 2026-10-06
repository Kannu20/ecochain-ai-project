from fastapi import APIRouter
router = APIRouter()

@router.get("/")
async def get_agents():
    agents = [
        {"id": "manager", "status": "active", "calls": 247, "latency_ms": 1200, "success_rate": 99.1},
        {"id": "supplier", "status": "active", "calls": 1834, "latency_ms": 2800, "success_rate": 97.4},
        {"id": "carbon", "status": "active", "calls": 1621, "latency_ms": 3100, "success_rate": 98.7},
        {"id": "risk", "status": "active", "calls": 982, "latency_ms": 1900, "success_rate": 96.2},
        {"id": "recommendation", "status": "active", "calls": 743, "latency_ms": 4200, "success_rate": 98.1},
        {"id": "analytics", "status": "active", "calls": 524, "latency_ms": 2400, "success_rate": 99.6},
    ]
    return {"agents": agents, "total": len(agents), "all_active": True}
