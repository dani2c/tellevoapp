import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./page/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
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
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
