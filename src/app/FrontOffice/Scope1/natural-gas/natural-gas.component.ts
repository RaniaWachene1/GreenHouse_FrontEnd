import { Component, OnInit } from '@angular/core';
import { Scope1Service } from '../../../services/scope1.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth.service';
import { Location } from '../../../models/location'; // Adjust the path as necessary
import { EmissionService } from '../../../services/emission.service';
import { NaturalGasModalComponent } from '../natural-gas-modal/natural-gas-modal.component';

@Component({
  selector: 'app-natural-gas',
  templateUrl: './natural-gas.component.html',
  styleUrls: ['./natural-gas.component.css'] // Corrected from styleUrl to styleUrls
})
export class NaturalGasComponent implements OnInit {
  locations: Location[] = [];
  searchText = '';
  userId: number | undefined;

  constructor(
    private scope1Service: Scope1Service,
    public dialog: MatDialog,
    private authService: AuthService,
    private emissionService: EmissionService
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
      this.scope1Service.getLocationsByUserIdAndUsesNaturalGas(this.userId).subscribe(locations => {
        this.locations = locations;
      });
    }
  }

  openDialog(locationId: number): void {
    const dialogRef = this.dialog.open(NaturalGasModalComponent, {
      width: '800px',
      height: '300px',
      data: { locationId: locationId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.calculateEmissionsCO2FromNaturalGas(locationId, result);
      }
    });
  }

  calculateEmissionsCO2FromNaturalGas(id: number, naturalGasConsumption: number): void {
    if (id === 0) return; // Skip if id is 0 (fallback value)
    this.emissionService.calculateEmissionsCO2FromNaturalGas(id, naturalGasConsumption).subscribe(response => {
      console.log('Emissions calculated', response);
      const location = this.locations.find(loc => loc.idLocation === id);
      if (location) {
        location.co2Emissions = response;
      }
    });
  }
}
