import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';  // Asegúrate de importar RouterModule
import { provideHttpClient } from '@angular/common/http';  
import { routes } from './app.routes'; 

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),  
    RouterModule  
  ]
};
