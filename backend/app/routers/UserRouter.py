from fastapi import APIRouter, Request, Depends
from sqlalchemy.orm import Session
from app.database.Connection import get_db
from app.models.ModelUser import Users

router = APIRouter(
    prefix="/user",
    tags=["user"]
)

@router.get("/dashboard/me")
def user_dashboard_me(request: Request, database: Session = Depends(get_db)):
    user_id = request.state.user_id
    user = database.query(Users).filter(Users.id == user_id).first()

    if not user:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    return {
        "fullName": user.fullName,
        "email": user.email,
        "tell": user.tell,
        "memberSince": user.created_at,
        "role": user.role.name,
        "totalOrders": 0,
        "totalSpent": 0,
        "savedProducts": 0,
        "addresses": 0
    }
