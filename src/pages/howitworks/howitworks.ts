import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HowitworksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-howitworks',
  templateUrl: 'howitworks.html',
})
export class HowitworksPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HowitworksPage');
  }
  slides = [
    {
      title: "Anlık Otopark'a hoşgeldiniz!",
      description: "Anlık otopark bulunduğunuz konuma en yakın otoparkların anlık kapasitelerini sizlere gösterir.",
      image: "assets/images/howitworks1.png",
    },
    {
      title: "Rotanı çiz, hızlıca git!",
      description: "Gitmek istediğiniz otoparka tıklayarak, rotanızı çizebilir, kolaylıkla gidebilirsiniz. ",
      image: "assets/images/howitworks2.png",
    },
    {
      title: "Ödemeni QR kod ile yap!",
      description: "Anlık Otopark cüzdanınıza para yükleyebilir, anlaşmalı otoparklarımızda QR kod ile kolaylıkla ödeme yapabilirsiniz.",
      image: "assets/images/howitworks3.png",
    }
  ];
}
