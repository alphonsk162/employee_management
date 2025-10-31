import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css'
})
export class EditEmployeeComponent implements OnInit {
  employeeForm: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      name: [''],
      email: [''],
      department: ['']
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeeService.getEmployeeById(+id).subscribe({
        next: (data) => this.employeeForm.patchValue(data),
        error: (err) => console.error('Error fetching employee data', err)
      });
    }
  }

  onSave(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const updatedData = {
        name: this.employeeForm.get('name')?.value,
        email: this.employeeForm.get('email')?.value,
        department: this.employeeForm.get('department')?.value
      };
      this.employeeService.updateEmployee(+id, updatedData).subscribe({
        next: () => this.router.navigate(['/employee', id]),
        error: (err) => console.error('Error updating employee', err)
      });
    }
  }

  onCancel(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/employee', id]);
  }
}
