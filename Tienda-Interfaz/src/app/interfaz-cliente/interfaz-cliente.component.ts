import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagosService } from '../services/pagos.service';
import { OrdenesService } from '../services/ordenes.service';
import { DevolucionesService } from '../services/devoluciones.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-interfaz-cliente',
  standalone: true,
  templateUrl: './interfaz-cliente.component.html',
  styleUrls: ['./interfaz-cliente.component.css'],
  imports: [CommonModule, FormsModule]
})
export class InterfazClienteComponent {
  vistaActiva: string = 'pagos'; // Estado de la vista activa
  totalGeneral: number = 0; // Total a pagar
  formularioVisible: { [key: number]: boolean } = {};
  motivoDevolucion: { [key: number]: string } = {};

  constructor(
    private pagoService: PagosService,
    private ordenesService: OrdenesService,
    private devolucionesService: DevolucionesService
  ) {}

  // Método para cambiar entre vistas
  mostrarPagos() {
    this.vistaActiva = 'pagos';
  }

  mostrarDevoluciones() {
    this.vistaActiva = 'devoluciones';
  }

  // Método para actualizar el total de la compra
  actualizarTotal(event: Event) {
    const input = event.target as HTMLInputElement;
    const cantidad = parseInt(input.value, 10);
    const precioUnitario = 1500000; // Precio del televisor
    this.totalGeneral = cantidad * precioUnitario;
  }

  // Método para procesar el pago
  async procesarPago() {
    const idOrden = 1; // Debes obtener esto desde tu contexto
    const metodoPago = parseInt((document.getElementById('metodoPago') as HTMLSelectElement).value, 10);
  
    const datosPago = {
      id_orden: idOrden,
      monto_pago: this.totalGeneral,
      id_metodo_pago: metodoPago
    };
  
    try {
      const response = await this.pagoService.procesarPago(datosPago).toPromise();
      alert('Pago procesado correctamente');
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      alert('Hubo un error al procesar el pago');
    }
  }
  async manejarDevolucion(ordenId: number) {
    const motivoDevolucion = (document.getElementById(`motivo-devolucion-${ordenId}`) as HTMLTextAreaElement).value;
  
    if (motivoDevolucion.trim() !== '') {
      const datosDevolucion = {
        id_orden: ordenId,
        motivo_devolucion: motivoDevolucion
      };
  
      try {
        const response = await this.devolucionesService.registrarDevolucion(datosDevolucion).toPromise();
        alert('Devolución procesada correctamente');
      } catch (error) {
        console.error('Error al registrar la devolución:', error);
        alert('Hubo un error al registrar la devolución');
      }
    } else {
      alert('Por favor, escribe el motivo de la devolución');
    }
  }
  mostrarFormularioDevolucion(ordenId: number): void {
    this.formularioVisible[ordenId] = true;
  }
}
