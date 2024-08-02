import { Component, Inject, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Location } from '../../../models/location';
import { ToastrService } from 'ngx-toastr';
import { Scope1Service } from '../../../services/scope1.service';
import { DeleteConfirmDialogComponent } from '../../delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-location-detail-dialog',
  templateUrl: './location-detail-dialog.component.html',
  styleUrls: ['./location-detail-dialog.component.css']
})
export class LocationDetailDialogComponent implements OnInit, AfterViewInit {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  map!: google.maps.Map;
  activeSection: string = 'details'; // Default section

  editing: { [key: string]: boolean } = {};
  editableFields = [
    { key: 'nameLocation', label: 'Name', type: 'text' },
    { key: 'addressLocation', label: 'Address', type: 'text' },
    { key: 'city', label: 'City', type: 'text' },
    { key: 'state', label: 'State', type: 'text' },
    { key: 'zip', label: 'Zip Code', type: 'number' },
    { key: 'country', label: 'Country', type: 'text' },
    { key: 'usesNaturalGas', label: 'Uses Natural Gas', type: 'checkbox' }
  ];

  constructor(
    public dialogRef: MatDialogRef<LocationDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { location: Location },
    private scope1Service: Scope1Service,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {
    this.editableFields.forEach(field => {
      this.editing[field.key] = false;
    });
  }

  ngOnInit() {
    console.log('LocationDetailDialogComponent initialized with location:', this.data.location);
  }

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  initializeMap(): void {
    if (this.data.location.latitude && this.data.location.longitude) {
      const mapOptions: google.maps.MapOptions = {
        center: { lat: this.data.location.latitude, lng: this.data.location.longitude },
        zoom: 15
      };
      this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
      new google.maps.Marker({
        position: { lat: this.data.location.latitude, lng: this.data.location.longitude },
        map: this.map,
        title: this.data.location.nameLocation
      });
    } else {
      console.error('No latitude or longitude provided for the location');
    }
  }

  setActiveSection(section: string): void {
    this.activeSection = section;
  }

  toggleEdit(field: string): void {
    this.editing[field] = !this.editing[field];
    if (!this.editing[field]) {
      this.saveChanges();
    }
  }

  saveChanges(): void {
    const updatedLocation = { ...this.data.location };
    if (updatedLocation.idLocation !== undefined) {
      this.scope1Service.updateLocation(updatedLocation).subscribe(
        (result) => {
          this.toastr.success('Location updated successfully.');
          this.dialogRef.close(updatedLocation); // Pass the updated location back
        },
        (error: any) => {
          console.error('Error updating location:', error);
          this.toastr.error('Error updating location.');
        }
      );
    } else {
      this.toastr.error('Location ID is undefined.');
    }
  }

  confirmDelete(): void {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '400px',
      data: { name: this.data.location.nameLocation }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this.deleteLocation();
      }
    });
  }

  deleteLocation(): void {
    if (this.data.location.idLocation !== undefined) {
      this.scope1Service.deleteLocation(this.data.location.idLocation).subscribe(
        () => {
          this.toastr.success('Location deleted successfully.');
          this.dialogRef.close({ deleted: true });
        },
        (error: any) => {
          console.error('Error deleting location:', error);
          this.toastr.error('Error deleting location.');
        }
      );
    } else {
      this.toastr.error('Location ID is undefined.');
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
