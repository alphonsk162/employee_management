import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then(m => m.HomeComponent),
    canActivate: [authGuard]
  },
  {
    path: 'view-employees',
    loadComponent: () =>
      import('./view-employees/view-employees.component').then(m => m.ViewEmployeesComponent),
    canActivate: [authGuard]
  },
  {
    path: 'add-employee',
    loadComponent: () =>
      import('./add-employee/add-employee.component').then(m => m.AddEmployeeComponent),
    canActivate: [authGuard]
  },
  {
    path: 'employees/:id',
    loadComponent: () =>
      import('./employee-details/employee-details.component').then(m => m.EmployeeDetailsComponent),
    canActivate: [authGuard]
  },
  {
    path: 'employee/:id',
    loadComponent: () =>
      import('./employee-details/employee-details.component').then(m => m.EmployeeDetailsComponent),
    canActivate: [authGuard]
  },
  {
    path: 'employee/:id/edit',
    loadComponent: () =>
      import('./edit-employee/edit-employee.component').then(m => m.EditEmployeeComponent),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];


