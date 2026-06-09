import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface PorscheCarro {
  city_mpg: number;
  class: string;
  combination_mpg: number;
  cylinders: number;
  displacement: number;
  drive: string;
  fuel_type: string;
  highway_mpg: number;
  make: string;
  model: string;
  transmission: string;
  year: number;
  imagen?: string;
  variant?: string;
}

@Injectable({ providedIn: 'root' })
export class PorscheService {

  private apiUrl = 'https://api.api-ninjas.com/v1/cars';
  private apiKey = 'Tu_API_Key_Aqui';

  private modelMap: { [key: string]: string } = {
    '911': '911', 'cayenne': 'cayenne', 'macan': 'macan',
    'panamera': 'panamera', 'taycan': 'taycan',
    'boxster': '718-boxster', 'cayman': '718-cayman',
  };

  private getImagenUrl(modelo: string, year: number): string {
    const key = modelo.toLowerCase().split(' ')[0];
    const family = this.modelMap[key] ?? key;
    return `https://cdn.imagin.studio/getimage?customer=img&make=porsche&modelFamily=${family}&modelYear=${year}&zoomType=fullscreen&paintId=tcpadb`;
  }

  // ── 50 modelos reales de Porsche ──────────────────────────────
  // Nota: Porsche no fabrica motos ni vehículos de carga pesada.
  // Su catálogo completo abarca deportivos, gran turismo y SUVs.
  // ──────────────────────────────────────────────────────────────
  private catalogo: PorscheCarro[] = [

    // ── DEPORTIVOS 911 (10 entradas) ─────────────────────────────
    { make:'porsche', model:'911', variant:'Carrera',       year:2024, class:'Deportivo',         cylinders:6, displacement:3.0, drive:'rwd', fuel_type:'gas',          transmission:'a', city_mpg:18, combination_mpg:22, highway_mpg:27 },
    { make:'porsche', model:'911', variant:'Carrera S',     year:2024, class:'Deportivo',         cylinders:6, displacement:3.0, drive:'rwd', fuel_type:'gas',          transmission:'a', city_mpg:17, combination_mpg:21, highway_mpg:24 },
    { make:'porsche', model:'911', variant:'Carrera 4S',    year:2023, class:'Deportivo AWD',     cylinders:6, displacement:3.0, drive:'awd', fuel_type:'gas',          transmission:'a', city_mpg:16, combination_mpg:20, highway_mpg:23 },
    { make:'porsche', model:'911', variant:'Targa 4S',      year:2023, class:'Deportivo Targa',   cylinders:6, displacement:3.0, drive:'awd', fuel_type:'gas',          transmission:'a', city_mpg:16, combination_mpg:19, highway_mpg:22 },
    { make:'porsche', model:'911', variant:'Turbo',         year:2024, class:'Deportivo Turbo',   cylinders:6, displacement:3.8, drive:'awd', fuel_type:'gas',          transmission:'a', city_mpg:16, combination_mpg:19, highway_mpg:22 },
    { make:'porsche', model:'911', variant:'Turbo S',       year:2024, class:'Deportivo Turbo',   cylinders:6, displacement:3.8, drive:'awd', fuel_type:'gas',          transmission:'a', city_mpg:15, combination_mpg:18, highway_mpg:21 },
    { make:'porsche', model:'911', variant:'GT3',           year:2023, class:'Deportivo GT',      cylinders:6, displacement:4.0, drive:'rwd', fuel_type:'gas',          transmission:'m', city_mpg:14, combination_mpg:17, highway_mpg:19 },
    { make:'porsche', model:'911', variant:'GT3 RS',        year:2023, class:'Deportivo GT',      cylinders:6, displacement:4.0, drive:'rwd', fuel_type:'gas',          transmission:'a', city_mpg:13, combination_mpg:16, highway_mpg:18 },
    { make:'porsche', model:'911', variant:'GT2 RS',        year:2022, class:'Deportivo GT',      cylinders:6, displacement:3.8, drive:'rwd', fuel_type:'gas',          transmission:'a', city_mpg:13, combination_mpg:16, highway_mpg:18 },
    { make:'porsche', model:'911', variant:'Sport Classic', year:2023, class:'Deportivo Edición', cylinders:6, displacement:3.7, drive:'rwd', fuel_type:'gas',          transmission:'m', city_mpg:16, combination_mpg:19, highway_mpg:22 },

    // ── DEPORTIVOS 718 BOXSTER — descapotable (6 entradas) ──────
    { make:'porsche', model:'boxster', variant:'Base',       year:2024, class:'Roadster',         cylinders:4, displacement:2.0, drive:'rwd', fuel_type:'gas',          transmission:'a', city_mpg:21, combination_mpg:26, highway_mpg:28 },
    { make:'porsche', model:'boxster', variant:'S',          year:2024, class:'Roadster',         cylinders:4, displacement:2.5, drive:'rwd', fuel_type:'gas',          transmission:'a', city_mpg:20, combination_mpg:25, highway_mpg:28 },
    { make:'porsche', model:'boxster', variant:'GTS 4.0',    year:2023, class:'Roadster GTS',     cylinders:6, displacement:4.0, drive:'rwd', fuel_type:'gas',          transmission:'m', city_mpg:17, combination_mpg:21, highway_mpg:24 },
    { make:'porsche', model:'boxster', variant:'Spyder',     year:2022, class:'Roadster Spyder',  cylinders:6, displacement:4.0, drive:'rwd', fuel_type:'gas',          transmission:'m', city_mpg:16, combination_mpg:20, highway_mpg:23 },
    { make:'porsche', model:'boxster', variant:'25 Años',    year:2021, class:'Roadster Edición', cylinders:4, displacement:2.5, drive:'rwd', fuel_type:'gas',          transmission:'a', city_mpg:20, combination_mpg:24, highway_mpg:27 },
    { make:'porsche', model:'boxster', variant:'T',          year:2020, class:'Roadster Sport',   cylinders:4, displacement:2.0, drive:'rwd', fuel_type:'gas',          transmission:'m', city_mpg:21, combination_mpg:25, highway_mpg:28 },

    // ── DEPORTIVOS 718 CAYMAN — coupé (6 entradas) ──────────────
    { make:'porsche', model:'cayman', variant:'Base',        year:2024, class:'Coupé Deportivo',  cylinders:4, displacement:2.0, drive:'rwd', fuel_type:'gas',          transmission:'a', city_mpg:20, combination_mpg:25, highway_mpg:28 },
    { make:'porsche', model:'cayman', variant:'S',           year:2024, class:'Coupé Deportivo',  cylinders:4, displacement:2.5, drive:'rwd', fuel_type:'gas',          transmission:'a', city_mpg:19, combination_mpg:24, highway_mpg:27 },
    { make:'porsche', model:'cayman', variant:'GTS 4.0',     year:2023, class:'Coupé GTS',        cylinders:6, displacement:4.0, drive:'rwd', fuel_type:'gas',          transmission:'m', city_mpg:17, combination_mpg:21, highway_mpg:24 },
    { make:'porsche', model:'cayman', variant:'GT4',         year:2023, class:'Coupé GT',         cylinders:6, displacement:4.0, drive:'rwd', fuel_type:'gas',          transmission:'m', city_mpg:16, combination_mpg:20, highway_mpg:23 },
    { make:'porsche', model:'cayman', variant:'GT4 RS',      year:2023, class:'Coupé GT',         cylinders:6, displacement:4.0, drive:'rwd', fuel_type:'gas',          transmission:'a', city_mpg:15, combination_mpg:18, highway_mpg:21 },
    { make:'porsche', model:'cayman', variant:'T',           year:2022, class:'Coupé Sport',      cylinders:4, displacement:2.0, drive:'rwd', fuel_type:'gas',          transmission:'m', city_mpg:20, combination_mpg:24, highway_mpg:27 },

    // ── SUV CAYENNE (7 entradas) ─────────────────────────────────
    { make:'porsche', model:'cayenne', variant:'Base',            year:2024, class:'SUV de Lujo',      cylinders:6, displacement:3.0, drive:'awd', fuel_type:'gas',          transmission:'a', city_mpg:19, combination_mpg:22, highway_mpg:25 },
    { make:'porsche', model:'cayenne', variant:'S',               year:2024, class:'SUV de Lujo',      cylinders:6, displacement:2.9, drive:'awd', fuel_type:'gas',          transmission:'a', city_mpg:18, combination_mpg:21, highway_mpg:24 },
    { make:'porsche', model:'cayenne', variant:'GTS',             year:2024, class:'SUV Deportivo',    cylinders:8, displacement:4.0, drive:'awd', fuel_type:'gas',          transmission:'a', city_mpg:16, combination_mpg:19, highway_mpg:22 },
    { make:'porsche', model:'cayenne', variant:'Turbo GT',        year:2023, class:'SUV Turbo',        cylinders:8, displacement:4.0, drive:'awd', fuel_type:'gas',          transmission:'a', city_mpg:14, combination_mpg:17, highway_mpg:20 },
    { make:'porsche', model:'cayenne', variant:'E-Hybrid',        year:2024, class:'SUV Híbrido',      cylinders:6, displacement:3.0, drive:'awd', fuel_type:'gas/electric', transmission:'a', city_mpg:46, combination_mpg:50, highway_mpg:55 },
    { make:'porsche', model:'cayenne', variant:'Turbo S E-Hybrid',year:2023, class:'SUV Híbrido',      cylinders:8, displacement:4.0, drive:'awd', fuel_type:'gas/electric', transmission:'a', city_mpg:40, combination_mpg:44, highway_mpg:48 },
    { make:'porsche', model:'cayenne', variant:'Coupé Turbo',     year:2024, class:'SUV Coupé',        cylinders:8, displacement:4.0, drive:'awd', fuel_type:'gas',          transmission:'a', city_mpg:15, combination_mpg:18, highway_mpg:21 },

    // ── SUV MACAN (6 entradas) ───────────────────────────────────
    { make:'porsche', model:'macan', variant:'Base',              year:2024, class:'SUV Compacto',     cylinders:4, displacement:2.0, drive:'awd', fuel_type:'gas',          transmission:'a', city_mpg:20, combination_mpg:23, highway_mpg:27 },
    { make:'porsche', model:'macan', variant:'S',                 year:2024, class:'SUV Compacto',     cylinders:6, displacement:3.0, drive:'awd', fuel_type:'gas',          transmission:'a', city_mpg:19, combination_mpg:22, highway_mpg:26 },
    { make:'porsche', model:'macan', variant:'GTS',               year:2023, class:'SUV Compacto GTS', cylinders:6, displacement:2.9, drive:'awd', fuel_type:'gas',          transmission:'a', city_mpg:18, combination_mpg:21, highway_mpg:24 },
    { make:'porsche', model:'macan', variant:'Turbo',             year:2023, class:'SUV Compacto',     cylinders:6, displacement:2.9, drive:'awd', fuel_type:'gas',          transmission:'a', city_mpg:17, combination_mpg:20, highway_mpg:23 },
    { make:'porsche', model:'macan', variant:'Electric',          year:2024, class:'SUV Eléctrico',    cylinders:0, displacement:0,   drive:'awd', fuel_type:'electricity',  transmission:'a', city_mpg:87, combination_mpg:90, highway_mpg:93 },
    { make:'porsche', model:'macan', variant:'Electric Turbo',    year:2024, class:'SUV Eléctrico',    cylinders:0, displacement:0,   drive:'awd', fuel_type:'electricity',  transmission:'a', city_mpg:83, combination_mpg:86, highway_mpg:89 },

    // ── GRAN TURISMO PANAMERA (6 entradas) ──────────────────────
    { make:'porsche', model:'panamera', variant:'4',              year:2024, class:'Gran Turismo',     cylinders:6, displacement:2.9, drive:'awd', fuel_type:'gas',          transmission:'a', city_mpg:18, combination_mpg:22, highway_mpg:26 },
    { make:'porsche', model:'panamera', variant:'4S',             year:2024, class:'Gran Turismo',     cylinders:6, displacement:2.9, drive:'awd', fuel_type:'gas',          transmission:'a', city_mpg:17, combination_mpg:21, highway_mpg:25 },
    { make:'porsche', model:'panamera', variant:'GTS',            year:2023, class:'Gran Turismo GTS', cylinders:8, displacement:4.0, drive:'awd', fuel_type:'gas',          transmission:'a', city_mpg:16, combination_mpg:19, highway_mpg:22 },
    { make:'porsche', model:'panamera', variant:'Turbo S',        year:2024, class:'Gran Turismo',     cylinders:8, displacement:4.0, drive:'awd', fuel_type:'gas',          transmission:'a', city_mpg:14, combination_mpg:17, highway_mpg:20 },
    { make:'porsche', model:'panamera', variant:'4 E-Hybrid',     year:2024, class:'Gran Turismo Híb.',cylinders:6, displacement:2.9, drive:'awd', fuel_type:'gas/electric', transmission:'a', city_mpg:49, combination_mpg:53, highway_mpg:58 },
    { make:'porsche', model:'panamera', variant:'Sport Turismo',  year:2023, class:'Estate GT',        cylinders:6, displacement:2.9, drive:'awd', fuel_type:'gas',          transmission:'a', city_mpg:18, combination_mpg:22, highway_mpg:26 },

    // ── ELÉCTRICO TAYCAN (9 entradas) ───────────────────────────
    { make:'porsche', model:'taycan', variant:'RWD',              year:2024, class:'Sedán Eléctrico',  cylinders:0, displacement:0, drive:'rwd', fuel_type:'electricity',    transmission:'a', city_mpg:75, combination_mpg:78, highway_mpg:81 },
    { make:'porsche', model:'taycan', variant:'4',                year:2024, class:'Sedán Eléctrico',  cylinders:0, displacement:0, drive:'awd', fuel_type:'electricity',    transmission:'a', city_mpg:79, combination_mpg:82, highway_mpg:84 },
    { make:'porsche', model:'taycan', variant:'4S',               year:2024, class:'Sedán Eléctrico',  cylinders:0, displacement:0, drive:'awd', fuel_type:'electricity',    transmission:'a', city_mpg:76, combination_mpg:79, highway_mpg:82 },
    { make:'porsche', model:'taycan', variant:'GTS',              year:2024, class:'Sedán Eléctrico',  cylinders:0, displacement:0, drive:'awd', fuel_type:'electricity',    transmission:'a', city_mpg:74, combination_mpg:77, highway_mpg:80 },
    { make:'porsche', model:'taycan', variant:'Turbo',            year:2024, class:'Sedán Eléctrico',  cylinders:0, displacement:0, drive:'awd', fuel_type:'electricity',    transmission:'a', city_mpg:70, combination_mpg:74, highway_mpg:77 },
    { make:'porsche', model:'taycan', variant:'Turbo S',          year:2024, class:'Sedán Eléctrico',  cylinders:0, displacement:0, drive:'awd', fuel_type:'electricity',    transmission:'a', city_mpg:68, combination_mpg:72, highway_mpg:75 },
    { make:'porsche', model:'taycan', variant:'Cross Turismo 4',  year:2024, class:'SUV Eléctrico',    cylinders:0, displacement:0, drive:'awd', fuel_type:'electricity',    transmission:'a', city_mpg:70, combination_mpg:74, highway_mpg:77 },
    { make:'porsche', model:'taycan', variant:'Cross Turismo Turbo', year:2024, class:'SUV Eléctrico', cylinders:0, displacement:0, drive:'awd', fuel_type:'electricity',   transmission:'a', city_mpg:67, combination_mpg:71, highway_mpg:74 },
    { make:'porsche', model:'taycan', variant:'Sport Turismo GTS',year:2023, class:'Estate Eléctrico', cylinders:0, displacement:0, drive:'awd', fuel_type:'electricity',    transmission:'a', city_mpg:72, combination_mpg:75, highway_mpg:78 },

  ].map(c => ({ ...c, imagen: this.getImagenUrl(c.model, c.year) }));

