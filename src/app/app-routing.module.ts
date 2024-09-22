import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./page/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'pidiendo-auto',
    loadChildren: () => import('./page/pidiendo-auto/pidiendo-auto.module').then( m => m.PidiendoAutoPageModule)
  },  {
    path: 'programar-viaje-con-auto',
    loadChildren: () => import('./page/programar-viaje-con-auto/programar-viaje-con-auto.module').then( m => m.ProgramarViajeConAutoPageModule)
  },
  {
    path: 'seleccionar-viajes-disponibles',
    loadChildren: () => import('./page/seleccionar-viajes-disponibles/seleccionar-viajes-disponibles.module').then( m => m.SeleccionarViajesDisponiblesPageModule)
  },



  

  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
