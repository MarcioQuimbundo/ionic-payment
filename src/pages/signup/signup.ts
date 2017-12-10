import {Component} from '@angular/core';
import {
  IonicPage,
  NavController,
  LoadingController,
  Loading,
  AlertController
} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthProvider} from '../../providers/auth/auth';
import {EmailValidator} from '../../validators/email';
import {TabsPage} from '../tabs/tabs';
import {AngularFireDatabase} from 'angularfire2/database-deprecated';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signupForm: FormGroup;
  public loading: Loading;

  constructor(public nav: NavController, public authData: AuthProvider,
              public formBuilder: FormBuilder, public loadingCtrl: LoadingController,
              public alertCtrl: AlertController, public afDatabase: AngularFireDatabase) {

    this.signupForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      firstname: [''],
      surname: ['']
    });
  }

  signupUser() {
    if (!this.signupForm.valid) {
      console.log(this.signupForm.value);
    } else {
      this.authData.signupUser(this.signupForm.value.email, this.signupForm.value.password)
        .then(() => {

          const userid = this.authData.showUser().uid;

          this.afDatabase.database.ref(`users/${userid}/userInfos/active`).update({
            active: false,
          });
          this.afDatabase.database.ref(`users/${userid}/userInfos`).update({
            firstname: this.signupForm.value.firstname,
            surname: this.signupForm.value.surname,
            wallet: 0,
            email: this.signupForm.value.email
          });

          this.nav.setRoot(TabsPage);
        }, (error) => {
          this.loading.dismiss().then(() => {
            let errorMessage: string = error.message;
            let alert = this.alertCtrl.create({
              message: errorMessage,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
            alert.present();
          });
        });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }
}
