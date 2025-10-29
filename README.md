# Employee Management API

A simple **FastAPI + SQLAlchemy + MySQL** CRUD application to manage employees.  
It supports creating, reading, updating, and deleting employee records.

---

## Features

- Add new employees  
- View all employees  
- Get a specific employee by ID  
- Update employee details  
- Delete employee records  
- MySQL database integration using SQLAlchemy ORM

---

## Tech Stack

- **Backend:** FastAPI  
- **Database:** MySQL  
- **ORM:** SQLAlchemy  

---

## Project Structure
```
employee_management
├── database.py
├── main.py
├── __pycache__
│   ├── database.cpython-312.pyc
│   └── main.cpython-312.pyc
├── README.md
├── requirements.txt
├── sample.env
└── venv
```

##  Setup Instructions

### 1. Clone the repository
```
git clone https://github.com/alphonsk162/employee_management
cd employee_management
```

### 2. Create a virtual environment
```
python3 -m venv venv
source venv/bin/activate    # Linux/Mac
venv\Scripts\activate       # Windows
```

### 3. Install dependencies
```
pip install -r requirements.txt
```

### 4.Configure environment variables (see sample.env) and set up MySQL.


### 5.Run the Application
```
uvicorn main:app --reload
```