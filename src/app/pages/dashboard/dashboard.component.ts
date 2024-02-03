import { Component, input, signal } from '@angular/core';
import { Data } from '../../model/data.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedService } from '../../pages/routeless-routing-module/routeless-routing-module.component';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private dataService: SharedService) { }

  listData = this.dataService.listData;
  listado = this.listData();
  saldo = this.dataService.saldo;

  mostrarErrorIngreso = false;
  mostrarErrorGasto = false;
  mostrarErrorFechaIngreso = false;
  mostrarErrorFechaGasto = false;


  fechaController = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required
    ]
  });

  registrarGastoController = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.minLength(1),
      Validators.required
    ]
  });
  registrarIngresoController = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.minLength(1),
      Validators.required
    ]
  });


  checkIngreso() {
    if (this.registrarIngresoController.valid && this.fechaController.valid) {
      let data = this.registrarIngresoController.value;
      if (data != '') {
        this.registrarIngreso(this.registrarIngresoController.value, this.fechaController.value);
        this.registrarIngresoController.reset();
        this.fechaController.reset();
        this.mostrarErrorIngreso = false;
      }
    } else if (!this.fechaController.valid) {
      this.mostrarErrorFechaIngreso = true;
    } else {
      this.mostrarErrorIngreso = true;
    }
  }

  checkGasto() {
    if (this.registrarGastoController.valid && this.fechaController.valid) {
      let data = this.registrarGastoController.value;
      if (data != '') {
        this.registrarGasto(this.registrarGastoController.value, this.fechaController.value);
        this.registrarGastoController.reset();
        this.fechaController.reset();
        this.mostrarErrorGasto = false;
      }
    } else if (!this.fechaController.valid) {
      this.mostrarErrorFechaGasto = true;
    } else {
      this.mostrarErrorGasto = true;
    }
  }


  registrarIngreso(value: string, fecha: string) {
    // Buscar si ya existe un ingreso para la misma fecha
    const index = this.listData().findIndex(data => data.fecha === fecha && data.tipo === 'ingreso');
    
    if (index !== -1) { // Si se encuentra una fecha coincidente
      // Actualizar el ingreso existente en la lista
      this.listData.update((list) => {
        return list.map((data, i) => {
          if (i === index) {
            // Sumar el nuevo valor al valor existente
            return { ...data, data: data.data + parseFloat(value) };
          }
          return data;
        });
      });
    } else { // Si no se encuentra una fecha coincidente
      // Agregar un nuevo ingreso a la lista
      const newData: Data = {
        tipo: 'ingreso',
        data: parseFloat(value),
        fecha: fecha
      };
      this.listData.update((list) => [...list, newData]);
    }
  
    console.log(this.listData());
    // Reiniciar el valor del input y actualizar el saldo
    value = '';
    this.actualizarSaldo();
  }
  

  registrarGasto(value: string, fecha: string) {
    // Buscar si ya existe un gasto para la misma fecha
    const index = this.listData().findIndex(data => data.fecha === fecha && data.tipo === 'gasto');
    
    if (index !== -1) { // Si se encuentra una fecha coincidente
      // Actualizar el gasto existente en la lista
      this.listData.update((list) => {
        return list.map((data, i) => {
          if (i === index) {
            // Sumar el nuevo valor al valor existente
            return { ...data, data: data.data + parseFloat(value) };
          }
          return data;
        });
      });
    } else { // Si no se encuentra una fecha coincidente
      // Agregar un nuevo gasto a la lista
      const newData: Data = {
        tipo: 'gasto',
        data: parseFloat(value),
        fecha: fecha
      };
      this.listData.update((list) => [...list, newData]);
    }
  
    console.log(this.listData());
    // Reiniciar el valor del input y actualizar el saldo
    value = '';
    this.actualizarSaldo();
  }

  actualizarSaldo() {
    let listado = this.listData();
    console.log(listado);
    let ingresos = listado.filter(data => data.tipo === 'ingreso').map(data => data.data).reduce((a, b) => a + b, 0);
    let gastos = listado.filter(data => data.tipo === 'gasto').map(data => data.data).reduce((a, b) => a + b, 0);
    this.saldo.set(ingresos - gastos);
  }

  ngOnInit() {
    this.actualizarSaldo();
  }

}
