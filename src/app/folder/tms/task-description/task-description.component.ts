import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TmsService } from '../tms.service';

@Component({
  selector: 'app-task-description',
  templateUrl: './task-description.component.html',
  styleUrls: ['./task-description.component.scss'],
})
export class TaskDescriptionComponent implements OnInit {

  reason: any;
  id: any;
  details:any;
  resonTab: boolean = false;
  workDuration: any;
  totalSpent: any
  showSpinner: boolean = true;

  constructor(private route: ActivatedRoute,
              public tmsSrv: TmsService,
              public router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.tmsSrv.taskDes(this.id).subscribe(res=>{
      this.details = res['data'];
      if( this.details)this.showSpinner = false;
    })

    this.tmsSrv.timeSpent(this.id).subscribe(res=>{
      // console.log(res['data']);
      this.workDuration = res['data']
      if(this.workDuration){
        this.totalSpent = this.workDuration[this.workDuration.length-1].entireWorkDuration
      }
      // this.details = res['data'];
    })
  }

  rej(){
    this.resonTab = true;
  }

  reasonToRej(){
    this.resonTab = false;
    this.reason;
    this.tmsSrv.updateTaskStatus(this.id, 8).subscribe(res=>{
    // console.log(res);
    this.details.statusString = res['data'].statusString
    // this.router.navigateByUrl('/folder/tms/mytask');
    });

  }

  accept(){

    this.tmsSrv.updateTaskStatus(this.id, 2).subscribe(res=>{
      // console.log(res);
      this.router.navigateByUrl('/folder/punch/in/' + res['data'].id);
      });

  }

  goBack(){
    this.router.navigateByUrl('/folder/tms/mytask');

  }
}
