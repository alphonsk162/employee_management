// import { Routes } from '@angular/router';
// import { HomeComponent } from './home/home.component';
// import { ViewEmployeesComponent } from './view-employees/view-employees.component';
// import { AddEmployeeComponent } from './add-employee/add-employee.component';
// import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
// import { EditEmployeeComponent } from './edit-employee/edit-employee.component';


// export const routes: Routes = [
//     { path: '', component: HomeComponent },
//     { path: 'view-employees', component: ViewEmployeesComponent },
//     { path: 'add-employee', component: AddEmployeeComponent },
//     { path: 'employees/:id', component: EmployeeDetailsComponent },
//     { path: 'employee/:id', component: EmployeeDetailsComponent },
//     { path: 'employee/:id/edit', component: EditEmployeeComponent }
// ];



import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ViewEmployeesComponent } from './view-employees/view-employees.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent, canActivate: [authGuard] },
    { path: 'view-employees', component: ViewEmployeesComponent, canActivate: [authGuard] },
    { path: 'add-employee', component: AddEmployeeComponent, canActivate: [authGuard] },
    { path: 'employees/:id', component: EmployeeDetailsComponent, canActivate: [authGuard] },
    { path: 'employee/:id', component: EmployeeDetailsComponent, canActivate: [authGuard] },
    { path: 'employee/:id/edit', component: EditEmployeeComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: 'login' }
];

