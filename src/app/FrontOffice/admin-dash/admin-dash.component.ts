import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import { CreateUserDialogComponent } from './create-user-dialog/create-user-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrl: './admin-dash.component.css'
})
export class AdminDashComponent implements OnInit {
  users: User[] = [];
  firstName: string | undefined;
  lastName: string | undefined;
  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private toastr: ToastrService,
     private router: Router

  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.authService.getAllUsers().subscribe(
      data => {
        this.users = data;
        console.log(data);
      },
      error => {
        console.error('Error fetching users:', error);
        this.toastr.error('Error fetching users.');
      }
    );
  }
  openCreateUserDialog(): void {
    const dialogRef = this.dialog.open(CreateUserDialogComponent, {
      width: '800px',
      height: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers();
      }
    });
  }

  editUser(user: User): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '800px',
       height: '600px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers();
      }
    });
  }
  deleteUser(idUser: number | undefined): void {
    if (typeof idUser !== 'number') {
      this.toastr.error('Invalid user ID.');
      return;
    }

    if (confirm('Are you sure you want to delete this user?')) {
      this.authService.deleteUser(idUser).subscribe(
        () => {
          this.toastr.success('User deleted successfully.');
          this.loadUsers();
        },
        error => {
          console.error('Error deleting user:', error);
          this.toastr.error('Error deleting user.');
        }
      );
    }
  }
  logout(): void {
    this.authService.logout();
  }
}