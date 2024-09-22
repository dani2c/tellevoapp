import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeSimulacionPage } from './home-simulacion.page';

const routes: Routes = [
  {
    path: '',
    component: HomeSimulacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeSimulacionPageRoutingModule {}
