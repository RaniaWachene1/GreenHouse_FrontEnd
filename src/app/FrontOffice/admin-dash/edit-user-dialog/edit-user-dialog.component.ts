import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/User';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent {
  editUserForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.editUserForm = this.formBuilder.group({
      firstName: [data.firstName, Validators.required],
      lastName: [data.lastName, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      companyName: [data.companyName, Validators.required],
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.editUserForm.get(controlName);
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    if (control?.hasError('email')) {
      return 'Invalid email format';
    }
    return '';
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.editUserForm.valid) {
      const updatedUser: User = {
        ...this.data,
        ...this.editUserForm.value
      };

      if (updatedUser.idUser !== undefined) {
        this.authService.updateUser(updatedUser.idUser, updatedUser).subscribe(
          () => {
            this.toastr.success('User updated successfully.');
            this.dialogRef.close(updatedUser);
          },
          error => {
            console.error('Error updating user:', error);
            this.toastr.error('Error updating user.');
          }
        );
      } else {
        this.toastr.error('User ID is undefined.');
      }
    }
  }
  
}
