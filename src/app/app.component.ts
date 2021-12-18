import { Component, OnInit } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  slice: number;
  type : any =  window.localStorage.getItem('AtteType')
  backButtonSubscription;
  mySubscription: any;
  
  public appPages = [
    {
      title: 'Report',
      url: '/folder/attendanceRep/rep',
      icon: 'documents'
    },
    {
      title: 'Attendance',
      url: '/folder/punch/in/AMS',
      icon: 'calendar'
    },
    // {
    //   title: 'TMS',
    //   url: '/folder/tms/mytask',
    //   icon: 'alarm'
    // },
    {
      title: 'Leaves',
      url: '/folder/leave/lea',
      icon: 'today'
    },
    {
      title: 'About',
      url: '/folder/signUp/about',
      icon: 'information-circle'
    },
    // {
    //   title: 'Logout',
    //   url: '/folder/signUp/login',
    //   icon: 'log-out'
    // }
  ];
  public labels = [
    {
      title: 'Attendance',
      url: '/folder/punch/in/AMS',
      icon: 'calendar'
    },
    {
      title: 'TMS',
      url: '/folder/tms/mytask',
      icon: 'alarm'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public alertController: AlertController,
    private storage: Storage,
    private route: ActivatedRoute
  ) {
    this.initializeApp();
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
  };
  this.mySubscription = this.router.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      // Trick the Router into believing it's last link wasn't previously loaded
      this.router.navigated = false;
    }
  });
  this.router.onSameUrlNavigation = 'reload';
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

 

  ngOnInit() {
    // if(this.type == 'AMS'){
    //   this.appPages.unshift(
    //     {
    //         title: 'Attendance',
    //         url: '/folder/punch/in/AMS',
    //         icon: 'calendar'
    //     },
    //   )
    // }else if(this.type == 'TMS'){
    //   this.appPages.unshift(
    //     {
    //         title: 'TMS',
    //         url: '/folder/punch/in/TMS',
    //         icon: 'alarm'
    //     },
    //   )
    // }
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  async logout(){
    this.storage.set('ion_did_login', false);
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Confirm Exit',
        message: 'Are you sure want to exit?',
        buttons: [{
          text: "Exit",
          handler: () => {
            // this.router.navigateByUrl('/folder/signUp/login'); 
            navigator['app'].exitApp();
            // this.logOutApp();
           }
        }, {
          text: "Cancel",
          role: 'cancel'
        }]
      });
  
      await alert.present();
      
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('AtteType');
    window.localStorage.removeItem('empId');
    window.localStorage.removeItem('clientId');
    window.localStorage.removeItem('companyId');
    window.localStorage.removeItem('cid');
    window.localStorage.removeItem('subsidiaryId');
    window.localStorage.removeItem('loginDetails');

    // this.router.navigateByUrl('/folder/signUp/login');
  }

  // ngAfterViewInit() {
  //   this.backButtonSubscription = this.platform.backButton.subscribe(() => {
  //     navigator['app'].exitApp();
  //   });
  // }

  ngOnDestroy() { 
    // this.backButtonSubscription.unsubscribe();
  }
}
