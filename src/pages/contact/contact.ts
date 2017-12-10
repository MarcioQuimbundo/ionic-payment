import {Component} from '@angular/core';
import {AlertController, NavController, NavParams, ToastController} from 'ionic-angular';
import 'rxjs/add/operator/map';
import {AngularFireDatabase} from "angularfire2/database-deprecated";
import {FirebaseProvider} from "../../providers/firebase-provider";
import {SubscribePage} from "../subscribe/subscribe";
import {SubscriptionDetailsPage} from "../subscription-details/subscription-details";
import {UserCarDetailsPage} from "../user-car-details/user-car-details";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  profileData: any[] = []
  userInfos: any[] = [];
  userPayments: any[] = [];
  userSubs: any[] = [];

  countOfSubs: any = 0;
  userSubscriptionsAsArray: any [] = [];
  noSubscriptionResponse: boolean = false;

  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              private afDatabase: AngularFireDatabase,
              private firebaseProvider: FirebaseProvider,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController) {
    this.firebaseProvider.getUserProfile().subscribe(data => {
      this.profileData = data;
      this.userInfos = this.profileData['userInfos'];
      this.userSubs = this.profileData['userSubs'];
      this.userPayments = this.profileData['userPayments'];

      for (let prop in this.userSubs) {
        if (this.userSubs.hasOwnProperty(prop)) {
          this.userSubscriptionsAsArray.push(this.userSubs[prop]);
        }
      }

      for (let i = 0; i < this.userSubscriptionsAsArray.length; i++) {
        if (this.userSubscriptionsAsArray[i]['status'] == 'active') {
          this.countOfSubs++;
        }
      }

      if (this.countOfSubs == 0) {
        this.noSubscriptionResponse = true;
      }

    });
  }

  ionViewWillEnter() {
  }

  selectedOtoparkDetails(data) {
    this.navCtrl.push(SubscriptionDetailsPage, {
      firstPassed: data
    });
  }

  rotateSubsPage() {
    this.navCtrl.push(SubscribePage);
  }

  rotateCarsPage() {
    this.navCtrl.push(UserCarDetailsPage, {
      carType: this.userInfos['carType'],
      plate: this.userInfos['plate']
    });
  }

}
