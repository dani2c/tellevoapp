import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClaveolvidadaPage } from './claveolvidada.page';

const routes: Routes = [
  {
    path: '',
    component: ClaveolvidadaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClaveolvidadaPageRoutingModule {}
