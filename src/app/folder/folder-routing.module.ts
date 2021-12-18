import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FolderPage } from './folder.page';
import { CheckTutorial } from '../providers/check-tutorial.service';

const routes: Routes = [
  {
    path: '',
    component: FolderPage
  },
  {
    path: 'punch',
    loadChildren: ()=> import('./check-incheck-out/check-incheck-out.module').then(m => m.CheckIncheckOutModule)
  },
  {
    path: 'attendanceRep',
    loadChildren: ()=> import('./attendance-report/attendance-report.module').then(m => m.AttendanceReportModule)
  },
  {
    path: 'leave',
    loadChildren: () => import('./leave/leave.module').then(m => m.LeaveModule)
  },
  {
    path: 'signUp',
    loadChildren: () => import('./sign-up/sign-up.module').then(m => m.SignUpModule),
    canLoad: [CheckTutorial]
  },
  {
    path: 'tms',
    loadChildren: () => import('./tms/tms.module').then(m => m.TmsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
