import {Component} from '@angular/core';
import {AlertController, NavController, NavParams, ToastController} from 'ionic-angular';
import {AboutPage} from "../about/about";
import {FirebaseProvider} from "../../providers/firebase-provider";
import {AngularFireDatabase} from "angularfire2/database-deprecated";
import {Storage} from '@ionic/storage';
import * as moment from 'moment';
import {AuthProvider} from "../../providers/auth/auth";


@Component({
  selector: 'page-poll',
  templateUrl: 'poll.html',
})
export class PollPage {

  value: any;
  payedOtopark: any;
  hygineRate: any;
  securityRate: any;
  staffRate: any;
  textArea: any;
  dataKey: any;

  constructor(public navCtrl: NavController,
              private alertCtrl: AlertController,
              private angularFireDatabase: AngularFireDatabase,
              private storageCtrl: Storage,
              private toastCtrl: ToastController,
              private authData: AuthProvider,
              private navParams: NavParams) {
    this.storageCtrl.get('payedOtopark').then((data) => {
      this.payedOtopark = data;
    });

    this.dataKey = this.navParams.get("key");

  }

  ionViewWillLoad() {
  }

  onSecurityChange($event) {
    this.securityRate = $event;
  }

  onHygineChange($event) {
    this.hygineRate = $event;
  }

  onStaffChange($event) {
    this.staffRate = $event;
  }

  onTextAreaChange($event) {
    this.textArea = $event;
  }

  goToTabsPage() {
    if (this.textArea == undefined) {
      this.textArea = "";
      if (this.securityRate == undefined || this.hygineRate == undefined || this.staffRate == undefined || this.textArea == undefined) {
        const toast = this.toastCtrl.create({
          message: "Lütfen bütün değerlendirmeleri tamamlayınız.",
          duration: 2000,
          position: 'bottom'
        });
        toast.present();
      } else {
        let paymentYear = moment().format('YYYY');
        let paymentMonth = moment().format('MM');
        const userid = this.authData.showUser().uid;

        this.angularFireDatabase.database.ref(`parks/${this.payedOtopark['details']['parkqr']}/rates/${paymentYear}/${paymentMonth}`).push({
          securityRate: this.securityRate,
          hygineRate: this.hygineRate,
          staffRate: this.staffRate,
          userComment: this.textArea,
          submitUserId: userid
        });

        this.angularFireDatabase.database.ref(`/users/${userid}/userPayments/${paymentYear}/${paymentMonth}/userDailyPayments/${this.dataKey}`).update({
          rated: true
        });

        const alert = this.alertCtrl.create({
          title: 'Teşekkürler!',
          subTitle: 'Geri dönüşünüz başarılı bir şekilde oluşturuldu!',
          buttons: [
            {
              text: 'Tamam',
              handler: data => {
                this.navCtrl.setRoot(AboutPage);
              }
            }
          ]
        });
        alert.present();
      }
    }
  }
}
