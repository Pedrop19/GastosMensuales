import { Component, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faNewspaper, faArrowRightArrowLeft, faBagShopping, faChartLine, faCreditCard, faSliders, faChartColumn } from '@fortawesome/free-solid-svg-icons';
import { AppComponent } from '../../app.component';
import { SharedService } from '../routeless-routing-module/routeless-routing-module.component';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FontAwesomeModule, AppComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  faNewspaper = faNewspaper;
  faArrowRightArrowLeft = faArrowRightArrowLeft;
  faBagShopping = faBagShopping;
  faChartLine = faChartLine;
  faCreditCard = faCreditCard;
  faSliders = faSliders;
  faChartColumn = faChartColumn;
  
  mostrarDashboard: boolean = false;
  mostarGraficoBarras: boolean = false;
  mostrarGraficoLineas: boolean = false;

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.sharedService.dashboard$.subscribe(value => this.mostrarDashboard = value);
    this.sharedService.barras$.subscribe(value => this.mostarGraficoBarras = value);
    this.sharedService.lineas$.subscribe(value => this.mostrarGraficoLineas = value);
  }

  toggleComponent(tipo: string) {
    this.sharedService.toggleComponent(tipo);
  }
}
