import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CancelarPedidoPage } from './cancelar-pedido.page';

const routes: Routes = [
  {
    path: '',
    component: CancelarPedidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CancelarPedidoPageRoutingModule {}
