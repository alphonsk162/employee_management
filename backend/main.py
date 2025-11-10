from fastapi import FastAPI, HTTPException, Request, Depends
from database import SessionLocal, Employee, User, engine
from sqlalchemy import text
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from auth import (
    get_password_hash, 
    verify_password, 
    create_access_token, 
    get_current_user,
    ACCESS_TOKEN_EXPIRE_MINUTES,
    get_db
)
from sqlalchemy.orm import Session
import os
from fastapi import UploadFile, File, Form
import shutil
from fastapi.staticfiles import StaticFiles
from fastapi import Query


from logging_config import setup_logging
from exception_handlers import (
    http_exception_handler,
    validation_exception_handler,
    sqlalchemy_exception_handler,
    generic_exception_handler,
)
from fastapi.exceptions import RequestValidationError
from sqlalchemy.exc import SQLAlchemyError
import logging

app = FastAPI()

logger = setup_logging()
logger.info("Application startup complete")

app.add_exception_handler(HTTPException, http_exception_handler)
app.add_exception_handler(RequestValidationError, validation_exception_handler)
app.add_exception_handler(SQLAlchemyError, sqlalchemy_exception_handler)
app.add_exception_handler(Exception, generic_exception_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
class EmployeeModel(BaseModel):
    name: str
    email: str
    department: str
    file_details: str | None = None

class UserRegister(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

@app.post("/register")
def register(user: UserRegister, db: Session = Depends(get_db)):
    query = text("SELECT * FROM users WHERE username = :username")
    existing_user = db.execute(query, {"username": user.username}).fetchone()
    
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    hashed_password = get_password_hash(user.password)
    query = text("INSERT INTO users (username, hashed_password) VALUES (:username, :hashed_password)")
    db.execute(query, {"username": user.username, "hashed_password": hashed_password})
    db.commit()
    
    return {"message": "User registered successfully"}

@app.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    query = text("SELECT * FROM users WHERE username = :username")
    user = db.execute(query, {"username": form_data.username}).fetchone()
    
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=401,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/employees/")
def create_employee(
    name: str = Form(...),
    email: str = Form(...),
    department: str = Form(...),
    file: UploadFile = File(...),
    current_user = Depends(get_current_user)
):
    db = SessionLocal()
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    query = text("""
        INSERT INTO employees (name, email, department, file_details)
        VALUES (:name, :email, :department, :file_details)
    """)
    db.execute(query, {
        "name": name,
        "email": email,
        "department": department,
        "file_details": file_path
    })

    db.commit()
    db.close()

    return {"message": "Employee added successfully", "file_path": file_path}

@app.get("/employees/")
def get_employees(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, gt=0),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    try:
        count_query = text("SELECT COUNT(*) FROM employees")
        total = db.execute(count_query).scalar()

        data_query = text("""
            SELECT * FROM employees
            ORDER BY id
            LIMIT :limit OFFSET :skip
        """)
        result = db.execute(data_query, {"limit": limit, "skip": skip}).fetchall()
        employees = [dict(row._mapping) for row in result]

        has_next = skip + limit < total
        has_prev = skip > 0

        return {
            "employees": employees,
            "total": total,
            "has_next": has_next,
            "has_prev": has_prev
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching employees: {str(e)}")

@app.get("/employees/{emp_id}")
def get_employee(emp_id, current_user = Depends(get_current_user)):
    db = SessionLocal()
    query = text("SELECT * FROM employees WHERE id = :id")
    result = db.execute(query, {"id": emp_id}).fetchone()
    db.close()
    # if not result:
    #     raise HTTPException(status_code=404, detail="Employee not found")
    emp = dict(result._mapping)
    return emp

@app.put("/employees/{emp_id}")
def update_employee(emp_id, emp: EmployeeModel, current_user = Depends(get_current_user)):
    data = emp.dict()
    db = SessionLocal()
    # using sql queries
    query = text("UPDATE employees SET name = :name, email = :email, department = :department WHERE id = :id")
    result = db.execute(query, {"name": data["name"], "email": data["email"], "department": data["department"], "id": emp_id})
    if result.rowcount == 0:
        db.close()
        raise HTTPException(status_code=404, detail="Employee not found")
    # using orm
    # emp = db.query(Employee).filter(Employee.id == emp_id).first()
    # if not emp:
    #     db.close()
    #     raise HTTPException(status_code=404, detail="Employee not found")
    # emp.name = data["name"]
    # emp.email = data["email"]
    # emp.department = data["department"]
    # db.refresh(emp)
    db.commit()
    db.close()
    return {"message": "Employee updated successfully"}

@app.delete("/employees/{emp_id}")
def delete_employee(emp_id, current_user = Depends(get_current_user)):
    db = SessionLocal()
    # using sql queries
    query = text("DELETE FROM employees WHERE id = :id")
    result = db.execute(query, {"id": emp_id})
    if result.rowcount == 0:
        db.close()
        raise HTTPException(status_code=404, detail="Employee not found")
    # using orm
    # emp = db.query(Employee).filter(Employee.id == emp_id).first()
    # if not emp:
    #     db.close()
    #     raise HTTPException(status_code=404, detail="Employee not found")
    # db.delete(emp)
    db.commit()
    db.close()
    return {"message": "Employee deleted successfully"}






