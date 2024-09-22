import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgramarViajeTeniendoAutoPage } from './programar-viaje-teniendo-auto.page';

const routes: Routes = [
  {
    path: '',
    component: ProgramarViajeTeniendoAutoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgramarViajeTeniendoAutoPageRoutingModule {}
