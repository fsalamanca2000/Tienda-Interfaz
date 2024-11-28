import { Component, OnInit } from '@angular/core';
import { OrdenesService } from '../services/ordenes.service';
import { formatDate } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.css'],
  imports: [CommonModule, FormsModule]
})
export class OrdenesComponent implements OnInit {
  orders: any[] = [];
  orderHistory: any[] = [];
  searchOrderId: number | null = null;
  today: string;
  deliveryDate: string;

  constructor(private ordenesService: OrdenesService) {
    this.today = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    this.deliveryDate = formatDate(new Date(new Date().setDate(new Date().getDate() + 3)), 'yyyy-MM-dd', 'en-US');
  }

  ngOnInit(): void {
    this.loadOrders();
  }

  // Cargar todas las órdenes
  loadOrders(): void {
    this.ordenesService.getOrders().subscribe({
      next: (data) => (this.orders = data),
      error: (error) => console.error('Error al cargar órdenes', error)
    });
  }

  // Buscar historial de una orden
  searchOrderHistory(): void {
    if (this.searchOrderId) {
      this.ordenesService.getOrderHistory(this.searchOrderId).subscribe({
        next: (data) => {
          console.log('Historial recibido:', data); // Asegúrate de que muestra datos
          this.orderHistory = data.historial; // Asignación correcta al array 'orderHistory'
        },
        error: (error) => {
          console.error('Error al cargar historial', error);
          this.orderHistory = []; // Vacía la tabla si ocurre un error
        }
      });
    }
  }
  
  
  sendOrder(orderId: number): void {
    const envioData = {
      id_orden: orderId,
      estado_envio: 'Enviado',
      fecha_envio: new Date().toISOString().split('T')[0], // Fecha actual en formato YYYY-MM-DD
      fecha_entrega: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 3 días después
    };
  
    this.ordenesService.createShipment(envioData).subscribe({
      next: (response) => {
        console.log(response.message); // Mostrar mensaje de éxito
  
        // Eliminar la orden de la lista de manera local
        this.orders = this.orders.filter(order => order.id_orden !== orderId);
      },
      error: (error) => {
        console.error('Error al realizar el envío:', error);
      }
    });
  }
  

  // Crear o actualizar un envío
  createShipment(order: any): void {
    const shipmentData = {
      id_orden: order.id_orden,
      estado_envio: 'Enviado',
      fecha_envio: this.today,
      fecha_entrega: this.deliveryDate
    };
  
    console.log('Datos enviados al backend:', shipmentData); // Verifica qué se envía
  
    this.ordenesService.createOrUpdateShipment(shipmentData).subscribe({
      next: (response) => alert(response.message),
      error: (error) => console.error('Error al procesar el envío', error)
    });
  }
  
}
