import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-electricity-usage-add',
  templateUrl: './electricity-usage-add.component.html',
  styleUrl: './electricity-usage-add.component.css'
})
export class ElectricityUsageAddComponent {
  naturalGasConsumption: number | undefined;

  constructor(
    public dialogRef: MatDialogRef<ElectricityUsageAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close(this.naturalGasConsumption);
  }
}

