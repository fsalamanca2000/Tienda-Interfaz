import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ReportesComponent } from './reportes/reportes.component';
import { InventarioComponent } from './inventario/inventario.component';
import { OrdenesComponent } from './ordenes/ordenes.component';

export const routes: Routes = [
    { path: '', component: AdminComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'reportes', component: ReportesComponent },
    { path: 'inventario', component: InventarioComponent },
    { path: 'ordenes', component: OrdenesComponent },
];
