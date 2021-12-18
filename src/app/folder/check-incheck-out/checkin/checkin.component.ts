import { Component, OnInit } from '@angular/core';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation/ngx';
import {HttpClient} from '@angular/common/http';
import { CheckIncheckOutService } from '../check-incheck-out.service';
import { Storage } from '@ionic/storage';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { TmsService } from '../../tms/tms.service';
import { AlertController } from '@ionic/angular';
import { NativeGeocoderOptions, NativeGeocoder, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss'],
})
export class CheckinComponent implements OnInit {
  id: any;
  type : any =  window.localStorage.getItem('AtteType')
  lat:any;
  lng:any;
  options: GeolocationOptions;
  currentPos: Geoposition;
  currentDay: Date;
  checkoutDay: Date;
  checkInDay: Date;
  errorMsg: any;
  enableCheckOut= false;
  enableCheckIn = true;
  enableBreak = false;
  enableComplet = false;
  empId: any;
  empDetails: any;
  tasknam: any;
  breakDay: any;
  address:any;

  constructor(private geolocation: Geolocation,
              public checkSer: CheckIncheckOutService,
              private storage: Storage,
              private nativeStorage: NativeStorage,
              private router: Router,
              private route: ActivatedRoute,
              public tmsSrv: TmsService,
              public alertController: AlertController,
              private nativeGeocoder: NativeGeocoder
              ) {
                this.router.routeReuseStrategy.shouldReuseRoute = function() {
                  return false;
              };
              this.router.onSameUrlNavigation = 'reload';
    if (navigator)
    {
    navigator.geolocation.getCurrentPosition( pos => {
        this.lng = +pos.coords.longitude;
        this.lat = +pos.coords.latitude;
      });
    }

    this.nativeStorage.getItem('loginDetails').then(
    data => console.log(data),
    error => console.error(error)
  );
  // this.getUserPosition();
   }
   
//    ionViewDidEnter() {
//     this.storage.get('loginDetails').then(detai => {
//       console.log(detai);
//       this.empId = detai.details.empId;
//       console.log(this.empId)
//     });
// }

   checkIn() {
    this.enableCheckOut = true;
    this.enableCheckIn = false;
    this.enableBreak = true
    this.checkInDay = new Date();

    if(this.type == 'TMS'){
      let payLoad = { 
        "DateTime": this.checkInDay,
        "InOutStatus": "1",
        "TaskId": this.id,
        "Lat": this.lat,
        "Lon": this.lng,
        "EmpId": window.localStorage.getItem('empId'),
        "CompanyId": window.localStorage.getItem('companyId'),
      }
      this.checkSer.tmsCheckIn(payLoad).subscribe(res=>{
        // console.log(res)
      }, err=>{
        console.log(err)
      })
    }
    if(this.type == 'AMS'){
      let data = {
        "EmpId" : window.localStorage.getItem('empId'),
        "Cid": window.localStorage.getItem('companyId'),
        "ClientId": null,
        "ClientLocationId": null,
        "SubsidiaryId": null,
        "RequirementId": null,
        "Lat": this.lat,
        "Lon": this.lng,
        "InOutStatus" : 1,
        "dateTime": this.checkInDay
      }      
      this.checkSer.sendStatus(data).subscribe(res=>{
        // console.log(res)
      }, err=>{
        this.errorMsg = err
      })
    }
  }

  checkOut() {

    this.enableCheckIn = true;
    this.enableCheckOut = false;
    this.enableBreak = false
    this.checkoutDay = new Date();

    if(this.type == 'TMS'){
      let payLoad = { 
        "DateTime": this.checkoutDay,
        "InOutStatus": "0",
        "TaskId":this.id,
        "Lat": this.lat,
        "Lon": this.lng,
        "EmpId": window.localStorage.getItem('empId'),
        "CompanyId": window.localStorage.getItem('companyId'),
      }
      this.checkSer.tmsCheckIn(payLoad).subscribe(res=>{
        // console.log(res);
        this.enableComplet = true;
      }, err=>{
        console.log(err)
      })      
    }

    if(this.type == 'AMS'){
      let data = {
        "EmpId": window.localStorage.getItem('empId'),
        "Cid": window.localStorage.getItem('companyId'),
        "ClientId" : null,
        "ClientLocationId" : null,
        "SubsidiaryId": null,
        "RequirementId": null,
        "Lat": this.lat,
        "Lon": this.lng,
        "InOutStatus" : 0,
        "dateTime": this.checkoutDay
      }
      this.checkSer.sendStatus(data).subscribe(res=>{
        // console.log(res)
      }, err=>{
        this.errorMsg = err
      })
    }
  }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.currentDay = new Date();
    this.empId = window.localStorage.getItem('empId')

    if(this.type == 'AMS'){
      this.checkSer.checkInOutStatus(this.empId).subscribe(res=>{
        if(res['data'].inOutStatus == 1){
          this.enableCheckOut = true;
          this.enableCheckIn = false;
          this.checkInDay = res['data'].dateTime;
  
        }else if(res['data'].inOutStatus == 0){
          this.enableCheckIn = true;
          this.enableCheckOut = false;
          this.checkoutDay = res['data'].dateTime;
        }
      },err=>{
        console.log(err)
      })
    }
    this.getUserPosition();
  }

  getUserPosition() {
    return new Promise((resolve, reject) => {
    this.options = {
      maximumAge: 3000,
      enableHighAccuracy: true
    };

    this.geolocation.getCurrentPosition(this.options).then((pos: Geoposition) => {
      this.currentPos = pos;
      const location = {
         lat: pos.coords.latitude,
         lng: pos.coords.longitude,
         time: new Date(),
       };
      // console.log('loc', location);
      resolve(pos);
      let goptions: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
      };
      
      this.nativeGeocoder.reverseGeocode(location.lat, location.lng, goptions)
      .then((result: NativeGeocoderResult[]) => {
        this.address = "";
        var responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if (value.length > 0)
          // && key !='countryCode' && key !='subAdministrativeArea'
            responseAddress.push(value);
        }
        responseAddress.pop();
        responseAddress.reverse();
        for (let value of responseAddress) {                                                                   
          this.address += value + ", ";
        }
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) => {
        this.address = "Address Not Available!";
        // alert(this.address)
      });

     }, (err: PositionError) => {
       console.log("error : " + err.message);
       reject(err.message);
      });
     });
    }
}