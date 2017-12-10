import {Component} from '@angular/core';
import {
  IonicPage,
  NavController,
} from 'ionic-angular';

import {SubscribePage} from "../subscribe/subscribe";
import {FirebaseProvider} from "../../providers/firebase-provider";


@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})

export class EditProfilePage {

  private myData: any;

  constructor(public navCtrl: NavController,
              private firebaseProvide: FirebaseProvider) {
  }

  ionViewWillLoad() {
  }

  onSubmit(formData) {
    if (formData.valid) {
      console.log(formData.value);
      this.myData = formData.value;
    }
  }

  goSubs() {
    this.navCtrl.push(SubscribePage);
  }

}
