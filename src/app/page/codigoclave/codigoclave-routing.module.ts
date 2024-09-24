import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CodigoclavePage } from './codigoclave.page';

const routes: Routes = [
  {
    path: '',
    component: CodigoclavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodigoclavePageRoutingModule {}
