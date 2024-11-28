import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getDevoluciones(): Observable<any> {
    return this.http.get(`${this.apiUrl}/obtener-devoluciones`);
  }

  getEnvios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/envios`);
  }

  getReporteVentas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/reporte-ventas`);
  }
}
