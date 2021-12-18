import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyTaskComponent } from './my-task/my-task.component';
import { TaskDescriptionComponent } from './task-description/task-description.component';


const routes: Routes = [
  {
    path: 'mytask',
    component: MyTaskComponent
  },
  {
    path: 'taskDes/:id',
    component: TaskDescriptionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TmsRoutingModule { }
