import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignUpRoutingModule } from './sign-up-routing.module';
import { AboutComponent } from './about/about.component';
import { IonicModule } from '@ionic/angular';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [AboutComponent, LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    SignUpRoutingModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SignUpModule { }
