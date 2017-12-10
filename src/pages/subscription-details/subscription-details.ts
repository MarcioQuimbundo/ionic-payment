import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

import * as moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-subscription-details',
  templateUrl: 'subscription-details.html',
})
export class SubscriptionDetailsPage {

  data: any[] = [];
  leftDay: any;
  status: string;
  currentTime: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data = this.navParams.get("firstPassed");

    if (this.data['status'] == 'active') {
      this.status = 'Devam ediyor'
    } else {
      this.status = 'Bitmiş'
    }

    this.currentTime = moment().format('YYYY-MM-DD HH:mm:ss');

    this.leftDay = moment(this.currentTime, "YYYY-MM-DD HH:mm:ss")
      .diff(moment(this.data['userSubscriptionEndTime'], "YYYY-MM-DD HH:mm:ss"));

    this.leftDay = Math.abs(Math.floor(moment.duration(this.leftDay).asDays()));
  }

  ionViewWillEnter() {
  }

}
