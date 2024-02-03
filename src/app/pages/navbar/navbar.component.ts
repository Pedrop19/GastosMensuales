import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRotateLeft, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FontAwesomeModule, AppComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  faRotateLeft = faRotateLeft;
  faMoneyBill = faMoneyBill;


  
}
