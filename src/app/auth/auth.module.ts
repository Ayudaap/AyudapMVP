import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RecoveryPassComponent } from './recovery-pass/recovery-pass.component';
import { RegisterComponent } from './register/register.component';



@NgModule({
  declarations: [LoginComponent, RecoveryPassComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
