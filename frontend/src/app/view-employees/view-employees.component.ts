import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../services/employee.service';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-view-employees',
  imports: [CommonModule, FormsModule],
  templateUrl: './view-employees.component.html',
  styleUrl: './view-employees.component.css'
})
export class ViewEmployeesComponent implements OnInit {
  employees: any[] = [];
  skip = 0;   
  limit = 1;     
  hasNext = false;
  hasPrev = false; 

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees(this.skip, this.limit).subscribe({
      next: (data) => {
        console.log(data);
        this.employees = data.employees;
        this.hasPrev = data.has_prev;
        this.hasNext = data.has_next;
      },
      error: (err) => console.error('Error fetching employees', err)
    });
  }

  nextPage(): void {
    this.skip += this.limit;
    this.loadEmployees();
  }

  prevPage(): void {
    if (this.skip >= this.limit) {
      this.skip -= this.limit;
      this.loadEmployees();
    }
  }
}

