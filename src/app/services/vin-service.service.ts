import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VinServiceService {

  private apiUrl = 'https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVINValuesBatch/';

  constructor(private http: HttpClient) { }

  decodeVin(vin: string): Observable<any> {
    const params = {
      format: 'json',
      data: vin
    };
    return this.http.get(this.apiUrl, { params });
  }
}
