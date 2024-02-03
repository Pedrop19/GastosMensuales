import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Data } from '../../model/data.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  listData = signal<Data[]>([]);
  saldo = signal<number>(0);

  private mostrarDashboard = new BehaviorSubject(false);
  private mostarGraficoBarras = new BehaviorSubject(false);
  private mostrarGraficoLineas = new BehaviorSubject(false);

  dashboard$ = this.mostrarDashboard.asObservable();
  barras$ = this.mostarGraficoBarras.asObservable();
  lineas$ = this.mostrarGraficoLineas.asObservable();

  toggleComponent(tipo: string) {
    switch (tipo) {
      case 'dashboard':
        this.mostrarDashboard.next(true);
        this.mostarGraficoBarras.next(false);
        this.mostrarGraficoLineas.next(false);
        break;
      case 'grafico-barras':
        this.mostrarDashboard.next(false);
        this.mostarGraficoBarras.next(true);
        this.mostrarGraficoLineas.next(false);
        break;
      case 'grafico-lineas':
        this.mostrarDashboard.next(false);
        this.mostarGraficoBarras.next(false);
        this.mostrarGraficoLineas.next(true);
        break;
    }
  }
}