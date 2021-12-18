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
export class CheckIncheckOutService {
  token: string;
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


  sendStatus(data){
    return this.http.post(environment.urlPHP + 'attendance/checkinoutattendanceAMS', data, this.httpOptions)
    .map(Response =>
      {return Response}).catch(this.handleErrors);
  }

  checkInOutStatus(userId){
   return this.http.get(environment.urlPHP + 'attendance/getAMSattendancestatus/' + userId, this.httpOptions)
   .map(Response =>
    {return Response}).catch(this.handleErrors);
 }

  tmsCheckIn(data){
  return this.http.post(environment.url + 'attendance/checkinouttask', data, this.httpOptions)
  .map(Response =>
    {return Response}).catch(this.handleErrors);
 }
 

  private handleErrors (error: Response | any) {
    return Observable.throw(error.error.message || 'backend server error');
  }
}

