import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-vehicle-usage-model',
  templateUrl: './vehicle-usage-model.component.html',
  styleUrl: './vehicle-usage-model.component.css'
})
export class VehicleUsageModelComponent {

  fuelType: string | undefined;
  fuelConsumption: number | undefined;
  units: string[] = ['liters', 'gallons'];

  constructor(
    public dialogRef: MatDialogRef<VehicleUsageModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const result = {
      fuelType: this.fuelType,
      fuelConsumption: this.fuelConsumption
    };
    this.dialogRef.close(result);
  }

}
