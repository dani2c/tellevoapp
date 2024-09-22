import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgramarViajeConAutoPage } from './programar-viaje-con-auto.page';

const routes: Routes = [
  {
    path: '',
    component: ProgramarViajeConAutoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgramarViajeConAutoPageRoutingModule {}
