import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckIncheckOutRoutingModule } from './check-incheck-out-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core'; 


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CheckIncheckOutRoutingModule,
    IonicModule,
    FormsModule,
    AgmCoreModule
  ]
})
export class CheckIncheckOutModule { }
