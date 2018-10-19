import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { AlertController } from 'ionic-angular';
import leaflet from 'leaflet';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('pollutionmap') mapContainer: ElementRef;
  pollutionmap: any;
  stations: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider, public alertCtrl: AlertController) {
  	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.restProvider.getStations()
    .then(data => {
      this.stations = data;
      //console.log(this.stations);
      this.displayMarkers();
    });
    this.loadMap();
    
    
  }

  loadMap() {
    this.pollutionmap = leaflet.map("pollutionmap").setView([50.815941, 19.117404], 13);
    leaflet.tileLayer('https://tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=592228c77796498ca12ddeb55ed31b85', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://thunderforest.com/">Thunderforest</a>',
      maxZoom: 18,
      id: 'thunderforest.neighbourhood',
      accessToken: '592228c77796498ca12ddeb55ed31b85'
    }).addTo(this.pollutionmap);
  }

  displayMarkers() {
    let markerIcon = leaflet.icon({
      iconUrl: '/assets/imgs/greenpin.png',
      shadowUrl: '/assets/imgs/greenpin.png',
      iconSize:     [16, 16],
      shadowSize:   [16, 16],
      iconAnchor:   [8, 8],
      shadowAnchor: [8, 8],
      popupAnchor:  [8, 8]
    });
    let markerGroup = leaflet.featureGroup();
    for(var i = 0; i < this.stations.length; i++) {
    let self = this.stations[i];
    //this.stations.foreach((element)=>{
      let marker: any = leaflet.marker([self.gegrLat, self.gegrLon], {icon: markerIcon}).on('click', () => {
      let alert = this.alertCtrl.create({
          title: `Stacja ${self.stationName}`,
          subTitle: 'Dane o stacji: Fill-in!',
          buttons: ['Oki!']
        });
        alert.present();
      })
      markerGroup.addLayer(marker);
    }
    
    this.pollutionmap.addLayer(markerGroup);
  }

}
