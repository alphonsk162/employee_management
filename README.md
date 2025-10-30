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


## API Endpoints



#### Get All Employees
```http
GET /employees/
```
Retrieves a list of all employees.

#### Create Employee
```http
POST /employees/
```
Creates a new employee record.

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "department": "string"
}
```


#### Get Employee
```http
GET /employees/{emp_id}
```
Retrieves a specific employee by ID.

**Parameters:**
- `emp_id` (path parameter) - The unique identifier of the employee

#### Update Employee
```http
PUT /employees/{emp_id}
```
Updates an existing employee record.

**Parameters:**
- `emp_id` (path parameter) - The unique identifier of the employee

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "department": "string"
}
```

#### Delete Employee
```http
DELETE /employees/{emp_id}
```
Deletes an employee record.

**Parameters:**
- `emp_id` (path parameter) - The unique identifier of the employee