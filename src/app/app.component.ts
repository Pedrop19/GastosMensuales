import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GraficoBarrasComponent } from './pages/grafico-barras/grafico-barras.component';
import { GraficoLineasComponent } from './pages/grafico-lineas/grafico-lineas.component';
import { SharedService } from './pages/routeless-routing-module/routeless-routing-module.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FontAwesomeModule, SidebarComponent, DashboardComponent, GraficoBarrasComponent, GraficoLineasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GastosMensuales';
  faRotateLeft = faRotateLeft;  

  mostrarDashboard: boolean = true;
  mostarGraficoBarras: boolean = false;
  mostrarGraficoLineas: boolean = false;
  
  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.sharedService.dashboard$.subscribe(value => this.mostrarDashboard = value);
    this.sharedService.barras$.subscribe(value => this.mostarGraficoBarras = value);
    this.sharedService.lineas$.subscribe(value => this.mostrarGraficoLineas = value);
    this.mostrarDashboard = true;
  }

  toggleComponent(tipo: string) {
    this.sharedService.toggleComponent(tipo);
  }
  
}
