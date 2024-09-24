import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CodigoclavePageRoutingModule } from './codigoclave-routing.module';

import { CodigoclavePage } from './codigoclave.page';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CodigoclavePageRoutingModule,
    SharedModule,
  ],
  declarations: [CodigoclavePage]
})
export class CodigoclavePageModule {}
