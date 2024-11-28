import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagosService {
  private apiUrl = 'http://localhost:3000/api'; // Cambia por la URL real de tu backend

  constructor(private http: HttpClient) {}

  // Procesar un pago
  procesarPago(datosPago: { id_orden: number, monto_pago: number, id_metodo_pago: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/procesar-pago`, datosPago);
  }

  // Obtener la lista de pagos
  obtenerPagos(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
}
