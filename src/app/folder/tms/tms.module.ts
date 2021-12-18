import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TmsRoutingModule } from './tms-routing.module';
import { MyTaskComponent } from './my-task/my-task.component';
import { TaskDescriptionComponent } from './task-description/task-description.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [MyTaskComponent, TaskDescriptionComponent],
  imports: [
    CommonModule,
    TmsRoutingModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class TmsModule { }
