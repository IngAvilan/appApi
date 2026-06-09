import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone'; // <-- Importamos los componentes nativos

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true, // <-- Asegúrate de que diga true
  imports: [IonApp, IonRouterOutlet], // <-- Agregamos los elementos para que el HTML los reconozca
})
export class AppComponent {
  constructor() {}
}