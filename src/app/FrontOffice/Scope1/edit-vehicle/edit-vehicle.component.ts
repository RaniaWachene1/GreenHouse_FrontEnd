import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VehicleService } from '../../../services/vehicle.service';
import { Vehicle } from '../../../models/vehicle.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.css']
})
export class EditVehicleComponent implements OnInit {
  vehicle: Vehicle;
  selectedCategory: string | undefined;
  years: number[] = [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015];
  makes: string[] = ['Honda', 'Toyota', 'Ford', 'BMW', 'Audi', 'Mercedes', 'Volkswagen', 'Nissan', 'Chevrolet', 'Hyundai'];
  models: string[] = [
    'Accord', 'Civic', 'Camry', 'Corolla', 'Mustang', 'F-150', '3 Series', 'A4', 'C-Class', 'E-Class',
    'Golf', 'Jetta', 'Altima', 'Sentra', 'Malibu', 'Impala', 'Elantra', 'Sonata', 'Santa Fe'
  ];

  constructor(
    public dialogRef: MatDialogRef<EditVehicleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { vehicle: Vehicle },
    private vehicleService: VehicleService,
    private toastr: ToastrService
  ) {
    this.vehicle = { ...data.vehicle };
    this.selectedCategory = this.getCategory(this.vehicle);
  }

  ngOnInit(): void {}

  getCategory(vehicle: Vehicle): string | undefined {
    if (vehicle.carType) return 'car';
    if (vehicle.hgvType) return 'hgv';
    if (vehicle.motorbikeType) return 'motorbike';
    if (vehicle.vanType) return 'van';
    return undefined;
  }

  saveChanges(): void {
    this.vehicleService.updateVehicle(this.vehicle, this.vehicle.idVehicle!).subscribe(
      (result) => {
        this.toastr.success('Vehicle updated successfully.');
        this.dialogRef.close(result);
      },
      (error: any) => {
        console.error('Error updating vehicle:', error);
        this.toastr.error('Error updating vehicle.');
      }
    );
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
