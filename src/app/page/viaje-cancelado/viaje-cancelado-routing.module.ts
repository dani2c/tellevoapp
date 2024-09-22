import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViajeCanceladoPage } from './viaje-cancelado.page';

const routes: Routes = [
  {
    path: '',
    component: ViajeCanceladoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViajeCanceladoPageRoutingModule {}
