import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthenticatedGuard } from './auth/guards/is-authenticated.guard';
// import { redirectLoggedInTo } from "@angular/fire/auth-guard";

// const redirectToProyectos = () => redirectLoggedInTo(['/proyectos']);

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'proyectos',
    canLoad: [IsAuthenticatedGuard],
    loadChildren: () => import('./features/proyectos/proyectos.module').then(m => m.ProyectosModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
