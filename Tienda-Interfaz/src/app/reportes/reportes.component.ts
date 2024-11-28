import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../services/reportes.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';   

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ReportesComponent implements OnInit {
  devoluciones: any[] = [];
  envios: any[] = [];
  reporteVentas: any[] = [];
  errorMessage: string = '';

  constructor(private reportesService: ReportesService) {}

  ngOnInit(): void {
    this.fetchDevoluciones();
    this.fetchEnvios();
    this.getReporteVentas();
  }

  fetchDevoluciones(): void {
    this.reportesService.getDevoluciones().subscribe({
      next: (data) => (this.devoluciones = data.devoluciones),
      error: (err) => console.error('Error al obtener devoluciones:', err),
    });
  }

  fetchEnvios(): void {
    this.reportesService.getEnvios().subscribe({
      next: (data) => (this.envios = data.envios),
      error: (err) => console.error('Error al obtener envíos:', err),
    });
  }

  fetchReporteVentas(): void {
    this.reportesService.getReporteVentas().subscribe({
      next: (data) => (this.reporteVentas = data.reporte),
      error: (err) => console.error('Error al obtener reporte de ventas:', err),
    });
  }
  getReporteVentas(): void {
    this.reportesService.getReporteVentas().subscribe(
      data => {
        this.reporteVentas = data.reporte;  // Asumiendo que el API responde con un campo 'reporte'
      },
      error => {
        this.errorMessage = 'Error al obtener reporte de ventas: ' + error.message;
      }
    );
  }
}
