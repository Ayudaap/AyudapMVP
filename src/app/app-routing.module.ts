import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthModule } from './auth/auth.module';
import { RecoveryPassComponent } from './auth/recovery-pass/recovery-pass.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then(m=>m.AuthModule)
  },
  { path: 'recovery', component: RecoveryPassComponent, pathMatch:'full' },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
