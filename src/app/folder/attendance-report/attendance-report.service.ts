import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/Observable';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AttendanceReportService {
  httpOptions: { headers: HttpHeaders; };

   constructor(private http: HttpClient,
    private storage: Storage,
    ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + <string>window.localStorage.getItem('token')
      })
    };
  }


  attenReport(empId, firstDay, lastDay){
    return this.http.get(environment.urlPHP + 'attendance/gettimespentinoffice/' + empId + '/' + firstDay + '/' + lastDay + '/all', this.httpOptions)
    .map(Response =>
      {return Response}).catch(this.handleErrors);
  }

  private handleErrors (error: Response | any) {
    console.log(error.error.message)
    return Observable.throw(error.error.message || 'backend server error');
  }
}


