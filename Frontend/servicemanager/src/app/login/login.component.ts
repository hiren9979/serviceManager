import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email!: string;
  password!: string ;

  constructor(private authService: AuthService) {}
  login() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        console.log('Login successful:', response);
        // Handle successful login (e.g., redirect, store token)
        alert('Login successful!');
      },
      (error) => {
        console.error('Login error:', error);
        // Handle error (e.g., display error message)
        alert('Login failed. Please try again.');
      }
    );
  }
}
