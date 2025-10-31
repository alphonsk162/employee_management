import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ViewEmployeesComponent } from './view-employees/view-employees.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'view-employees', component: ViewEmployeesComponent },
    { path: 'add-employee', component: AddEmployeeComponent },
    { path: 'employees/:id', component: EmployeeDetailsComponent },
    { path: 'employee/:id', component: EmployeeDetailsComponent },
    { path: 'employee/:id/edit', component: EditEmployeeComponent }
];



// import { UserListComponent } from './user-list/user-list.component';
// import { UserFormComponent } from './user-form/user-form.component';

// export const routes: Routes = [
//   { path: '', component: HomeComponent },
//   { path: 'users', component: UserListComponent },
//   { path: 'add-user', component: UserFormComponent }
// ];