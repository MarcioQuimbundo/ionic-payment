import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactPage } from './contact';
import {Ionic2RatingModule} from "ionic2-rating";

@NgModule({
  declarations: [
    ContactPage,
  ],
  imports: [
    Ionic2RatingModule,
    IonicPageModule.forChild(ContactPage),
  ],
})
export class ContactPageModule {}
