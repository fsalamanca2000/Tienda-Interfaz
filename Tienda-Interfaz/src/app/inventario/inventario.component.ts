import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../services/inventario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';   
@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css'],
  imports: [CommonModule, FormsModule]
})
export class InventarioComponent implements OnInit {

  productos: any[] = [];
  categorias: any[] = [];
  proveedores: any[] = [];
  newProduct = { nombre_producto: '', descripcion: '', precio: 0, id_categoria: null, cantidad: 0, id_proveedor: null };
  newCategory = { nombre_categoria: '' };
  newProvider = { nombre: '', telefono: '', email: '' };

  constructor(private inventarioService: InventarioService) { }

  ngOnInit(): void {
    this.loadProductos();
    this.loadCategorias();
    this.loadProveedores();
  }

  loadProductos() {
    this.inventarioService.getProductos().subscribe(data => {
      this.productos = data.productos;
    });
  }

  loadCategorias() {
    this.inventarioService.getCategorias().subscribe(data => {
      this.categorias = data.categorias;
    });
  }

  loadProveedores() {
    this.inventarioService.getProveedores().subscribe(data => {
      this.proveedores = data.proveedores;
    });
  }

  addProducto() {
    this.inventarioService.createProducto(this.newProduct).subscribe(response => {
      alert('Producto añadido exitosamente');
      this.loadProductos(); // Recargar lista de productos
    }, error => {
      alert('Error al añadir producto');
    });
  }

  addCategoria() {
    this.inventarioService.createCategoria(this.newCategory).subscribe(response => {
      alert('Categoría añadida exitosamente');
      this.loadCategorias(); // Recargar lista de categorías
    }, error => {
      alert('Error al añadir categoría');
    });
  }

  addProveedor() {
    this.inventarioService.createProveedor(this.newProvider).subscribe(response => {
      alert('Proveedor añadido exitosamente');
      this.loadProveedores(); // Recargar lista de proveedores
    }, error => {
      alert('Error al añadir proveedor');
    });
  }
}
