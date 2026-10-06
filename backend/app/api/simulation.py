from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class SimRequest(BaseModel):
    packaging: str
    shipping: str
    material: str = "standard"

@router.post("/")
async def run_simulation(req: SimRequest):
    """What-if sustainability scenario simulation."""
    emission_factors = {"Air": 8.4, "Road": 4.2, "Rail": 1.8, "Sea": 0.6}
    packaging_co2 = {"Plastic": 0.8, "Recycled Paper": 0.2, "Biodegradable": 0.15, "Minimal": 0.1}
    shipping_co2 = emission_factors.get(req.shipping, 2.1)
    pack_co2 = packaging_co2.get(req.packaging, 0.5)
    total = round(shipping_co2 + pack_co2, 2)
    return {
        "total_emission_kg": total,
        "shipping_emission": shipping_co2,
        "packaging_emission": pack_co2,
        "risk_score": 28 if req.shipping != "Air" else 42,
        "cost_per_unit": 12.40 if req.shipping == "Sea" else 18.20,
        "sustainability_score": max(20, 100 - int(total * 8))
    }
