import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {
  private apiUrl = 'http://localhost:3000/api/ordenes'; // Cambia por la URL real de tu backend

  constructor(private http: HttpClient) {}

  // Crear una nueva orden
  crearOrden(orden: {
    fecha_orden: string;
    total: number;
    id_cliente: number;
    detalles: { id_producto: number; cantidad: number; precio_unitario: number }[];
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}`, orden);
  }

  // Obtener todas las órdenes
  obtenerOrdenes(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
}
