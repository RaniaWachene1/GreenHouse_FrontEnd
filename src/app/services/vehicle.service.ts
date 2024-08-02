import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = 'http://localhost:8087/api/vehicles';

  constructor(private http: HttpClient) {}

  addVehicle(vehicle: Vehicle, userId: number): Observable<Vehicle> {
    return this.http.post<Vehicle>(`${this.apiUrl}/add/${userId}`, vehicle);
  }

  getVehiclesByUserId(userId: number): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.apiUrl}/user/${userId}`);
  }

  deleteVehicle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateVehicle(vehicle: Vehicle, id: number): Observable<Vehicle> {
    return this.http.put<Vehicle>(`${this.apiUrl}/${id}`, vehicle);
  }

  getAllVehicles(userId: number): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.apiUrl}?userId=${userId}`);
  }
}
