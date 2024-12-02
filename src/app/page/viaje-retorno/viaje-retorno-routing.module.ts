import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViajeRetornoPage } from './viaje-retorno.page';

const routes: Routes = [
  {
    path: '',
    component: ViajeRetornoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViajeRetornoPageRoutingModule {}
