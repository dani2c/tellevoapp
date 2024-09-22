import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeNotificaremosPageRoutingModule } from './le-notificaremos-routing.module';

import { LeNotificaremosPage } from './le-notificaremos.page';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeNotificaremosPageRoutingModule,
    SharedModule
  ],
  declarations: [LeNotificaremosPage]
})
export class LeNotificaremosPageModule {}
