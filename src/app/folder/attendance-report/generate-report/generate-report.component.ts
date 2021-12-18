import { Component, OnInit } from '@angular/core';
import { AttendanceReportService } from '../attendance-report.service';
import * as moment from 'moment'; 
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.scss'],
})
export class GenerateReportComponent implements OnInit {
  report: any;
  errMsg: any;
  totalSpent: any;
  firstDay: any;
  lastDay: any;
  empId

  constructor(
    public repSer: AttendanceReportService,
    private storage: Storage,
  ) { }
  
//   ionViewWillEnter() {
//     this.storage.get('loginDetails').then(detai => {
//       console.log(detai.details.empId);
//       this.empId = detai.details.empId
//     });
// }

  ngOnInit() {
    let date = new Date(); 
    this.firstDay =  moment(new Date(date.getFullYear(), date.getMonth(), 1)).format('YYYY-MM-DD'); 
    this.lastDay = moment(new Date(date.getFullYear(), date.getMonth() + 1, 0)).format('YYYY-MM-DD'); 
    this.getReport();
  }

  getReport(){
    this.empId = window.localStorage.getItem('empId');
    let startDate = moment(this.firstDay).format('YYYY-MM-DD'); 
    let endDate = moment(this.lastDay).format('YYYY-MM-DD'); 

    this.repSer.attenReport(this.empId, startDate, endDate).subscribe(res=>{
      console.log(res['data'])
      this.report = res['data'];
      this.totalSpent = res[0];
    },err=>{
      this.errMsg = err;
    })
  }

  slice: number = 15;
  doInfinite(infiniteScrollEvent) {
    setTimeout(() => {
      this.slice += 5;
      infiniteScrollEvent.target.complete();
    }, 500);
  }

}
