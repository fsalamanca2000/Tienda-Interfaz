import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {
  private baseUrl = 'http://localhost:3000/api'; // Cambia al URL de tu backend

  constructor(private http: HttpClient) {}

  // Obtener todas las órdenes
  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/orders`);
  }

  // Obtener historial de una orden por id
  getOrderHistory(id_orden: number): Observable<{ historial: any[] }> {
    return this.http.get<{ historial: any[] }>(`${this.baseUrl}/historial-orden/${id_orden}`);
  }
  
  createShipment(envioData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/envios`, envioData);
  }
  
  // Crear o actualizar envío
  createOrUpdateShipment(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/envios`, data);
  }
}
