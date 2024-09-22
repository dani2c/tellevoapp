import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RealizadoPage } from './realizado.page';

const routes: Routes = [
  {
    path: '',
    component: RealizadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RealizadoPageRoutingModule {}
