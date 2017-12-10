import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserCarDetailsPage } from './user-car-details';

@NgModule({
  declarations: [
    UserCarDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(UserCarDetailsPage),
  ],
})
export class UserCarDetailsPageModule {}
