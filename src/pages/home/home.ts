import {Component, ElementRef, ViewChild} from '@angular/core';
import {Storage} from '@ionic/storage';
import {App, NavController, Platform, ToastController} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {LoginPage} from "../login/login";
import 'rxjs/add/operator/map';
import {FirebaseProvider} from "../../providers/firebase-provider";
import {OtoparkPricesPage} from "../otopark-prices/otopark-prices";

declare let google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  infoWindows: any;

  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer({
    suppressMarkers: true,
  });

  constructor(private authData: AuthProvider,
              private app: App,
              private storageCtrl: Storage,
              private platformCtrl: Platform,
              private firebaseProvide: FirebaseProvider,
              private navCtrl: NavController,
              private toastCtrl: ToastController) {
    this.infoWindows = [];
    this.storageCtrl.remove('passingData');

  }


  ionViewDidLoad() {
    this.displayMap();
  }

  displayMap() {
    let that = this;
    let markersArray = [];
    let latLng = new google.maps.LatLng(40.106334, 29.510615);
    let mapOptions = {
      center: latLng,
      disableDefaultUI: true,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
        {
          "featureType": "administrative",
          "elementType": "geometry",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "transit",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        }
      ]
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
          let pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          let info = new google.maps.InfoWindow;
          info.setContent('you are here!');
          info.setPosition(pos);
          info.open(that.map);
          setTimeout(function () {
            info.close();
          }, 1000);
          let marker = new google.maps.Marker({
            position: pos,
            map: that.map,
            icon: {url: 'assets/images/current-location.png'},
          });
          markersArray.push(marker);
          if (markersArray.length > 1) {
            for (let i = 0; i < markersArray.length - 1; i++) {
              markersArray[i].setMap(null);
            }
          }
          that.map.setCenter(pos);
          that.firebaseProvide.getOtoparks()
            .subscribe(data => {
              for (let i = 0; i < data.length; i++) {
                let position = new google.maps.LatLng(data[i]['details']['latitude'], data[i]['details']['longitude']);
                let dogwalkMarker = new google.maps.Marker({
                  position: position,
                  title: data[i]['details']['title'],
                  name: data[i]['details']['name'],
                  lat: data[i]['details']['latitude'],
                  long: data[i]['details']['longitude'],
                  parkqr: data[i]['details']['parkqr']
                });

                let records = [];

                for (let prop in data[i]['Records']) {
                  if (data[i]['Records'].hasOwnProperty(prop)) {
                    records.push(data[i]['Records'][prop]);
                  }
                }

                let currentAvailability = data[i]['details']['capacity'] - records.length;

                if (currentAvailability < 5) {
                  dogwalkMarker.setIcon('assets/images/parking-full.png');
                }
                if (currentAvailability >= 5 && currentAvailability < 25) {
                  dogwalkMarker.setIcon('assets/images/parking-half.png');
                }
                if (currentAvailability >= 25) {
                  dogwalkMarker.setIcon('assets/images/parking-free.png');
                }

                dogwalkMarker.setMap(that.map);
                let contentString = '<div id="content">' +
                  '<p color="color1">' + 'otopark: ' + '<b>' + data[i]['details']['name'] + '</b>' + '</p>' +
                  '<p color="color1">' + 'anlık müsait alan: ' + '<b>' + currentAvailability + '</b>' + '</p>';
                let infowindow = new google.maps.InfoWindow({
                  content: contentString
                });

                dogwalkMarker.addListener('click', () => {

                  that.closeAllInfoWindows();
                  that.passingData(dogwalkMarker.valueOf().parkqr);
                  infowindow.open(that.map, dogwalkMarker);
                  that.infoWindows.push(infowindow);
                  that.directionsService.route({
                    origin: pos,
                    destination: position,
                    travelMode: google.maps.TravelMode['DRIVING']
                  }, (res, status) => {
                    if (status == google.maps.DirectionsStatus.OK) {
                      that.directionsDisplay.setDirections(res);
                    } else {
                    }
                  });
                  that.directionsDisplay.setMap(that.map);
                });
              }
            });
        }
      )
    }
  }

  closeAllInfoWindows() {
    for (let window of this.infoWindows) {
      window.close();
    }
  }

  passingData(something: string) {
    this.platformCtrl.ready().then(() => {
      this.storageCtrl.set('passingData', something);
    });
  }

  rotateDetailsPage() {
    this.storageCtrl.get('passingData').then(data => {
      if (data != null) {
        this.navCtrl.push(OtoparkPricesPage);
      } else {
        const toast = this.toastCtrl.create({
          message: 'Lütfen bir otopark seçiniz.',
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
    });
  }

  logout() {
    this.authData.logoutUser();
    this.app.getRootNav().setRoot(LoginPage);
  }
}
