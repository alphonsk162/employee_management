import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8000/employees/';
  constructor(private http: HttpClient) { }

getEmployees(skip: number = 0, limit: number = 5): Observable<any> {
  return this.http.get(`${this.apiUrl}?skip=${skip}&limit=${limit}`);
}


  addEmployee(employeeData: any): Observable<any> {
    return this.http.post(this.apiUrl, employeeData);
  }

  getEmployeeById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}${id}`);
  }

  updateEmployee(id: number, data: any): Observable<any> {
  return this.http.put(`${this.apiUrl}${id}`, data);
  }

  deleteEmployee(id: number) {
    return this.http.delete(`${this.apiUrl}${id}`);
  }


}


