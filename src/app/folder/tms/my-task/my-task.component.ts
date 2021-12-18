import { Component, OnInit } from '@angular/core';
import { TmsService } from '../tms.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.scss'],
})
export class MyTaskComponent implements OnInit {
  taskList: any;
  userId: any;
  accepCount: any = 0;
  reOpenCount: any = 0;
  completCount: any = 0;
  rejectCount: any = 0;
  showSpinner: boolean = true;

  constructor(public tmsServ: TmsService,
              private router: Router,) { }

  ngOnInit() {
    this.router.navigateByUrl('/folder/tms/mytask', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/folder/tms/mytask']);
  });
    this.userId = window.localStorage.getItem('AtteType')
    this.tmsServ.getTaskList(this.userId).subscribe(res=>{
      // console.log(res)
      this.taskList = res['data'];
      this.showSpinner = false;
      res['data'].map(val=>{
        if(val.statusString == "Completed") this.completCount++;
        if(val.statusString == "Accepted") this.accepCount++
        if(val.statusString == "Reopen") this.reOpenCount++
        if(val.statusString == "Rejected") this.rejectCount++
      })
    })
  }

  goToDes(tid, status, name){
    // alert(tid)
    if(status == 2){
      this.router.navigateByUrl('/folder/punch/in/' + tid);
    }else{
      this.router.navigateByUrl('/folder/tms/taskDes/' + tid);
    }

  }

  slice: number = 7;
  doInfinite(infiniteScrollEvent) {
    setTimeout(() => {
      this.slice += 5;
      infiniteScrollEvent.target.complete();
    }, 500);
  }
  
}
