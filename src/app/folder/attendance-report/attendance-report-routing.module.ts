import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenerateReportComponent } from './generate-report/generate-report.component';


const routes: Routes = [
  {
    path: 'rep',
    component: GenerateReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceReportRoutingModule { }
