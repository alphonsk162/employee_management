import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router'
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, RouterLinkActive, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  searchId!: number;

  constructor(private router: Router) {}

  searchEmployee() {
    if (this.searchId) {
      this.router.navigate(['/employee', this.searchId]);
    }
  }
}
