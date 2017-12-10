import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentSuccessPage } from './payment-success';
import {Ionic2RatingModule} from "ionic2-rating";

@NgModule({
  declarations: [
    PaymentSuccessPage,
  ],
  imports: [
    Ionic2RatingModule,
    IonicPageModule.forChild(PaymentSuccessPage),
  ],
})
export class PaymentSuccessPageModule {}
