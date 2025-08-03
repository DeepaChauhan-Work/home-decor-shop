import { Component } from '@angular/core';
import { AuthService } from '../../interior-services/auth.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
  imports: [RouterModule, FormsModule, CommonModule]
})
export class RegistrationComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  registerUser() {
    const email = this.email.trim();
    const password = this.password;

    if (!email || !password) {
      alert('Please provide valid email and password.');
      return;
    }

    this.authService.register(email, password)
      .then(() => {
        alert('Registration successful! Please log in.');
        this.router.navigate(['/login']);
      })
      .catch(err => {
        console.error(err);
        alert('Registration failed. ' + err.message);
      });
  }
}
