import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FirebaseProvider} from "../../providers/firebase-provider";
import {Storage} from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-otopark-prices',
  templateUrl: 'otopark-prices.html',
})
export class OtoparkPricesPage {

  otoparkPricesDailyPrices: any[] = [];
  otoparkPricesSubsPrice: any[] = [];

  selectedOtoparkQR: any;

  subType1: any;
  subType2: any;
  subType3: any;
  subType4: any;

  subTypePayment1: any;
  subTypePayment2: any;
  subTypePayment3: any;
  subTypePayment4: any;

  dailyType0: any = 0;
  dailyType1: any;
  dailyType2: any;
  dailyType3: any;
  dailyType4: any;
  dailyType5: any;

  dailyType1Payment: any;
  dailyType2Payment: any;
  dailyType3Payment: any;
  dailyType4Payment: any;
  dailyType5Payment: any;

  responseBoolean: boolean = false;
  selectedSegment: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private firebaseProvider: FirebaseProvider,
              private storageCtrl: Storage) {
    this.selectedSegment = 'daily';
    this.storageCtrl.get('passingData').then((data) => {
      this.selectedOtoparkQR = data;
    });
  }

  ionViewWillEnter() {
    this.getOtoparkPrices();
  }

  getCarType(selectedType) {
    this.getOtoparkDailyPrices(this.otoparkPricesDailyPrices[`${selectedType}`]);
  }

  getOtoparkPrices() {
    this.firebaseProvider.getOtoparks().subscribe(data => {

      for (let i = 0; i < data.length; i++) {
        if (this.selectedOtoparkQR == (data[i]['details']['parkqr'])) {
          this.otoparkPricesDailyPrices = data[i]['prices']['daily'];
          this.otoparkPricesSubsPrice = data[i]['prices']['subs'];
        }
      }

      this.subType1 = this.otoparkPricesSubsPrice['subsType'][1];
      this.subType2 = this.otoparkPricesSubsPrice['subsType'][2];
      this.subType3 = this.otoparkPricesSubsPrice['subsType'][3];
      this.subType4 = this.otoparkPricesSubsPrice['subsType'][4];

      this.subTypePayment1 = this.otoparkPricesSubsPrice[`${this.subType1}`];
      this.subTypePayment2 = this.otoparkPricesSubsPrice[`${this.subType2}`];
      this.subTypePayment3 = this.otoparkPricesSubsPrice[`${this.subType3}`];
      this.subTypePayment4 = this.otoparkPricesSubsPrice[`${this.subType4}`];

    });
  }

  getOtoparkDailyPrices(selectedType) {

    let result = [];
    for (let x = 0; x < selectedType.length; x++) {
      if (result.indexOf(selectedType[x]) == -1)
        result.push(selectedType[x]);
    }

    let counts = {};
    selectedType.forEach(function (x) {
      counts[x] = (counts[x] || 0) + 1;
    });

    this.dailyType1Payment = result[0];
    this.dailyType2Payment = result[1];
    this.dailyType3Payment = result[2];
    this.dailyType4Payment = result[3];
    this.dailyType5Payment = result[4];


    this.dailyType1 = counts[this.dailyType1Payment];
    this.dailyType2 = counts[this.dailyType2Payment] + this.dailyType1;
    this.dailyType3 = counts[this.dailyType3Payment] + this.dailyType2;
    this.dailyType4 = counts[this.dailyType4Payment] + this.dailyType3;
    this.dailyType5 = counts[this.dailyType5Payment] + this.dailyType4;

    this.responseBoolean = true;
  }
}
