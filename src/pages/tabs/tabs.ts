import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root: any = HomePage;
  tab2Root: any = AboutPage;


  constructor() {
  }

  ionViewDidLoad() {
  }

}
