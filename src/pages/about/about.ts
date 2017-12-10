import {Component} from '@angular/core';
import {IonicPage, NavController, ToastController, AlertController, LoadingController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {AuthProvider} from "../../providers/auth/auth";
import {FirebaseProvider} from "../../providers/firebase-provider";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {AngularFireDatabase} from "angularfire2/database-deprecated";
import {FirebaseObjectObservable} from "angularfire2/database-deprecated";
import "rxjs/Rx";
import * as moment from 'moment';
import {PaymentsPage} from "../payments/payments";
import {PaymentSuccessPage} from "../payment-success/payment-success";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  selectedOtopark: any[] = [];
  selectedOtoparkForCurrent: any[] = [];

  userProfileData: FirebaseObjectObservable<any>;
  userProfileWallet: any = 0;
  userDefaultCarType: any;
  userDefaultCarPlate: any;

  userActivityData: FirebaseObjectObservable<any>;
  userActivityActive: any;
  userActivityCarType: any;
  userActivityLoginTime: any;
  userActivityLogoutTime: any;
  userActivityParkQr: any;

  rangeOfUserLoginandLogoutDates: any;
  userPayment: any = 0;
  value: any;
  rangeAsHours: any;
  checked: boolean = false;


  constructor(private navCtrl: NavController,
              private firebaseProvider: FirebaseProvider,
              private authCtrl: AuthProvider,
              private barcodeScanner: BarcodeScanner,
              private toastCtrl: ToastController,
              private afDatabase: AngularFireDatabase,
              private storageCtrl: Storage,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) {
    this.userActivityData = this.firebaseProvider.getUserActivity();


    this.userActivityData.subscribe(data => {
      this.userActivityActive = data.active;
      this.userActivityCarType = data.carType;
      this.userActivityLoginTime = data.lastLogInOtopark;
      this.userActivityLogoutTime = data.lastLogOutOtopark;
      this.userActivityParkQr = data.parkqr;

    });


    this.userProfileData = this.firebaseProvider.getUserProfileDetails();
  }

  ionViewWillEnter() {
    this.getUserInformations();
  }

  defaultCarChecked(checked) {
    if (checked == true) {
      this.checked = true;
    } else {
      this.checked = false;
    }
  }

  intoParkingWithDifferentCar(formData) {
    if (formData.valid) {
      let i;
      const userId = this.authCtrl.showUser().uid;
      let isSubscribe: boolean = false;
      let barcodeData = "anlikotopark-park1";
      this.firebaseProvider.getOtoparks().subscribe(data => {
        for (i = 0; i < data.length; i++) {
          if (barcodeData == (data[i]['details']['parkqr'])) {
            this.selectedOtopark = data[i];

            if (this.selectedOtopark !== null) {

              for (i = 0; i < this.selectedOtopark.length; i++) {
                if (userId == this.selectedOtopark['subUsers'][i]['userId']) {
                  isSubscribe = true;
                }
              }

              if (isSubscribe == true) {

                this.userActivityLoginTime = moment().format('DD-MM-YYYY HH:mm:ss');
                this.userInActivityOnOtopark(
                  this.userActivityLoginTime,
                  this.selectedOtopark['details']['name'],
                  formData.value.selectedCarTypes,
                  this.selectedOtopark['details']['parkqr'],
                );

                let alert = this.alertCtrl.create({
                  title: 'Teşekkürler!',
                  subTitle: 'Abone olduğunuz otoparka başarıyla giriş yaptınız.',
                  buttons: [
                    {
                      text: 'Tamam',
                      handler: data => {
                        let loader = this.loadingCtrl.create({
                          content: "Yükleniyor...",
                          duration: 1500
                        });
                        loader.present();
                      }
                    }
                  ]
                });
                alert.present();

              } else {
                this.userActivityLoginTime = moment().format('DD-MM-YYYY HH:mm:ss');
                this.userInActivityOnOtopark(
                  this.userActivityLoginTime,
                  this.selectedOtopark['details']['name'],
                  formData.value.selectedCarTypes,
                  this.selectedOtopark['details']['parkqr'],
                );

                let alert = this.alertCtrl.create({
                  title: 'Hoşgeldiniz!',
                  subTitle: 'Otoparka başarılı bir şekilde giriş yaptınız.',
                  buttons: [
                    {
                      text: 'Tamam',
                      handler: data => {
                        let loader = this.loadingCtrl.create({
                          content: "Yükleniyor...",
                          duration: 1500
                        });
                        loader.present();
                      }
                    }
                  ]
                });
                alert.present();
              }
            } else {
              const toast = this.toastCtrl.create({
                message: "Otopark bulunamadı.",
                duration: 1500,
                position: 'bottom'
              });
              toast.present();
            }
          }
        }
      });
    }
  }

  intoParkingWithDefaultCar() {

    let i;
    const userId = this.authCtrl.showUser().uid;
    let isSubscribe: boolean = false;
    let barcodeData = "anlikotopark-park1";
    this.firebaseProvider.getOtoparks().subscribe(data => {
      for (i = 0; i < data.length; i++) {
        if (barcodeData == (data[i]['details']['parkqr'])) {
          this.selectedOtopark = data[i];

          if (this.selectedOtopark !== null) {

            for (i = 0; i < this.selectedOtopark.length; i++) {
              if (userId == this.selectedOtopark['subUsers'][i]['userId']) {
                isSubscribe = true;
              }
            }

            if (isSubscribe == true) {

              this.userActivityLoginTime = moment().format('DD/MM/YYYY HH:mm:ss');
              this.userInActivityOnOtopark(
                this.userActivityLoginTime,
                this.selectedOtopark['details']['name'],
                this.userDefaultCarType,
                this.selectedOtopark['details']['parkqr'],
              );

              let alert = this.alertCtrl.create({
                title: 'Teşekkürler!',
                subTitle: 'Abone olduğunuz otoparka başarıyla giriş yaptınız.',
                buttons: [
                  {
                    text: 'Tamam',
                    handler: data => {
                      let loader = this.loadingCtrl.create({
                        content: "Yükleniyor...",
                        duration: 1500
                      });
                      loader.present();
                    }
                  }
                ]
              });
              alert.present();

            } else {
              this.userActivityLoginTime = moment().format('DD/MM/YYYY HH:mm:ss');
              this.userInActivityOnOtopark(
                this.userActivityLoginTime,
                this.selectedOtopark['details']['name'],
                this.userDefaultCarType,
                this.selectedOtopark['details']['parkqr'],
              );

              let alert = this.alertCtrl.create({
                title: 'Hoşgeldiniz!',
                subTitle: 'Otoparka başarılı bir şekilde giriş yaptınız.',
                buttons: [
                  {
                    text: 'Tamam',
                    handler: data => {
                      let loader = this.loadingCtrl.create({
                        content: "Yükleniyor...",
                        duration: 1500
                      });
                      loader.present();
                    }
                  }
                ]
              });
              alert.present();
            }
          } else {
            const toast = this.toastCtrl.create({
              message: "Otopark bulunamadı.",
              duration: 1500,
              position: 'bottom'
            });
            toast.present();
          }
        }
      }
    });
  }

  getUserInformations() {
    this.userProfileData.subscribe(data => {
      this.userProfileWallet = data.wallet;
      this.userDefaultCarType = data.carType;
      this.userDefaultCarPlate = data.plate;
    });
  }

  userInActivityOnOtopark(lastLogInOtopark?: any, parkName?: any, carType?: any, parkqr?: any,) {
    const userId = this.authCtrl.showUser().uid;
    this.afDatabase.database.ref(`users/${userId}/userInfos/active`).update({
      lastLogInOtopark: lastLogInOtopark,
      active: true,
      parkName: parkName,
      carType: carType,
      parkqr: parkqr
    });
  }

  userOutActivityOnOtopark(param1?: any) {
    const userId = this.authCtrl.showUser().uid;
    this.afDatabase.database.ref(`users/${userId}/userInfos/active`).update({
      lastLogOutOtopark: param1,
      active: false,
    });
  }

  outParking() {
    const confirm = this.alertCtrl.create({
      title: 'Çıkış yap',
      message: 'Ödeme yapıp otoparktan ayrılmak istiyor musunuz?',
      buttons: [
        {
          text: 'Hayır',
          handler: () => {
          }
        },
        {
          text: 'Evet',
          handler: () => {
            let i;
            let tempData: any[] = [];
            const userId = this.authCtrl.showUser().uid;
            let isSubscribe: boolean = false;
            let barcodeData = "anlikotopark-park1";

            this.firebaseProvider.getOtoparks().subscribe(data => {
              for (i = 0; i < data.length; i++) {
                if (barcodeData == (data[i]['details']['parkqr'])) {
                  this.selectedOtopark = data[i];
                }
              }

              for (let prop in this.selectedOtopark['subUsers']) {
                if (this.selectedOtopark['subUsers'].hasOwnProperty(prop)) {
                  tempData.push(this.selectedOtopark['subUsers'][prop]);
                }
              }

              if (tempData.length > 0) {
                for (let i = 0; i < tempData.length; i++) {
                  if (tempData[i]['userId'] == userId) {
                    if (tempData[i]['status'] == 'active') {
                      isSubscribe = true;
                    }
                  }
                }
              }

              if (this.selectedOtopark !== undefined) {
                console.log("1");

                if (isSubscribe == true) {
                  this.userActivityLogoutTime = moment().format('DD-MM-YYYY HH:mm:ss');
                  this.storageCtrl.set('true', isSubscribe);
                  this.userOutActivityOnOtopark(this.userActivityLogoutTime);
                  this.navCtrl.setRoot(PaymentSuccessPage);
                } else {
                  console.log("2");

                  this.userActivityLogoutTime = moment().format('DD-MM-YYYY HH:mm:ss'); // user çıkış anı

                  this.rangeOfUserLoginandLogoutDates = moment(this.userActivityLogoutTime, "DD-MM-YYYY HH:mm:ss")
                    .diff(moment(this.userActivityLoginTime, "DD-MM-YYYY HH:mm:ss"));  //user'ın giriş çıkış aralığı ms

                  this.rangeAsHours = Math.floor(moment.duration(this.rangeOfUserLoginandLogoutDates).asHours()); //user'ın giriş çıkış aralığı saat

                  this.userPayment = this.selectedOtopark['prices']['daily'][`${this.userActivityCarType}`][`${this.rangeAsHours}`];

                  if (this.userPayment > this.userProfileWallet) {
                    let alert = this.alertCtrl.create({
                      title: 'Yetersiz bakiye!',
                      subTitle: 'Bakiyeniz yetersiz, lütfen bakiye yükleyip tekrar deneyiniz!',
                      buttons: ['Tamam']
                    });
                    alert.present();
                  }
                  else {

                    console.log("aaaaaaaaaaaAAAAaaa");

                    this.userProfileWallet = this.userProfileWallet - this.userPayment;

                    console.log(this.selectedOtopark);

                    this.cashUpdate(this.userProfileWallet);
                    this.userOutActivityOnOtopark(this.userActivityLogoutTime);
                    this.setPaymentToArchive(this.userPayment, this.selectedOtopark['details']['name'],
                      this.userActivityLoginTime, this.userActivityLogoutTime, this.userActivityCarType, this.selectedOtopark['details']['sehir']);

                    this.navCtrl.setRoot(PaymentSuccessPage, {
                      userPayment: this.userPayment,
                      selectedOtopark: this.selectedOtopark,
                      isSubscribe: isSubscribe
                    });
                  }

                }
              } else {
                const toast = this.toastCtrl.create({
                  message: 'Otopark bulunamadı.',
                  duration: 3000,
                  position: 'top'
                });
                toast.present();
              }
            });
          }
        }

      ]
    });
    confirm.present();
  }

  cashUpdate(data: number) {
    const userId = this.authCtrl.showUser().uid;
    this.afDatabase.database.ref(`users/${userId}/userInfos`).update({
      wallet: data
    });
  }

  rotatePaymentsPage() {
    this.navCtrl.push(PaymentsPage);
  }

  setPaymentToArchive(payment ?: any, otoparkName ?: any, loginTime ?: any,
                      logoutTime ?: any, carType ?: any, subCity ?: any) {

    let paymentYear = moment().format('YYYY');
    let paymentMonth = moment().format('MM');

    const userId = this.authCtrl.showUser().uid;
    this.afDatabase.database.ref(`users/${userId}/userPayments/${paymentYear}/${paymentMonth}/userDailyPayments`).push({
      payment: payment,
      otoparkName: otoparkName,
      loginTime: loginTime,
      logoutTime: logoutTime,
      carType: carType,
      subCity: subCity,
      rated: false
    });

  }
}
