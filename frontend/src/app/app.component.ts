import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router'
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from './services/auth.service';
import { Observable} from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, RouterLinkActive, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  searchId!: number;
  isLoggedIn$!: Observable<boolean>;

  constructor(private authService: AuthService, private router: Router) {
  }
  ngOnInit() {
    this.isLoggedIn$ = this.authService.isAuthenticated();
  }
  searchEmployee() {
    if (this.searchId) {
      this.router.navigate(['/employee', this.searchId]);
    }
  }
  logout() {
    this.authService.logout();
  }

  isloggedIn(): boolean {
    return this.authService.checkAuthentication();
  }
}
