import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  forgotForm: any = {};
  showForgotPasswordForm = true;

  constructor(private router: Router, private authService: AuthService, private toastr: ToastrService) {}

  onForgotPassword() {
    if (this.forgotForm.email) {
      this.authService.forgotPassword(this.forgotForm.email).subscribe(
        () => {
          this.toastr.success('Reset link sent to your email.');
          this.showForgotPasswordForm = false; // Hide the form after submitting
        },
        error => {
          console.error('Error sending reset link:', error);
          this.toastr.error('Error sending reset link.');
        }
      );
    }
  }
}