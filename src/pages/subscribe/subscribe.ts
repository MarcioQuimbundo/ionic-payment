import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {FirebaseProvider} from "../../providers/firebase-provider";
import {AngularFireDatabase} from "angularfire2/database-deprecated";
import {AuthProvider} from "../../providers/auth/auth";
import {TabsPage} from "../tabs/tabs";
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-subscribe',
  templateUrl: 'subscribe.html',
})
export class SubscribePage {

  userProfileData: any[] = [];
  cities: any[] = [];
  parks: any[] = [];
  subtypes: any[] = [];
  paymentInfoValue: boolean = false;
  payment: any;

  selectedCity: any;
  selectedPark: any;
  selectedSubType: any;

  selectedParkCode: any;

  termsAgreedConfirmation: boolean;
  countOfSubs: any;

  userSubscriptionStartTime: any;
  userSubscriptionEndTime: any;

  selectedYears: any;
  selectedMonths: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private firebaseProvider: FirebaseProvider,
              private angularFireDatabase: AngularFireDatabase,
              private authData: AuthProvider,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController) {
    this.getCities();
    this.selectedYears = moment().format('YYYY');
    this.selectedMonths = moment().format('MM');
  }

  ionViewDidLoad() {
  }

  getCities() {
    let i: any;
    this.firebaseProvider.getOtoparks()
      .subscribe(data => {
        for (i = 0; i < data.length; i++) {
          this.cities.push({
              name: data[i]['details']['sehir'],
              value: i,
            }
          );
        }
      });
  }

  getSelectedParks(selectedCities) {
    let i: any;
    this.parks.length = 0;
    this.selectedCity = selectedCities;

    this.firebaseProvider.getOtoparks()
      .subscribe(data => {
        for (i = 0; i < data.length; i++) {
          if (selectedCities == data[i]['details']['sehir']) {
            this.selectedParkCode = data[i]['details']['parkqr'];
            this.parks.push({
                name: data[i]['details']['name'],
                value: i,
              }
            );
          }
        }
      });
  }

  getSelectedSubType(selectedParks) {
    let i, j: any;
    this.subtypes.length = 0;
    this.selectedPark = selectedParks;

    this.firebaseProvider.getOtoparks()
      .subscribe(data => {
        for (i = 0; i < data.length; i++) {
          if (selectedParks == data[i]['details']['name']) {
            for (j = 1; j < 5; j++) {
              this.subtypes.push({
                  name: data[i]['prices']['subs']['subsType'][j],
                  value: i,
                }
              );
            }
          }
        }
      });
    console.log(this.subtypes);
  }

  getSelectedPayment(selectedSubTypes) {
    let i: any;
    this.selectedSubType = selectedSubTypes;

    this.firebaseProvider.getOtoparks()
      .subscribe(data => {
        for (i = 0; i < data.length; i++) {
          if (this.selectedPark == data[i]['details']['name']) {
            this.payment = data[i]['prices']['subs'][selectedSubTypes];
            break;
          }
        }
      });
    this.paymentInfoValue = true;
  }

  getAgreedConfirmation(agreed) {
    this.termsAgreedConfirmation = agreed;
  }

  saveUserSubscription() {
    if (this.selectedPark !== undefined && this.selectedCity !== undefined && this.selectedSubType !== undefined) {
      if (this.termsAgreedConfirmation == true) {

        this.userSubscriptionStartTime = moment().format('YYYY-MM-DD HH:mm:ss');
        this.userSubscriptionEndTime = moment().add(this.selectedSubType, 'months').format('YYYY-MM-DD HH:mm:ss');

        const userid = this.authData.showUser().uid;
        this.angularFireDatabase.database.ref(`users/${userid}/userSubs/`).push({
          subPark: this.selectedPark,
          subCity: this.selectedCity,
          subType: this.selectedSubType,
          subPayment: this.payment,
          userSubscriptionStartTime: this.userSubscriptionStartTime,
          userSubscriptionEndTime: this.userSubscriptionEndTime,
          status: 'active',
          parkqr: this.selectedParkCode
        });

        this.angularFireDatabase.database.ref(`users/${userid}/userPayments/${this.selectedYears}/${this.selectedMonths}/userSubscriptions/`).push({
          subPark: this.selectedPark,
          subCity: this.selectedCity,
          subType: this.selectedSubType,
          subPayment: this.payment,
          userSubscriptionStartTime: this.userSubscriptionStartTime,
          userSubscriptionEndTime: this.userSubscriptionEndTime,
          status: 'active',
          parkqr: this.selectedParkCode

        });

        this.firebaseProvider.getOtoparks()
          .subscribe(data => {
            for (let i = 0; i < data.length; i++) {
              if (this.selectedParkCode == data[i]['details']['parkqr']) {
                this.countOfSubs = data[i]['details']['subCount'];
              }
            }
            this.countOfSubs++;
          });
        this.angularFireDatabase.database.ref(`parks/${this.selectedParkCode}/details/`).update({
          subCount: this.countOfSubs
        });
        this.angularFireDatabase.database.ref(`parks/${this.selectedParkCode}/subUsers/`).push({
          subType: this.selectedSubType,
          subPayment: this.payment,
          userSubscriptionStartTime: this.userSubscriptionStartTime,
          userSubscriptionEndTime: this.userSubscriptionEndTime,
          status: 'active',
          userId: userid
        });

        this.rotateHomePage();
      } else {
        const toast = this.toastCtrl.create({
          message: "Lütfen abonelik sözleşmesini kabul ediniz.",
          duration: 2500,
          position: 'bottom',
        });
        toast.present();
      }
    } else {
      const toast = this.toastCtrl.create({
        message: "Lütfen seçiminizi kontrol ediniz.",
        duration: 2500,
        position: 'bottom',
      });
      toast.present();
    }
  }

  rotateHomePage() {
    let loader = this.loadingCtrl.create({
      content: "Lütfen bekleyiniz...",
      duration: 1500
    });
    loader.present();

    this.navCtrl.setRoot(TabsPage);
  }

}
