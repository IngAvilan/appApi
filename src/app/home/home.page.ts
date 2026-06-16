import { Component, OnInit } from '@angular/core';
import { PorscheService, PorscheCarro } from '../services/api';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  carros: PorscheCarro[] = [];
  cargando = true;
  modalAbierto = false;
  carroSeleccionado: PorscheCarro | null = null;

  constructor(private porscheService: PorscheService) {}

  ngOnInit() {
    this.porscheService.getCarros().subscribe({
      next: (data) => { this.carros = data; this.cargando = false; },
      error: () => { this.cargando = false; }
    });
  }

  abrirFichaTecnica(carro: PorscheCarro) {
    this.carroSeleccionado = carro;
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
    this.carroSeleccionado = null;
  }

  getTransmision(t: string): string { return this.porscheService.getTransmision(t); }
  getTraccion(d: string): string    { return this.porscheService.getTraccion(d); }

  getFuelLabel(ft: string): string {
    if (ft === 'electricity') return '⚡ Eléctrico';
    if (ft === 'gas/electric') return '🔋 Híbrido';
    return '⛽ Gasolina';
  }

  onImgError(event: Event, modelo: string) {
    const img = event.target as HTMLImageElement;
    if (img.dataset['fallback'] === '1') return;
    img.dataset['fallback'] = '1';
    img.src = `https://placehold.co/800x500/0a0a0a/c8a96e?text=PORSCHE`;
  }

  getNombreModelo(modelo: string): string {
    return 'Porsche ' + modelo.charAt(0).toUpperCase() + modelo.slice(1);
  }
}
