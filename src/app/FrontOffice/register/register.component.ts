import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SignupRequest } from '../../models/signup-request';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  isLoading = false;
  private disallowedDomains = ["gmail.com", "yahoo.com", "hotmail.com", "aol.com", "outlook.com",
    "icloud.com", "mail.com", "gmx.com", "yandex.com", "protonmail.com"];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, this.companyEmailValidator.bind(this)]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$') // At least 8 characters, 1 uppercase letter, 1 number, 1 special character
        ]
      ],
      confirmPassword: ['', Validators.required],
      companyName: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }
  companyEmailValidator(control: any) {
    const email = control.value;
    if (email) {
      const domain = email.substring(email.lastIndexOf("@") + 1).toLowerCase();
      if (this.disallowedDomains.includes(domain)) {
        return { 'companyEmail': true };
      }
    }
    return null;
  }
  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  ngOnInit() {
    this.applyValidationStyles();
  }

  applyValidationStyles() {
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach((form: any) => {
      form.addEventListener('submit', (event: Event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      });
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.toastr.error('Please fill out the form correctly.');
      return;
    }
    this.isLoading = true;
  
    const signupRequest: SignupRequest = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      companyName: this.registerForm.value.companyName,
    };
  
    this.authService.register(signupRequest).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.toastr.success('Register Successful');
        this.isLoading = false;
        this.router.navigate(['/verify-email'], { queryParams: { email: signupRequest.email } });
      },
      (error: HttpErrorResponse) => {
        console.error('Registration failed:', error);
        this.isLoading = false;
        if (error.status === 400 && error.error && error.error.message) {
          if (error.error.message === 'Error: Email is already in use!') {
            this.toastr.error('Email already exists. Please use a different email.');
          } else {
            this.toastr.error('Registration failed. Please try again later.');
          }
        } else {
          this.toastr.error('Registration failed. Please try again later.');
        }
      }
    );
  }
  navigateToLogin() {
    this.router.navigate(['/login']);
}
}
