import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  email: string = '';
  code: string = '';
  isVerified = false;
  isVerificationFailed = false;
  errorMessage = '';

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
    });
  }

  onSubmit(): void {
    this.authService.verifyCode(this.email, this.code).subscribe({
      next: data => {
        console.log(data);
        this.isVerified = true;
        this.isVerificationFailed = false;
        this.router.navigate(['/login']);
      },
      error: err => {
        console.log(err); // Log the error for debugging purposes
        this.errorMessage = err.error.message;
        this.isVerificationFailed = true;
      }
    });
  }
}
