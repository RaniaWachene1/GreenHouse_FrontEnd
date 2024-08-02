import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserProfileDialogComponent } from '../../user-profile-dialog/user-profile-dialog.component';
import { User } from '../../../models/User';
import { AddCompanyInfoDialogComponent } from '../../add-company-info-dialog/add-company-info-dialog.component';
import { EmissionService } from '../../../services/emission.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-footprint-analytics',
  templateUrl: './footprint-analytics.component.html',
  styleUrl: './footprint-analytics.component.css'
})
export class FootprintAnalyticsComponent implements OnInit {
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
  totalFootprint: number | null = null;
  scope1Total: number | null = null;
  scope2Total: number | null = null;
  scope3Total: number | null = null;


  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router,
    private footprintService:  EmissionService 


  ) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      if (user) {
        this.updateUserInfo(user);
        if (user.idUser !== undefined) {
          this.fetchTotalFootprint(user.idUser);
        }

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
  fetchTotalFootprint(userId: number): void {
    this.footprintService.getTotalFootprintForUser(userId).subscribe(
      (data) => {
        this.totalFootprint = data.totalFootprint;
        this.scope1Total = data.scope1Total;
        this.scope2Total = data.scope2Total;
        this.scope3Total = data.scope3Total;
        this.createChart();
      },
      (error) => {
        console.error('Error fetching total footprint data', error);
      }
    );
  }

  createChart(): void {
    const ctx = document.getElementById('footprintChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Scope 1', 'Scope 2', 'Scope 3'],
        datasets: [{
          label: 'CO2 Emissions (tCO2e)',
          data: [this.scope1Total, this.scope2Total, this.scope3Total],
          backgroundColor: [
            'rgba(29, 53, 87, 0.2)',    // Dark Blue #1d3557
            'rgba(241, 250, 238, 0.2)', // Light Beige #f1faee
            'rgba(224, 122, 95, 0.2)'   // Muted Orange #e07a5f
        ],
        borderColor: [
            'rgba(29, 53, 87, 1)',      // Dark Blue #1d3557
            'rgba(241, 250, 238, 1)',   // Light Beige #f1faee
            'rgba(224, 122, 95, 1)'     // Muted Orange #e07a5f
        ]
,        
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                return tooltipItem.label + ': ' + tooltipItem.raw + ' tCO2e';
              }
            }
          }
        }
      }
    });
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

  openAddCompanyInfoDialog(): void {
    const dialogRef = this.dialog.open(AddCompanyInfoDialogComponent, {
      width: '800px',
      height: '600px',
      panelClass: 'custom-dialog-container',
      disableClose: true
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result && this.currentUser && this.currentUser.idUser !== undefined) {
        this.authService.completeProfile(this.currentUser.idUser, result).subscribe(
          updatedUser => {
            this.authService.updateCurrentUser(updatedUser);
            this.updateUserInfo(updatedUser);
            console.log('Updated user saved to AuthService:', updatedUser); // Log the updated user
          },
          error => {
            console.error('Error updating profile:', error);
            this.toastr.error('Failed to update profile. Please try again.');
          }
        );
      } else {
        console.error('User ID is undefined or currentUser is null');
      }
    });
  }
  
}
