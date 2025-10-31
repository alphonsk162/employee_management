import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [NgIf, RouterModule],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent implements OnInit {
  employee: any;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.getEmployeeDetails(+id);
      }
    });
  }

  getEmployeeDetails(id: number) {
    this.employeeService.getEmployeeById(id).subscribe({
      next: (data) => this.employee = data,
      error: (err) => console.error('Error fetching employee details', err)
    });
  }

  deleteEmployee(): void {
    if (this.employee && confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(this.employee.id).subscribe({
        next: () => {
          alert('Employee deleted successfully!');
          this.router.navigate(['/view-employees']); 
        },
        error: (err) => console.error('Error deleting employee', err)
      });
    }
  }
}
