import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViajeRetornoPageRoutingModule } from './viaje-retorno-routing.module';

import { ViajeRetornoPage} from './viaje-retorno.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViajeRetornoPageRoutingModule,
    SharedModule
  ],
  declarations: [ViajeRetornoPage]
})
export class ViajeRetornoPageModule {}
