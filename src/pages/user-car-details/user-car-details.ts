import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {FirebaseProvider} from "../../providers/firebase-provider";
import {AngularFireDatabase} from "angularfire2/database-deprecated";

@Component({
  selector: 'page-user-car-details',
  templateUrl: 'user-car-details.html',
})
export class UserCarDetailsPage {

  selectedCarTypes: any;
  plate: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private authCtrl: AuthProvider,
              private firebaseProvider: FirebaseProvider,
              private afDatabase: AngularFireDatabase) {
    this.plate = this.navParams.get("plate");
    this.selectedCarTypes = this.navParams.get("carType");

  }

  ionViewDidLoad() {
  }

  onSubmit(formData) {
    if (formData.valid) {
      const userId = this.authCtrl.showUser().uid;
      this.afDatabase.database.ref(`users/${userId}/userInfos/`).update({
        carType: formData.value.selectedCarTypes,
        plate: formData.value.plate
      });
    }
  }
}
