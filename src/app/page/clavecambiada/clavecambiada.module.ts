import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClavecambiadaPageRoutingModule } from './clavecambiada-routing.module';

import { ClavecambiadaPage } from './clavecambiada.page';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClavecambiadaPageRoutingModule,
    SharedModule,
  ],
  declarations: [ClavecambiadaPage]
})
export class ClavecambiadaPageModule {}
