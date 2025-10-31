# Employee Management API

A full-stack **Employee Management System** with a FastAPI backend and Angular frontend.  
This application provides a complete CRUD interface to manage employee records with a modern, user-friendly web interface.


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
- **Frontend:** Angular
- **Database:** MySQL  
- **ORM:** SQLAlchemy  


---

## Project Structure
```
employee_management
├── backend
│   ├── database.py
│   ├── main.py
│   ├── __pycache__
│   └── requirements.txt
├── frontend
│   ├── angular.json
│   ├── node_modules
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   ├── src
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   └── tsconfig.spec.json
├── README.md
├── sample.env
└── venv
```

##  Setup Instructions

### 1. Clone the repository
```
git clone https://github.com/alphonsk162/employee_management
cd employee_management
cd backend
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

### 6. Navigate to frontend directory
```
cd employee_management/frontend/employee-management-app
```

### 7. Install Angular dependencies
```bash
npm install
```

### 8. Run the Angular development server
```bash
ng serve
```
The application will be available at `http://localhost:4200`

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

