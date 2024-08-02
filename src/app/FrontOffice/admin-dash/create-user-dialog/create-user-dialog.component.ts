import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.css']
})
export class CreateUserDialogComponent {
  createUserForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateUserDialogComponent>,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.createUserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]],
      companyName: ['', Validators.required],
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.createUserForm.get(controlName);
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    if (control?.hasError('email')) {
      return 'Invalid email format';
    }
    if (control?.hasError('minlength')) {
      return 'Password must be at least 8 characters long';
    }
    if (control?.hasError('pattern')) {
      return 'Password must contain at least one uppercase letter, one number, and one special character';
    }
    return '';
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.createUserForm.valid) {
      const newUser = this.createUserForm.value;
      this.authService.register(newUser).subscribe(
        () => {
          this.toastr.success('User created successfully.');
          this.dialogRef.close(newUser);
        },
        error => {
          console.error('Error creating user:', error);
          this.toastr.error('Error creating user.');
        }
      );
    }
  }
}
