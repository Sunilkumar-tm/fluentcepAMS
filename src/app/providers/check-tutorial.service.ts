import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class CheckTutorial implements CanLoad {
  constructor(private storage: Storage, private router: Router) {}

  canLoad() {
    return this.storage.get('ion_did_login').then(res => {
      // console.log(res)
      if (res) {
        this.router.navigate(['/folder/punch/in/' + window.localStorage.getItem('AtteType')]);
        return false;
      } else {
        return true;
      }
    });
  }
}
