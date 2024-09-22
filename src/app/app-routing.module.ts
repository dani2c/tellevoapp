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
  {
    path: 'realizado',
    loadChildren: () => import('./page/realizado/realizado.module').then( m => m.RealizadoPageModule)
  },
  {
    path: 'home-simulacion',
    loadChildren: () => import('./page/home-simulacion/home-simulacion.module').then( m => m.HomeSimulacionPageModule)
  },
  {
    path: 'cancelar-pedido',
    loadChildren: () => import('./page/cancelar-pedido/cancelar-pedido.module').then( m => m.CancelarPedidoPageModule)
  },
  {
    path: 'viaje-cancelado',
    loadChildren: () => import('./page/viaje-cancelado/viaje-cancelado.module').then( m => m.ViajeCanceladoPageModule)
  },
  {
    path: 'programar-viaje-teniendo-auto',
    loadChildren: () => import('./page/programar-viaje-teniendo-auto/programar-viaje-teniendo-auto.module').then( m => m.ProgramarViajeTeniendoAutoPageModule)
  },
  {
    path: 'le-notificaremos',
    loadChildren: () => import('./page/le-notificaremos/le-notificaremos.module').then( m => m.LeNotificaremosPageModule)
  },
  {
    path: 'contactanos',
    loadChildren: () => import('./page/contactanos/contactanos.module').then( m => m.ContactanosPageModule)
  },



  

  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
