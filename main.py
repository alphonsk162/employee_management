from fastapi import FastAPI, HTTPException, Request
from database import SessionLocal, Employee

app = FastAPI()

@app.post("/employees/")
async def create_employee(request):
    data = await request.json()
    db = SessionLocal()
    emp = Employee(name=data["name"], email=data["email"], department=data["department"])
    db.add(emp)
    db.commit()
    db.refresh(emp)
    db.close()
    return {"message": "Employee added successfully", "id": emp.id}

@app.get("/employees/")
def get_employees():
    db = SessionLocal()
    employees = db.query(Employee).all()
    db.close()
    return employees

@app.get("/employees/{emp_id}")
def get_employee(emp_id):
    db = SessionLocal()
    emp = db.query(Employee).filter(Employee.id == emp_id).first()
    db.close()
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")
    return emp

@app.put("/employees/{emp_id}")
async def update_employee(emp_id, request):
    data = await request.json()
    db = SessionLocal()
    emp = db.query(Employee).filter(Employee.id == emp_id).first()
    if not emp:
        db.close()
        raise HTTPException(status_code=404, detail="Employee not found")
    emp.name = data["name"]
    emp.email = data["email"]
    emp.department = data["department"]
    db.commit()
    db.refresh(emp)
    db.close()
    return {"message": "Employee updated successfully"}

@app.delete("/employees/{emp_id}")
def delete_employee(emp_id):
    db = SessionLocal()
    emp = db.query(Employee).filter(Employee.id == emp_id).first()
    if not emp:
        db.close()
        raise HTTPException(status_code=404, detail="Employee not found")
    db.delete(emp)
    db.commit()
    db.close()
    return {"message": "Employee deleted successfully"}






