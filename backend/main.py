from fastapi import FastAPI, HTTPException, Request
from database import SessionLocal, Employee, engine
from sqlalchemy import text
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Employee(BaseModel):
    name: str
    email: str
    department: str

@app.post("/employees/")
def create_employee(emp: Employee):
    data = emp.dict()
    db = SessionLocal()
    # using sql queries
    query = text("INSERT INTO employees (name, email, department) VALUES (:name, :email, :department)")
    db.execute(query, {"name": data["name"], "email": data["email"], "department": data["department"]})
    # using orm
    # emp = Employee(name=data["name"], email=data["email"], department=data["department"])
    # db.add(emp)
    # db.refresh(emp)
    db.commit()
    db.close()
    return {"message": "Employee added successfully"}

@app.get("/employees/")
def get_employees():
    db = SessionLocal()
    # using sql queries
    query = text("SELECT * FROM employees")
    eemployees_obj = db.execute(query).fetchall()
    employees = [dict(row._mapping) for row in eemployees_obj]
    # using orm
    # employees = db.query(Employee).all()
    db.close()
    return employees


@app.get("/employees/{emp_id}")
def get_employee(emp_id):
    db = SessionLocal()
    # using sql queries
    query = text("SELECT * FROM employees WHERE id = :id")
    emp = dict(db.execute(query, {"id": emp_id}).fetchone()._mapping)
    # using orm
    # emp = db.query(Employee).filter(Employee.id == emp_id).first()
    db.close()
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")
    return emp

@app.put("/employees/{emp_id}")
def update_employee(emp_id, emp: Employee):
    data = emp.dict()
    db = SessionLocal()
    # using sql queries
    query = text("UPDATE employees SET name = :name, email = :email, department = :department WHERE id = :id")
    result = db.execute(query, {"name": data["name"], "email": data["email"], "department": data["department"], "id": emp_id})
    if result.rowcount == 0:
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
def delete_employee(emp_id):
    db = SessionLocal()
    # using sql queries
    query = text("DELETE FROM employees WHERE id = :id")
    result = db.execute(query, {"id": emp_id})
    if result.rowcount == 0:
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






