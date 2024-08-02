import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/User';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile-dialog',
  templateUrl: './user-profile-dialog.component.html',
  styleUrls: ['./user-profile-dialog.component.css']
})
export class UserProfileDialogComponent implements OnInit {
  users: User[] = [];
  activeSection: string = 'account'; // Default section

  editUserForm: FormGroup;
  editing: { [key: string]: boolean } = {
    firstName: false,
    lastName: false,
    email: false,
    companyName: false,
    revenue: false,
    headquarters: false,
    currency: false,
    sector: false,
    industry: false
  };

  constructor(
    public dialogRef: MatDialogRef<UserProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.editUserForm = this.formBuilder.group({
      firstName: [data.user.firstName, Validators.required],
      lastName: [data.user.lastName, Validators.required],
      email: [data.user.email, [Validators.required, Validators.email]],
      companyName: [data.user.companyName, Validators.required],
      revenue: [data.user.revenue],
      headquarters: [data.user.headquarters],
      currency: [data.user.currency],
      sector: [data.user.sector],
      industry: [data.user.industry]
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

  loadUsers(): void {
    this.authService.getAllUsers().subscribe(
      (users: User[]) => {
        this.users = users;
      },
      error => {
        console.error('Error loading users:', error);
      }
    );
  }

  setActiveSection(section: string): void {
    this.activeSection = section;
  }

  toggleEdit(field: keyof User): void {
    this.editing[field] = !this.editing[field];
    if (!this.editing[field]) {
      this.saveChanges(field);
    }
  }

  saveChanges(field: keyof User): void {
    const updatedUser = { ...this.data.user };
    if (updatedUser.idUser !== undefined) {
      this.authService.updateUser(updatedUser.idUser, updatedUser).subscribe(
        () => {
          this.toastr.success('User updated successfully.');
          console.log('Received user data:', this.data.user);
          this.loadUsers();
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

  ngOnInit() {
    console.log('UserProfileDialogComponent initialized with user:', this.data.user);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
