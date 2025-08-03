import { Component } from '@angular/core';
import { AuthService, User } from '../../interior-services/auth.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // ✅ required for ngModel
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [RouterModule, FormsModule, CommonModule]
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  loginUser() {
    this.authService.login(this.email, this.password)
      .then((user: User) => {
        const loggedInEmail = user.email;
        console.log('Logged in user email:', loggedInEmail);
        alert(`Login successful! Welcome, ${loggedInEmail}`);
        this.router.navigate(['/']);
      })
      .catch(err => alert(err.message));
  }
}
