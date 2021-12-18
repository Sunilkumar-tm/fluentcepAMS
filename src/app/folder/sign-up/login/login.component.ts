import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpService } from '../sign-up.service';
import { Storage } from '@ionic/storage';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  name: any;
  pass: any;
  showSpinner: boolean = false;
  errMsg: any;

  constructor(private router: Router,
              public loginSer: SignUpService,
              private storage: Storage,
              private nativeStorage: NativeStorage
    ) { }

  ngOnInit() {}

  login(){
    this.showSpinner = true;
    let loginData = {UserName:this.name,
                      Password:this.pass
                    }
    this.loginSer.login(loginData).subscribe(res=>{
      if(res['data']){
        console.log(res['data']);
      this.showSpinner = false;
      }
      this.storage.set('ion_did_login', false);
      window.localStorage.setItem('token', res['data'].token);
      window.localStorage.setItem('loginDetails', res['data']);
      window.localStorage.setItem('userId', res['data'].userid);
      window.localStorage.setItem('AtteType',res['data'].MWM_type);
      window.localStorage.setItem('empId',res['data'].user2employee);
      window.localStorage.setItem('siteId',res['data'].siteid);
      // window.localStorage.setItem('user2employee',res['data'].user2employee);
      window.localStorage.setItem('companyId',res['data'].employee2company);
      window.localStorage.setItem('companyLat',res['data'].companylat);
      window.localStorage.setItem('companyLon',res['data'].companylon);

      if(res['data'] && (window.localStorage.getItem('AtteType') == 'AMS')){   // comment this 3 line when buiding apk for Tms
        // this.router.navigateByUrl('/folder/punch/in/' + window.localStorage.getItem('AtteType'));
        this.router.navigateByUrl('/folder/attendanceRep/rep');
      }else{ this.errMsg = 'Invalid Credentials'}

      // if(res['data'] && (window.localStorage.getItem('AtteType') == 'TMS')){     // comment this 3 line when buiding apk for ams
      //   this.router.navigateByUrl('/folder/tms/mytask');
      // }else{ this.errMsg = 'Invalid Credentials'}

    },
    error => {
      this.showSpinner = false;
      this.errMsg = (error.error.data);
    });
  }
 

  register(){
    this.router.navigate(['/folder/signUp/register']);
  }
}
