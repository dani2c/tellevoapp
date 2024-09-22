import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncabezadoComponent } from './components/encabezado/encabezado.component';
import { IonicModule } from '@ionic/angular';
import { Encabezado2Component } from './components/encabezado2/encabezado2.component';

@NgModule({
  declarations: [EncabezadoComponent, Encabezado2Component],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [EncabezadoComponent, Encabezado2Component] 
})
export class SharedModule { }