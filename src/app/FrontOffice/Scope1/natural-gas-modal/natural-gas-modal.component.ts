import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-natural-gas-modal',
  templateUrl: './natural-gas-modal.component.html',
  styleUrls: ['./natural-gas-modal.component.css']
})
export class NaturalGasModalComponent {
  naturalGasConsumption: number | undefined;

  constructor(
    public dialogRef: MatDialogRef<NaturalGasModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close(this.naturalGasConsumption);
  }
}
