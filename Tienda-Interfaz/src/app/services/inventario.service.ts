import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private apiUrl = 'http://localhost:3000/api'; // URL base de la API

  constructor(private http: HttpClient) { }

  // Obtener productos
  getProductos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/productos`);
  }

  // Obtener categorías
  getCategorias(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/obtener-categoria`);
  }

  // Obtener proveedores
  getProveedores(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/proveedores`);
  }

  // Crear producto
  createProducto(producto: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/crear-producto-inventario`, producto);
  }

  // Crear categoría
  createCategoria(categoria: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/crear-categoria`, categoria);
  }

  // Crear proveedor
  createProveedor(proveedor: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/agregar-proveedor`, proveedor);
  }
}
