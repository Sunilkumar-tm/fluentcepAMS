import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceReportRoutingModule } from './attendance-report-routing.module';
import { GenerateReportComponent } from './generate-report/generate-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [GenerateReportComponent],
  imports: [
    CommonModule,
    AttendanceReportRoutingModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AttendanceReportModule { }
