import { Component, OnInit } from '@angular/core';
import { Scope1Service } from '../../../services/scope1.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth.service';
import { Location, EmissionSource } from '../../../models/location'; // Adjust the path as necessary
import { EmissionService } from '../../../services/emission.service';
import { ElectricityUsageAddComponent } from '../electricity-usage-add/electricity-usage-add.component';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-electricity-usage',
  templateUrl: './electricity-usage.component.html',
  styleUrls: ['./electricity-usage.component.css']
})
export class ElectricityUsageComponent implements OnInit {
  locations: Location[] = [];
  searchText = '';
  userId: number | undefined;

  constructor(
    private scope1Service: Scope1Service,
    public dialog: MatDialog,
    private authService: AuthService,
    private emissionService: EmissionService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      if (user) {
        this.userId = user.idUser;
        this.loadUserLocations();
      }
    });
  }

  loadUserLocations(): void {
    if (this.userId) {
      this.scope1Service.getLocationsByUserId(this.userId).subscribe(locations => {
        this.locations = locations;
      });
    }
  }

  openDialog(locationId: number): void {
    const dialogRef = this.dialog.open(ElectricityUsageAddComponent, {
      width: '800px',
      height: '300px',
      data: { locationId: locationId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.calculateEmissionsCO2FromElectricity(locationId, result);
      }
    });
  }

  calculateEmissionsCO2FromElectricity(id: number, electricityConsumption: number): void {
    if (id === 0) return; // Skip if id is 0 (fallback value)
    this.emissionService.calculateEmissionsCO2FromElectricity(id, electricityConsumption).subscribe(response => {
      console.log('Emissions calculated', response);
      const location = this.locations.find(loc => loc.idLocation === id);
      if (location) {
        location.co2Emissions = response;
        location.emissionSource = EmissionSource.ELECTRICITY; // Ensure this is set correctly
      }
    });
  }
}
