import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth.service';
import { VehicleService } from '../../../services/vehicle.service';
import { Vehicle } from '../../../models/vehicle.model';
import { VehiclesAddComponent } from '../vehicles-add/vehicles-add.component';
import { EditVehicleComponent } from '../edit-vehicle/edit-vehicle.component';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  vehicles: Vehicle[] = [];
  searchText = '';
  userId: number | undefined;

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private vehicleService: VehicleService
  ) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      if (user) {
        this.userId = user.idUser;
        this.loadUserVehicles();
      }
    });
  }

  loadUserVehicles(): void {
    if (this.userId) {
      this.vehicleService.getVehiclesByUserId(this.userId).subscribe(vehicles => {
        this.vehicles = vehicles;
      });
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(VehiclesAddComponent, {
      width: '800px',
      height: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUserVehicles(); // Reload vehicles after adding a new one
      }
      console.log('The dialog was closed');
    });
  }

  getVehicleIcon(vehicle: Vehicle): string {
    if (vehicle.carType) {
      return 'fas fa-car'; // Font Awesome car icon
    } else if (vehicle.hgvType) {
      return 'fas fa-truck'; // Font Awesome truck icon
    } else if (vehicle.motorbikeType) {
      return 'fas fa-motorcycle'; // Font Awesome motorcycle icon
    } else if (vehicle.vanType) {
      return 'fas fa-shuttle-van'; // Font Awesome van icon
    } else {
      return 'fas fa-car-side'; // Default Font Awesome car icon
    }
  }
  openEditDialog(vehicle: Vehicle): void {
    const dialogRef = this.dialog.open(EditVehicleComponent, {
      width: '800px',
      height: '600px',
      data: { vehicle }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.vehicles.findIndex(v => v.idVehicle === result.idVehicle);
        if (index !== -1) {
          this.vehicles[index] = result;
        }
      }
    });
  }
}
