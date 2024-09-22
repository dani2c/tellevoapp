import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgramarViajeConAutoPageRoutingModule } from './programar-viaje-con-auto-routing.module';

import { ProgramarViajeConAutoPage } from './programar-viaje-con-auto.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgramarViajeConAutoPageRoutingModule,
    SharedModule
  ],
  declarations: [ProgramarViajeConAutoPage]
})
export class ProgramarViajeConAutoPageModule {}
