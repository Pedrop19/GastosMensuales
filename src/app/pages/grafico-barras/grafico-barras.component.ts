import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { OnInit } from '@angular/core';
import { SharedService } from '../../pages/routeless-routing-module/routeless-routing-module.component';



@Component({
  selector: 'app-grafico-barras',
  standalone: true,
  imports: [],
  templateUrl: './grafico-barras.component.html',
  styleUrl: './grafico-barras.component.css'
})
export class GraficoBarrasComponent implements OnInit {

  constructor(private dataService: SharedService) { }
  
  listData = this.dataService.listData;
  listado = this.listData();
  saldo = this.dataService.saldo;

  public chart: any;

  createChart(){
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
      type: 'bar',
      data: {
        labels: fechas,
        datasets: [
          {
            label: "Ingresos",
            data: ingresos,
            backgroundColor: 'rgba(119, 163, 69, 0.2)',
            borderWidth: 1,
            borderColor: 'rgba(119, 163, 69, 1)'
          },
          {
            label: "Gastos",
            data: gastos,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderWidth: 1,
            borderColor: 'rgba(255, 99, 132, 1)'
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

