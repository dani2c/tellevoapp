import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PidiendoAutoPageRoutingModule } from './pidiendo-auto-routing.module';

import { PidiendoAutoPage } from './pidiendo-auto.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PidiendoAutoPageRoutingModule,
    SharedModule
  ],
  declarations: [PidiendoAutoPage]
})
export class PidiendoAutoPageModule {}
