import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location as CustomLocation } from '../models/location';

@Injectable({
  providedIn: 'root'
})
export class Scope1Service {
  private baseUrl = 'http://localhost:8087/api/locations';

  constructor(private http: HttpClient) { }

  getLocationsByUserId(userId: number): Observable<CustomLocation[]> {
    return this.http.get<CustomLocation[]>(`${this.baseUrl}/user/${userId}`);
  }

  updateLocation(location: CustomLocation): Observable<CustomLocation> {
    return this.http.put<CustomLocation>(`${this.baseUrl}/update/${location.idLocation}`, location);
  }
  addLocation(location: CustomLocation, userId: number): Observable<CustomLocation> {
    
    return this.http.post<CustomLocation>(`${this.baseUrl}/add/${userId}`, location);
  }

  deleteLocation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  getLocationsByUserIdAndUsesNaturalGas(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/${userId}/natural-gas`);
  }
}
