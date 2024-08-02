import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmissionService {

  private baseUrl = 'http://localhost:8087/api/emissions';

  constructor(private http: HttpClient) { }

  calculateScope1Emissions(locationId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/calculate/scope1/${locationId}`, {});
  }

  calculateEmissionsCO2FromNaturalGas(id: number, naturalGasConsumption: number): Observable<any> {
    const params = new HttpParams().set('naturalGasConsumption', naturalGasConsumption.toString());
    return this.http.post(`${this.baseUrl}/${id}/calculate`, {}, { params });
  }
  calculateEmissionsCO2FromElectricity(id: number, electricityConsumption: number): Observable<any> {
    const params = new HttpParams().set('electricityConsumption', electricityConsumption.toString());
    return this.http.post(`${this.baseUrl}/${id}/calculate-electricity`, {}, { params });
  }


  getTotalFootprintForUser(userId: number): Observable<{ scope1Total: number, scope2Total: number, scope3Total: number, totalFootprint: number }> {
    return this.http.get<{ scope1Total: number, scope2Total: number, scope3Total: number, totalFootprint: number }>(`${this.baseUrl}/total-footprint/${userId}`);
  }
  saveEmission(locationId: number, co2Emissions: number, emissionSource: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/save`, { locationId, co2Emissions, emissionSource });
  }
}
