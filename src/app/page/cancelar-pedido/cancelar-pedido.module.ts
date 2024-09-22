import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CancelarPedidoPageRoutingModule } from './cancelar-pedido-routing.module';

import { CancelarPedidoPage } from './cancelar-pedido.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CancelarPedidoPageRoutingModule,
    SharedModule
  ],
  declarations: [CancelarPedidoPage]
})
export class CancelarPedidoPageModule {}
