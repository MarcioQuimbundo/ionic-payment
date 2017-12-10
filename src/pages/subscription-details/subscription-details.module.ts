import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubscriptionDetailsPage } from './subscription-details';

@NgModule({
  declarations: [
    SubscriptionDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(SubscriptionDetailsPage),
  ],
})
export class SubscriptionDetailsPageModule {}