  constructor(private http: HttpClient) {}

  getCarros(): Observable<PorscheCarro[]> {
    if (this.apiKey === 'Tu_API_Key_Aqui') {
      return of(this.catalogo);
    }

    const headers = new HttpHeaders({ 'X-Api-Key': this.apiKey });
    return new Observable(observer => {
      this.http.get<PorscheCarro[]>(`${this.apiUrl}?make=porsche&limit=50`, { headers })
        .subscribe({
          next: (carros) => {
            const conImg = carros.map(c => ({ ...c, imagen: this.getImagenUrl(c.model, c.year) }));
            observer.next(conImg);
            observer.complete();
          },
          error: () => {
            observer.next(this.catalogo);
            observer.complete();
          }
        });
    });
  }

  getImagen(modelo: string, year: number = 2022): string {
    return this.getImagenUrl(modelo, year);
  }

  getTransmision(t: string): string {
    return t === 'a' ? 'Automática' : t === 'm' ? 'Manual' : t;
  }

  getTraccion(d: string): string {
    const map: { [key: string]: string } = {
      awd: 'Tracción total (AWD)',
      rwd: 'Tracción trasera (RWD)',
      fwd: 'Tracción delantera (FWD)'
    };
    return map[d] ?? d.toUpperCase();
  }
}
