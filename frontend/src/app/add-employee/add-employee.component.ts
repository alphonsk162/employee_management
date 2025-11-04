// import { Component } from '@angular/core';
// import { EmployeeService } from '../services/employee.service';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms'; 

// @Component({
//   selector: 'app-add-employee',
//   imports: [CommonModule, FormsModule],
//   templateUrl: './add-employee.component.html',
//   styleUrl: './add-employee.component.css'
// })
// export class AddEmployeeComponent {
//   employee = { name: '', email: '', department: '' };

//   constructor(private employeeService: EmployeeService, private router: Router) {}

//   onSubmit() {
//     this.employeeService.addEmployee(this.employee).subscribe({
//       next: (res) => {
//         console.log('Employee added successfully');
//         this.router.navigate(['/view-employees']);  // redirect to view page
//       },
//       error: (err) => console.error('Error adding employee:', err)
//     });
//   }
// }

import { Component } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-add-employee',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {
  employee = { name: '', email: '', department: '' };
  selectedFile: File | null = null;

  constructor(private employeeService: EmployeeService, private router: Router) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit() {
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.employee.name);
    formData.append('email', this.employee.email);
    formData.append('department', this.employee.department);
    formData.append('file', this.selectedFile);

    this.employeeService.addEmployee(formData).subscribe({
      next: (res) => {
        console.log('Employee added successfully', res);
        this.router.navigate(['/view-employees']);
      },
      error: (err) => console.error('Error adding employee:', err)
    });
  }
}
