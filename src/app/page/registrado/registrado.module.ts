import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistradoPageRoutingModule } from './registrado-routing.module';

import { RegistradoPage } from './registrado.page';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistradoPageRoutingModule,
    SharedModule
  ],
  declarations: [RegistradoPage]
})
export class RegistradoPageModule {}
