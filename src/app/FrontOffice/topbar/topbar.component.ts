import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserProfileDialogComponent } from '../user-profile-dialog/user-profile-dialog.component';
import { User } from '../../models/User';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent  implements OnInit {
  users: User[] = [];
  firstName: string = '';
  lastName: string = '';
  companyName: string = '';
  sector: string = '';
  industry: string = '';
  revenue!: number;
  headquarters: string = '';
  currency: string = '';
  currentUser: User | null = null;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      if (user) {
        this.updateUserInfo(user);
      }
    });

    this.loadUsers();
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

  updateUserInfo(user: User): void {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.companyName = user.companyName;
    this.sector = user.sector;
    this.industry = user.industry;
    this.revenue = user.revenue;
    this.headquarters = user.headquarters;
    this.currency = user.currency;
    this.currentUser = user;
  }

  openProfileDialog(): void {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      const dialogRef = this.dialog.open(UserProfileDialogComponent, {
        width: '800px',
        height: '600px',
        data: { user: currentUser }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.authService.updateCurrentUser(result);
          this.updateUserInfo(result);
        }
      });
    }
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


  
}

