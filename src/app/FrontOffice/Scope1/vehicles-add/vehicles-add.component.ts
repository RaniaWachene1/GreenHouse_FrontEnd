import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpParams } from '@angular/common/http';
import { VehicleService } from '../../../services/vehicle.service';
import { Vehicle } from '../../../models/vehicle.model';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/User'; // Import User model

@Component({
  selector: 'app-vehicles-add',
  templateUrl: './vehicles-add.component.html',
  styleUrls: ['./vehicles-add.component.css']
})
export class VehiclesAddComponent implements OnInit {
  selectedCategory: string | undefined;
  vin: string = '';
  userId: number | undefined;
  years: number[] = [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015];
  makes: string[] = ['Honda', 'Toyota', 'Ford', 'BMW', 'Audi', 'Mercedes', 'Volkswagen', 'Nissan', 'Chevrolet', 'Hyundai'];
  models: string[] = [
    'Accord', 'Civic', 'Camry', 'Corolla', 'Mustang', 'F-150', '3 Series', 'A4', 'C-Class', 'E-Class',
    'Golf', 'Jetta', 'Altima', 'Sentra', 'Malibu', 'Impala', 'Elantra', 'Sonata', 'Santa Fe'
  ];

  vehicle: Vehicle = {
    name: '',
    vin: '',
    year: undefined,
    make: '',
    model: '',
    carType: '',
    fuelType: '',
    fuelConsumption: 0,
    co2Emissions: 0,
    emissionSource: 'VEHICLE',
    scope: 'SCOPE_1',
    usageData: '', 
    user: undefined
  };

  constructor(
    public dialogRef: MatDialogRef<VehiclesAddComponent>,
    private http: HttpClient,
    private vehicleService: VehicleService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      if (user) {
        this.userId = user.idUser;
        this.vehicle.user = user; // Assign the user object to the vehicle
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveVehicle(): void {
    if (this.userId) {
      this.vehicleService.addVehicle(this.vehicle, this.userId).subscribe(
        response => {
          console.log('Vehicle saved', response);
          this.dialogRef.close(response);
        },
        error => {
          console.error('Error saving vehicle', error);
        }
      );
    } else {
      console.error('User ID is not available');
    }
  }

  getIconForCategory(category: string): string {
    switch (category) {
      case 'car':
        return 'assets/1.png';
      case 'hgv':
        return 'assets/4.png';
      case 'motorbike':
        return 'assets/2.png';
      case 'van':
        return 'assets/3.png';
      default:
        return '';
    }
  }
}
