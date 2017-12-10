import {BrowserModule} from '@angular/platform-browser';
import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {AuthProvider} from '../providers/auth/auth';
import {HomePage} from '../pages/home/home';

import {AngularFireModule} from 'angularfire2';
import {AngularFireAuth} from 'angularfire2/auth';
import {TabsPage} from "../pages/tabs/tabs";
import {ContactPage} from "../pages/contact/contact";
import {AboutPage} from "../pages/about/about";
import {LoginPage} from "../pages/login/login";
import {GoogleMaps} from "@ionic-native/google-maps";
import {Geolocation} from "@ionic-native/geolocation";
import {HttpModule} from "@angular/http";
import {ResetPasswordPage} from "../pages/reset-password/reset-password";
import {SignupPage} from "../pages/signup/signup";
import {AngularFireDatabaseModule} from "angularfire2/database-deprecated";
import {FirebaseProvider} from "../providers/firebase-provider";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {IonicStorageModule} from "@ionic/storage";
import {PricesPage} from "../pages/prices/prices";
import {ResetPasswordPageModule} from "../pages/reset-password/reset-password.module";
import {SignupPageModule} from "../pages/signup/signup.module";
import {PaymentsPage} from "../pages/payments/payments";
import {AboutPageModule} from "../pages/about/about.module";
import {ContactPageModule} from "../pages/contact/contact.module";
import {LoginPageModule} from "../pages/login/login.module";
import {PricesPageModule} from "../pages/prices/prices.module";
import {PaymentsPageModule} from "../pages/payments/payments.module";
import {TabsPageModule} from "../pages/tabs/tabs.module";
import {PaymentSuccessPage} from "../pages/payment-success/payment-success";
import {PaymentSuccessPageModule} from "../pages/payment-success/payment-success.module";
import {HowitworksPage} from "../pages/howitworks/howitworks";
import {HowitworksPageModule} from "../pages/howitworks/howitworks.module";
import {EditProfilePage} from "../pages/edit-profile/edit-profile";
import {EditProfilePageModule} from "../pages/edit-profile/edit-profile.module";
import {SubscribePageModule} from "../pages/subscribe/subscribe.module";
import {SubscribePage} from "../pages/subscribe/subscribe";
import {Ionic2RatingModule} from "ionic2-rating";
import {PollPageModule} from "../pages/poll/poll.module";
import {PollPage} from "../pages/poll/poll";
import {Network} from '@ionic-native/network';
import {OtoparkPricesPageModule} from "../pages/otopark-prices/otopark-prices.module";
import {OtoparkPricesPage} from "../pages/otopark-prices/otopark-prices";
import {SubscriptionDetailsPageModule} from "../pages/subscription-details/subscription-details.module";
import {SubscriptionDetailsPage} from "../pages/subscription-details/subscription-details";
import {PaymentDetailsPageModule} from "../pages/payment-details/payment-details.module";
import {PaymentDetailsPage} from "../pages/payment-details/payment-details";
import {UserCarDetailsPage} from "../pages/user-car-details/user-car-details";
import {UserCarDetailsPageModule} from "../pages/user-car-details/user-car-details.module";

// AF2 Settings
const firebaseConfig = {
  apiKey: "AIzaSyATpUQTGY24qpQ8lF8wpAegNXdy55V2vUI",
  authDomain: "bitirme-app-c9355.firebaseapp.com",
  databaseURL: "https://bitirme-app-c9355.firebaseio.com",
  projectId: "bitirme-app-c9355",
  storageBucket: "bitirme-app-c9355.appspot.com",
  messagingSenderId: "937759164043"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    HttpModule,
    ResetPasswordPageModule,
    SignupPageModule,
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot(),
    AboutPageModule,
    ContactPageModule,
    LoginPageModule,
    PricesPageModule,
    PaymentsPageModule,
    TabsPageModule,
    PaymentSuccessPageModule,
    HowitworksPageModule,
    EditProfilePageModule,
    SubscribePageModule,
    Ionic2RatingModule,
    PollPageModule,
    OtoparkPricesPageModule,
    SubscriptionDetailsPageModule,
    PaymentDetailsPageModule,
    UserCarDetailsPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    AboutPage,
    ContactPage,
    LoginPage,
    ResetPasswordPage,
    SignupPage,
    PricesPage,
    PaymentsPage,
    PaymentSuccessPage,
    HowitworksPage,
    EditProfilePage,
    SubscribePage,
    PollPage,
    OtoparkPricesPage,
    SubscriptionDetailsPage,
    PaymentDetailsPage,
    UserCarDetailsPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SplashScreen,
    StatusBar,
    AuthProvider,
    Geolocation,
    GoogleMaps,
    AngularFireAuth,
    FirebaseProvider,
    BarcodeScanner,
    IonicStorageModule,
    Storage,
    Network
  ]
})
export class AppModule {
}
