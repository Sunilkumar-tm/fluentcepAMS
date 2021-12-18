import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  // token: string;
  // httpOptions: { headers: HttpHeaders; };

   constructor(private http: HttpClient) {
    // this.httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/json',
    //     'Authorization': 'Bearer ' + <string>localStorage.getItem('token')
    //   })
    // };
  }


  login(data){
    return this.http.post(environment.urlPHP + 'auth/login', data);
    // .map(Response =>
    //   {return Response}).catch(this.handleErrors);
  }
 

  // private handleErrors (error: Response | any) {
  //   console.log(error.error.message)
  //   return Observable.throw(error.error.message || 'backend server error');
  // }
}


