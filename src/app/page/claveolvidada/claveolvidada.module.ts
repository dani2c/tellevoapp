import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClaveolvidadaPageRoutingModule } from './claveolvidada-routing.module';

import { ClaveolvidadaPage } from './claveolvidada.page';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClaveolvidadaPageRoutingModule,
    SharedModule,
  ],
  declarations: [ClaveolvidadaPage]
})
export class ClaveolvidadaPageModule {}
