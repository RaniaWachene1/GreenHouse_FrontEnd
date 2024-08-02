import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginRequest } from '../../models/login-request';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: any = {};
  isLoginFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router ,private toastr: ToastrService) { }

  onSubmit(): void {
    const loginRequest: LoginRequest = {
      email: this.form.email,
      password: this.form.password
    };

    this.authService.login(loginRequest).subscribe(
      data => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('roles', JSON.stringify(data.roles)); // Store roles as a JSON string

        this.isLoginFailed = false;
        this.toastr.success('Login Successful');

        if (data.roles.includes('ADMIN')) { 
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.toastr.error('Incorrect Email or Password!');
      }
    );
  }
  navigateToRegister() {
    this.router.navigate(['/register']);
}
}
