import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgramarViajeTeniendoAutoPageRoutingModule } from './programar-viaje-teniendo-auto-routing.module';

import { ProgramarViajeTeniendoAutoPage } from './programar-viaje-teniendo-auto.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgramarViajeTeniendoAutoPageRoutingModule,
    SharedModule
  ],
  declarations: [ProgramarViajeTeniendoAutoPage]
})
export class ProgramarViajeTeniendoAutoPageModule {}
