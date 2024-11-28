import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DevolucionesService {
  private apiUrl = 'http://localhost:3000/api/devoluciones'; // Cambia por la URL real de tu backend

  constructor(private http: HttpClient) {}

  // Registrar una devolución
  registrarDevolucion(datosDevolucion: { id_orden: number, motivo_devolucion: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar-devolucion`, datosDevolucion);
  }

  // Obtener lista de devoluciones
  obtenerDevoluciones(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
}
