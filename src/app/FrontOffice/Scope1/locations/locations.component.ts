import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AddLocationDialogComponent } from '../add-location-dialog/add-location-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Scope1Service } from '../../../services/scope1.service';
import { AuthService } from '../../../services/auth.service';
import { Location } from '../../../models/location';
import { LocationDetailDialogComponent } from '../location-detail-dialog/location-detail-dialog.component';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit, AfterViewInit {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  map!: google.maps.Map;
  center: google.maps.LatLngLiteral = { lat: 36.8456, lng: 10.1987 }; // Default center
  zoom = 15; // Default zoom level
  locations: Location[] = [];
  searchText = '';
  userId: number | undefined;

  constructor(
    private scope1Service: Scope1Service,
    public dialog: MatDialog,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      if (user) {
        this.userId = user.idUser;
        this.loadUserLocations();
      }
    });
  }

  ngAfterViewInit(): void {
    const mapOptions: google.maps.MapOptions = {
      center: this.center,
      zoom: this.zoom
    };
    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
  }

  loadUserLocations(): void {
    if (this.userId) {
      this.scope1Service.getLocationsByUserId(this.userId).subscribe(locations => {
        this.locations = locations;
        this.addMarkersToMap();
      });
    }
  }

  addMarkersToMap(): void {
    this.locations.forEach(location => {
      const marker = new google.maps.Marker({
        position: { lat: location.latitude!, lng: location.longitude! },
        map: this.map,
        title: location.nameLocation
      });
    });
  }

  addLocation(): void {
    const dialogRef = this.dialog.open(AddLocationDialogComponent, {
      width: '800px',
      height: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.userId !== undefined) {
        this.scope1Service.addLocation(result, this.userId).subscribe(
          (newLocation: Location) => {
            this.locations.push(newLocation);
            this.addMarkerToMap(newLocation);
          },
          error => {
            console.error('Error adding location:', error);
          }
        );
      }
    });
  }

  addMarkerToMap(location: Location): void {
    const marker = new google.maps.Marker({
      position: { lat: location.latitude!, lng: location.longitude! },
      map: this.map,
      title: location.nameLocation
    });
    this.map.setCenter(marker.getPosition() as google.maps.LatLng);
    this.map.setZoom(18); // Set zoom level explicitly here if needed
  }

  zoomToLocation(location: Location): void {
    this.map.setCenter({ lat: location.latitude!, lng: location.longitude! });
    this.map.setZoom(18); // Set zoom level when icon is clicked
  }

  openLocationDetails(location: Location): void {
    const dialogRef = this.dialog.open(LocationDetailDialogComponent, {
      width: '800px',
      height: '600px',
      data: { location }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.deleted) {
        this.locations = this.locations.filter(loc => loc.idLocation !== location.idLocation);
      } else if (result) {
        const index = this.locations.findIndex(loc => loc.idLocation === result.idLocation);
        if (index !== -1) {
          this.locations[index] = result;
        }
      }
      this.addMarkersToMap();
    });
  }

  continue(): void {
    // Logic to continue to the next step
  }
}
