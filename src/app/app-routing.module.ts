import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./page/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./page/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'pidiendo-auto',
    loadChildren: () => import('./page/pidiendo-auto/pidiendo-auto.module').then( m => m.PidiendoAutoPageModule)
  },
  {
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



  

  
  {
    path: 'prueba',
    loadChildren: () => import('./page/prueba/prueba.module').then( m => m.PruebaPageModule)
  },
  {
    path: 'claveolvidada',
    loadChildren: () => import('./page/claveolvidada/claveolvidada.module').then( m => m.ClaveolvidadaPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./page/registro/registro.module').then( m => m.RegistroPageModule)
  },  {
    path: 'registrado',
    loadChildren: () => import('./page/registrado/registrado.module').then( m => m.RegistradoPageModule)
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./page/recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  {
    path: 'codigoclave',
    loadChildren: () => import('./page/codigoclave/codigoclave.module').then( m => m.CodigoclavePageModule)
  },
  {
    path: 'clavecambiada',
    loadChildren: () => import('./page/clavecambiada/clavecambiada.module').then( m => m.ClavecambiadaPageModule)
  },

  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
