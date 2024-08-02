import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-vehicle-usage-model',
  templateUrl: './vehicle-usage-model.component.html',
  styleUrls: ['./vehicle-usage-model.component.css']
})
export class VehicleUsageModelComponent {

  fuelType: string | undefined;
  fuelConsumption: number | undefined;
  uom: string | undefined;
  units: string[] = ['liters', 'gallons'];
  fuelTypes: string[] = ['Diesel Fuel', 'Motor Gasoline', 'Ethanol (100%)'];

  constructor(
    public dialogRef: MatDialogRef<VehicleUsageModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.fuelType = data.vehicle.fuelType;
    this.fuelConsumption = data.vehicle.fuelConsumption;
    this.uom = 'liters'; // Assuming default unit is liters
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (!this.fuelType || !this.fuelConsumption || !this.uom) {
      return; // Add some validation or error handling here if needed
    }

    const result = {
      fuelType: this.fuelType,
      fuelConsumption: this.fuelConsumption,
      uom: this.uom
    };
    this.dialogRef.close(result);
  }
}
