import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PidiendoAutoPage } from './pidiendo-auto.page';

const routes: Routes = [
  {
    path: '',
    component: PidiendoAutoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PidiendoAutoPageRoutingModule {}
