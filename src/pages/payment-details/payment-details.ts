import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {PollPage} from "../poll/poll";

@IonicPage()
@Component({
  selector: 'page-payment-details',
  templateUrl: 'payment-details.html',
})
export class PaymentDetailsPage {

  data: any[] = [];
  dataDetails: any[] = [];
  status: any;
  type: any;
  key: any;
  rateIsValid: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {

    this.dataDetails[0] = this.navParams.get("firstPassed");
    this.type = this.navParams.get("type");
    this.data = this.dataDetails[0];
    this.dataDetails.map(item => {
      this.key = item.$key;
    });

    if (this.data['rated'] == true) {
      this.rateIsValid = true;
    }

    if (this.data['status'] == 'active') {
      this.status = 'Devam ediyor'
    } else {
      this.status = 'Bitmiş'
    }
  }

  ionViewDidLoad() {
  }

  rotatePollPage() {
    this.navCtrl.push(PollPage, {
      key: this.key
    });
  }


}
