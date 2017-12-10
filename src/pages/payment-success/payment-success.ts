import {Component} from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {AboutPage} from "../about/about";
import {PollPage} from "../poll/poll";
import {Storage} from '@ionic/storage';
import {FirebaseProvider} from "../../providers/firebase-provider";
import {AngularFireDatabase} from "angularfire2/database-deprecated";
import {PaymentsPage} from "../payments/payments";

@Component({
  selector: 'page-payment-success',
  templateUrl: 'payment-success.html',
})
export class PaymentSuccessPage {

  htmlStatusValue: boolean = true;
  userPayment: any;
  payedOtoparkText: any;
  payedOtoparkArray: any;

  selectedOtopark: any;

  isSubscribe: boolean;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              private storageCtrl: Storage,
              private firebaseProvide: FirebaseProvider,
              private afDatabase: AngularFireDatabase,
              private navParams: NavParams) {


    this.isSubscribe = this.navParams.get('isSubscribe');
    this.selectedOtopark = this.navParams.get('selectedOtopark');
    this.userPayment = this.navParams.get('userPayment')

    console.log(this.isSubscribe, this.selectedOtopark, this.userPayment);

  }

  ionViewWillLoad() {


  }

  getRate($event) {
    let sum: any;
    let count: any;
    let average: any;

    sum = this.selectedOtopark['rates']['sum'];
    sum = sum + $event;
    count = this.selectedOtopark['rates']['count'];
    count++;
    average = sum / count;

      this.afDatabase.database.ref(`parks/${this.selectedOtopark['details']['parkqr']}/rates`).update({
        sum: sum,
        count: count,
        average: average
      });


  }

  rotateAboutPage() {
    this.navCtrl.setRoot(AboutPage);
  }

  routePollPage() {
    this.navCtrl.setRoot(PollPage);
  }

  rotatePaymentsPage() {
    this.navCtrl.push(PaymentsPage);
  }
}
