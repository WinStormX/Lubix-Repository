from fastapi import HTTPException
from sqlalchemy.orm import Session

def create_product_service(user_id: str, database: Session):
    raise HTTPException(status_code=501, detail="Funcionalidad de creación de productos en desarrollo")

def update_product_service():
    raise HTTPException(status_code=501, detail="Funcionalidad de actualización de productos en desarrollo")

def delete_product_service():
    raise HTTPException(status_code=501, detail="Funcionalidad de eliminación de productos en desarrollo")
