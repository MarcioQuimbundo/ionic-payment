import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database-deprecated";
import {AuthProvider} from "../../providers/auth/auth";
import * as moment from 'moment';
import {SubscriptionDetailsPage} from "../subscription-details/subscription-details";
import {PaymentDetailsPage} from "../payment-details/payment-details";


@IonicPage()
@Component({
  selector: 'page-payments',
  templateUrl: 'payments.html',
})
export class PaymentsPage {

  subscriptionArchive: any[] = [];
  dailyArchive: any[] = [];

  months: any[] = [];
  years: any[] = [];

  selectedYear: any;
  selectedMonth: any;

  value: boolean = true;
  noSubscriptionResponse: boolean = false;
  noDailyResponse: boolean = false;
  ifChangeDate: boolean = false;

  selectedYears: any;
  selectedMonths: any;

  selectedSegment: string;

  constructor(private angularFireDatabase: AngularFireDatabase,
              private authData: AuthProvider,
              private navCtrl: NavController) {

    this.years = [
      {
        key: 1,
        value: "2016"
      },
      {
        key: 2,
        value: "2017"
      },
    ];
    this.months = [
      {
        key: 1,
        value: "Ocak"
      },
      {
        key: 2,
        value: "Şubat"
      },
      {
        key: 3,
        value: "Mart"
      },
      {
        key: 4,
        value: "Nisan"
      },
      {
        key: 5,
        value: "Mayıs"
      },
      {
        key: 6,
        value: "Haziran"
      },
      {
        key: 7,
        value: "Temmuz"
      },
      {
        key: 8,
        value: "Ağustos"
      },
      {
        key: 9,
        value: "Eylül"
      },
      {
        key: 10,
        value: "Ekim"
      },
      {
        key: 11,
        value: "Kasım"
      },
      {
        key: 12,
        value: "Aralık"
      },

    ];

    this.selectedSegment = 'daily';

    this.selectedYears = moment().format('YYYY');
    this.selectedMonths = moment().format('MM');
  }

  ionViewWillEnter() {
  }

  getSelectedYears(selectedYears) {
    this.ifChangeDate = false;
    this.subscriptionArchive = [];
    this.dailyArchive = [];
    this.selectedYear = selectedYears;
  }

  getSelectedMonths(selectedMonths) {
    this.ifChangeDate = false;
    this.subscriptionArchive = [];
    this.dailyArchive = [];
    this.selectedMonth = selectedMonths;
  }

  getPayments() {
    this.ifChangeDate = true;
    this.getPaymentsFromArchive(this.selectedYear, this.selectedMonth);
  }

  getPaymentsFromArchive(year: any, month: any) {
    const userid = this.authData.showUser().uid;
    if (year == undefined && month == undefined) {
      this.angularFireDatabase.list(`/users/${userid}/userPayments/${this.selectedYears}/${this.selectedMonths}/userSubscriptions`).subscribe(data => {
        if (data.length == 0) {
          this.noSubscriptionResponse = true;
        } else {

          this.subscriptionArchive = data;

          console.log(this.subscriptionArchive);
          this.subscriptionArchive.map(item => {
            console.log(item.$key);
          });
          this.noSubscriptionResponse = false;
        }
      });
      this.angularFireDatabase.list(`/users/${userid}/userPayments/${this.selectedYears}/${this.selectedMonths}/userDailyPayments`).subscribe(data => {
        if (data.length == 0) {
          this.noDailyResponse = true;
        } else {

          this.dailyArchive = data;
          console.log(this.dailyArchive);



          this.noDailyResponse = false;
        }
      });
    } else {
      this.angularFireDatabase.list(`/users/${userid}/userPayments/${this.selectedYears}/${this.selectedMonths}/userSubscriptions`).subscribe(data => {
        if (data.length == 0) {
          this.noSubscriptionResponse = true;
        } else {
          this.subscriptionArchive = data;
          this.noSubscriptionResponse = false;
        }
      });
      this.angularFireDatabase.list(`/users/${userid}/userPayments/${this.selectedYears}/${this.selectedMonths}/userDailyPayments`).subscribe(data => {
        if (data.length == 0) {
          this.noDailyResponse = true;
        } else {
          this.dailyArchive = data;
          this.noDailyResponse = false;
        }
      });
    }
  }

  selectedSubscriptionDetails(data) {
    this.navCtrl.push(PaymentDetailsPage, {
      firstPassed: data,
      type: "subs"
    });
  }

  selectedDailyArchiveDetails(data) {
    this.navCtrl.push(PaymentDetailsPage, {
      firstPassed: data,
      type: "daily"
    });
  }
}
