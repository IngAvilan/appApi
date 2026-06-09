import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

import { AppRoutingModule } from './app/app-routing.module'; // <-- Cambiado al sistema de módulos real de tu app
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular({ mode: 'md' }),
    importProvidersFrom(AppRoutingModule), // <-- Importa tu mapa de rutas clásico correctamente
    provideHttpClient()
  ],
});