import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckinComponent } from './checkin/checkin.component';


const routes: Routes = [{
  path: 'in/:id',
  component: CheckinComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckIncheckOutRoutingModule { }
