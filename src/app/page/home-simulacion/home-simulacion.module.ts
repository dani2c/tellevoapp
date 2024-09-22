import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeSimulacionPageRoutingModule } from './home-simulacion-routing.module';

import { HomeSimulacionPage } from './home-simulacion.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeSimulacionPageRoutingModule,
    SharedModule
  ],
  declarations: [HomeSimulacionPage]
})
export class HomeSimulacionPageModule {}
