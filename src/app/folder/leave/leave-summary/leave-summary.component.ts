import { Component, OnInit } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx'; 
import { LeaveService } from '../leave.service';
import * as moment from 'moment'; 

@Component({
  selector: 'app-leave-summary',
  templateUrl: './leave-summary.component.html',
  styleUrls: ['./leave-summary.component.scss'],
})
export class LeaveSummaryComponent implements OnInit {
  enableRequest = false;
  private database: SQLite;
  conObj: SQLiteObject;
  dbObj: SQLiteObject;
  empId: any;
  leaveList: any;
  reason: any;
  endDate: any;
  startDate: any;
  firstDay: any;
  lastDay: any;

  constructor(private sqlite: SQLite,
              public leavSer: LeaveService) { }

  ngOnInit() {
    let date = new Date(); 
    this.firstDay =  moment(new Date(date.getFullYear(), date.getMonth(), 1)).format('YYYY-MM-DD'); 
    this.lastDay = moment(new Date(date.getFullYear(), date.getMonth() + 1, 0)).format('YYYY-MM-DD'); 
    this.getLeaves();
  }
  
  getLeaves() {
    this.empId = window.localStorage.getItem('empId');
    let firstDay = moment(this.firstDay).format('YYYY-MM-DD'); 
    let lastDay = moment(this.lastDay).format('YYYY-MM-DD'); 

    this.leavSer.leaves(this.empId, firstDay, lastDay).subscribe(res=>{
      this.leaveList = res['data']
      // this.totalSpent = this.report[this.report.length-1].entireWorkDuration
    },err=>{
      // this.errMsg = err;
    })
  }

    // this.leavSer.leaveSummary(this.empId).subscribe(res=>{
    //   this.leaveList = res['data']
    // }, err=>{

    // })
  // }
 
  leaveRequest(){
    this.enableRequest = true;
  }
  
  generate(){
    this.enableRequest = false;
    let payload = { 
      FromDate: moment(this.startDate).format('YYYY-MM-DD'), 
      ToDate: moment(this.endDate).format('YYYY-MM-DD'), 
      Reason: this.reason, 
      EmpId:  window.localStorage.getItem('empId'), 
      Status: 1
    }
    this.leavSer.applyLeave(payload).subscribe(res=>{
      // console.log(res['data']);
      if(res['data']){
        this.leavSer.leaveSummary(this.empId).subscribe(res=>{
          this.leaveList = res['data']
        }, err=>{
          console.log(err)
        })
      }
    },err=>{
      console.log(err)
    }
    )
  }

  goBack(){
    this.enableRequest = false;
  }
  
  slice: number = 15;
  doInfinite(infiniteScrollEvent) {
    setTimeout(() => {
      this.slice += 5;
      infiniteScrollEvent.target.complete();
    }, 500);
  }

}
