import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClavecambiadaPage } from './clavecambiada.page';

const routes: Routes = [
  {
    path: '',
    component: ClavecambiadaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClavecambiadaPageRoutingModule {}
