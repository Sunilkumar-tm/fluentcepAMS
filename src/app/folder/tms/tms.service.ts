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
export class TmsService {
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


 getTaskList(userId){
   return this.http.get(environment.url + 'task/getmytasks' + '?userid=' + userId, this.httpOptions)
   .map(Response =>
    {return Response}).catch(this.handleErrors);
 }

 taskDes(id){
  return this.http.get(environment.url + 'task/gettaskdetails/'+ id, this.httpOptions)
  .map(Response =>
   {return Response}).catch(this.handleErrors);
}

 updateTaskStatus(id, status){
  return this.http.put(environment.url + 'task/updatetaskstatus/' + id + '/'+ status, this.httpOptions)
  .map(Response =>
   {return Response}).catch(this.handleErrors);
 }

 lastTaskStatus(id){
  return this.http.get(environment.url + 'task/laststatus/'+ id, this.httpOptions)
  .map(Response =>
   {return Response}).catch(this.handleErrors);
 }

 timeSpent(id){
  return this.http.get(environment.url + 'task/gettimespentintask/'+ id, this.httpOptions)
  .map(Response =>
   {return Response}).catch(this.handleErrors);
 }
 

  private handleErrors (error: Response | any) {
    console.log(error.error.message)
    return Observable.throw(error.error.message || 'backend server error');
  }
}


