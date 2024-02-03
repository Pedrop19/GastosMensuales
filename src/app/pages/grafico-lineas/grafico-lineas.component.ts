import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { SharedService } from '../../pages/routeless-routing-module/routeless-routing-module.component';


@Component({
  selector: 'app-grafico-lineas',
  standalone: true,
  imports: [],
  templateUrl: './grafico-lineas.component.html',
  styleUrl: './grafico-lineas.component.css'
})
export class GraficoLineasComponent {

    constructor(private dataService: SharedService) { }
  
  listData = this.dataService.listData;
  listado = this.listData();
  saldo = this.dataService.saldo;

  public chart: any;
  createChart() {
    // Agrupar ingresos y gastos por fecha
    const dataPorFecha: { [key: string]: { fecha: string, ingresos: number, gastos: number } } = {};
    this.listado.forEach(data => {
      const fecha = data.fecha;
      if (!dataPorFecha[fecha]) {
        dataPorFecha[fecha] = { fecha: fecha, ingresos: 0, gastos: 0 };
      }
      if (data.tipo === 'ingreso') {
        dataPorFecha[fecha].ingresos += data.data;
      } else {
        dataPorFecha[fecha].gastos += data.data;
      }
    });

    // Extraer las fechas y los datos de ingresos y gastos agrupados
    const fechas = Object.keys(dataPorFecha);
    const ingresos = fechas.map(fecha => dataPorFecha[fecha].ingresos);
    const gastos = fechas.map(fecha => dataPorFecha[fecha].gastos);

    // Crear el gráfico
    this.chart = new Chart("MyChart", {
      type: 'line',
      data: {
        labels: fechas,
        datasets: [
          {
            label: "Ingresos",
            data: ingresos,
            backgroundColor: 'transparent',
            borderColor: 'limegreen',
            pointBackgroundColor: 'limegreen',
            pointBorderColor: 'limegreen',
            pointHoverBackgroundColor: 'limegreen',
            pointHoverBorderColor: 'limegreen',
            fill: false
          },
          {
            label: "Gastos",
            data: gastos,
            backgroundColor: 'transparent',
            borderColor: 'red',
            pointBackgroundColor: 'red',
            pointBorderColor: 'red',
            pointHoverBackgroundColor: 'red',
            pointHoverBorderColor: 'red',
            fill: false
          }
        ]
      },
      options: {
        aspectRatio: 1.0
      }
    });
  }

  ngOnInit(): void {
    this.createChart();
  }
}
