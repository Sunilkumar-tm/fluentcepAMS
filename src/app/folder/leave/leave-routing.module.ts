import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeaveSummaryComponent } from './leave-summary/leave-summary.component';


const routes: Routes = [
  {
    path:'lea',
    component: LeaveSummaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveRoutingModule { }
