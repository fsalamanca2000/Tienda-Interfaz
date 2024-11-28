import { Component } from '@angular/core';
import { PagosService } from '../services/pagos.service';
import { OrdenesService } from '../services/ordenes.service';
import { DevolucionesService } from '../services/devoluciones.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-interfaz-cliente',
  templateUrl: './interfaz-cliente.component.html',
  styleUrls: ['./interfaz-cliente.component.css'],
  imports: [CommonModule]
})
export class InterfazClienteComponent {
  // Variables para manejar datos de los servicios
  pagos: any[] = []; // Lista de pagos
  ordenes: any[] = []; // Lista de órdenes
  devoluciones: any[] = []; // Lista de devoluciones
  mensaje: string = ''; // Mensaje de estado o error

  constructor(
    private pagosService: PagosService,
    private ordenService: OrdenesService,
    private devolucionesService: DevolucionesService
  ) {}

  // Métodos para interactuar con los servicios

  // PAGOS
  obtenerPagos() {
    this.pagosService.obtenerPagos().subscribe(
      (data) => {
        this.pagos = data.pagos;
      },
      (error) => {
        this.mensaje = 'Error al obtener pagos: ' + error.message;
        console.error(error);
      }
    );
  }

  procesarPago(nuevoPago: any) {
    this.pagosService.procesarPago(nuevoPago).subscribe(
      (response) => {
        this.mensaje = 'Pago procesado con éxito: ' + response.id_pago;
        this.obtenerPagos(); // Refresca la lista de pagos
      },
      (error) => {
        this.mensaje = 'Error al procesar el pago: ' + error.message;
        console.error(error);
      }
    );
  }

  // ÓRDENES
  obtenerOrdenes() {
    this.ordenService.obtenerOrdenes().subscribe(
      (data) => {
        this.ordenes = data.ordenes;
      },
      (error) => {
        this.mensaje = 'Error al obtener órdenes: ' + error.message;
        console.error(error);
      }
    );
  }

  crearOrden(nuevaOrden: any) {
    this.ordenService.crearOrden(nuevaOrden).subscribe(
      (response) => {
        this.mensaje = 'Orden creada con éxito: ' + response.ordenId;
        this.obtenerOrdenes(); // Refresca la lista de órdenes
      },
      (error) => {
        this.mensaje = 'Error al crear la orden: ' + error.message;
        console.error(error);
      }
    );
  }

  // DEVOLUCIONES
  obtenerDevoluciones() {
    this.devolucionesService.obtenerDevoluciones().subscribe(
      (data) => {
        this.devoluciones = data.devoluciones;
      },
      (error) => {
        this.mensaje = 'Error al obtener devoluciones: ' + error.message;
        console.error(error);
      }
    );
  }

  crearDevolucion(nuevaDevolucion: any) {
    this.devolucionesService.registrarDevolucion(nuevaDevolucion).subscribe(
      (response) => {
        this.mensaje = 'Devolución creada con éxito: ' + response.id_devolucion;
        this.obtenerDevoluciones(); // Refresca la lista de devoluciones
      },
      (error) => {
        this.mensaje = 'Error al crear la devolución: ' + error.message;
        console.error(error);
      }
    );
  }
  vistaActiva: string = 'pagos';

  // Métodos para cambiar la vista
  mostrarPagos() {
    this.vistaActiva = 'pagos';
  }

  mostrarDevoluciones() {
    this.vistaActiva = 'devoluciones';
  }
  precioUnitario: number = 1500000; // Precio unitario del televisor
  totalGeneral: number = this.precioUnitario; // Total inicial con cantidad 1

  // Función para actualizar el total cuando se cambia la cantidad
  actualizarTotal(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      const cantidad = inputElement.valueAsNumber;
      if (!isNaN(cantidad) && cantidad >= 1) {
        this.totalGeneral = this.precioUnitario * cantidad;
      }
    }
  }
}