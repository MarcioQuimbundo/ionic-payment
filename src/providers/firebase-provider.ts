import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database-deprecated';

import {AuthProvider} from "./auth/auth";

import * as moment from 'moment';

@Injectable()
export class FirebaseProvider {

  date = new Date();
  yearDate: any = new Date(this.date.getTime()).getFullYear();

  constructor(public afd: AngularFireDatabase,
              private authData: AuthProvider) {
  }

  getOtoparks() {
    return this.afd.list('/parks/');
  }

  getPaymentsArchive() {
    const userid = this.authData.showUser().uid;
    return this.afd.list(`/users/${userid}/userPayments/`);
  }

  getUserActivity() {
    const userid = this.authData.showUser().uid;
    const key = "active";
    return this.afd.object(`/users/${userid}/userInfos/${key}/`);
  }

  closeDatabase() {
    this.afd.database.goOffline();
  }

  getUserProfileDetails() {
    const userid = this.authData.showUser().uid;
    return this.afd.object(`users/${userid}/userInfos`);
  }

  getUserSubsbcriptions() {
    const userid = this.authData.showUser().uid;
    return this.afd.list(`users/${userid}/userPayments`)
  }

  getUserProfile() {
    const userid = this.authData.showUser().uid;
    return this.afd.object(`users/${userid}`);
  }
}
