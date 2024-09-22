import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViajeCanceladoPageRoutingModule } from './viaje-cancelado-routing.module';

import { ViajeCanceladoPage } from './viaje-cancelado.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViajeCanceladoPageRoutingModule,
    SharedModule
  ],
  declarations: [ViajeCanceladoPage]
})
export class ViajeCanceladoPageModule {}
