import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';

import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {AngularFireAuth} from 'angularfire2/auth';
import {TabsPage} from "../pages/tabs/tabs";
import {ResetPasswordPage} from "../pages/reset-password/reset-password";
import {LoginPage} from "../pages/login/login";
import {AuthProvider} from "../providers/auth/auth";
import {AngularFireDatabase} from "angularfire2/database-deprecated";
import {PaymentsPage} from "../pages/payments/payments";
import {HowitworksPage} from "../pages/howitworks/howitworks";
import {FirebaseProvider} from "../providers/firebase-provider";
import {EditProfilePage} from "../pages/edit-profile/edit-profile";
import {PollPage} from "../pages/poll/poll";
import {PaymentSuccessPage} from "../pages/payment-success/payment-success";
import {SubscribePage} from "../pages/subscribe/subscribe";
import {ContactPage} from "../pages/contact/contact";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = LoginPage;


  pages: Array<{ title: string, component: any }>;


  constructor(platform: Platform, afAuth: AngularFireAuth, private splashScreen: SplashScreen,
              private statusBar: StatusBar, private authData: AuthProvider,
              private afDatabase: AngularFireDatabase,
              private firebaseProvider: FirebaseProvider) {
    const authObserver = afAuth.authState.subscribe(user => {
      if (user) {
        this.rootPage = TabsPage;
        authObserver.unsubscribe();
      } else {
        this.rootPage = LoginPage;
        authObserver.unsubscribe();
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.hideSplashScreen();
    });


    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Profilim', component: ContactPage},
      {title: 'Ödemelerim', component: PaymentsPage},
      {title: 'Nasıl Çalışır?', component: HowitworksPage},
      {title: 'Other Page', component: ResetPasswordPage},
      {title: 'SuccessfullyPayed', component: PaymentSuccessPage},
      {title: 'Abonelik', component: SubscribePage},
      {title: 'Poll', component: PollPage},
      {title: 'Çıkış', component: null}
    ];
  }

  hideSplashScreen() {
    if (this.splashScreen) {
      setTimeout(() => {
        this.splashScreen.hide();
      }, 100);
    }
  }

  openPage(page) {
    if (page.component) {
      this.nav.push(page.component);
    } else {

      this.authData.logoutUser().then(() => {
        this.firebaseProvider.closeDatabase();
        this.nav.setRoot(LoginPage);
      });

    }
  }
}
