import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeleccionarViajesDisponiblesPageRoutingModule } from './seleccionar-viajes-disponibles-routing.module';

import { SeleccionarViajesDisponiblesPage } from './seleccionar-viajes-disponibles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeleccionarViajesDisponiblesPageRoutingModule
  ],
  declarations: [SeleccionarViajesDisponiblesPage]
})
export class SeleccionarViajesDisponiblesPageModule {}
