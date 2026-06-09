import { Component, OnInit } from '@angular/core';
import { PorscheService, PorscheCarro } from '../services/api';

export interface CarroConFlip extends PorscheCarro {
  flipped: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  carros: CarroConFlip[] = [];
  cargando = true;

  constructor(private porscheService: PorscheService) {}

  ngOnInit() {
    this.porscheService.getCarros().subscribe({
      next: (data) => {
        this.carros = data.map(c => ({ ...c, flipped: false }));
        this.cargando = false;
      },
      error: () => { this.cargando = false; }
    });
  }

  toggleFlip(carro: CarroConFlip) {
    carro.flipped = !carro.flipped;
  }

  getTransmision(t: string): string {
    return this.porscheService.getTransmision(t);
  }

  getTraccion(d: string): string {
    return this.porscheService.getTraccion(d);
  }

  getTraccionCorta(d: string): string {
    const map: { [key: string]: string } = { awd: 'AWD', rwd: 'RWD', fwd: 'FWD' };
    return map[d] ?? d.toUpperCase();
  }

  getFuelLabel(ft: string): string {
    if (ft === 'electricity') return '⚡ Eléctrico';
    if (ft === 'gas/electric') return '🔋 Híbrido';
    return '⛽ Gasolina';
  }

  onImgError(event: Event, modelo: string) {
    const img = event.target as HTMLImageElement;
    if (img.dataset['fallback'] === '1') { img.style.display = 'none'; return; }
    img.dataset['fallback'] = '1';
    img.src = `https://placehold.co/800x500/0a0a0a/c8a96e?text=PORSCHE+${modelo.toUpperCase()}`;
  }

  getNombreModelo(modelo: string): string {
    return 'Porsche ' + modelo.charAt(0).toUpperCase() + modelo.slice(1);
  }
}
