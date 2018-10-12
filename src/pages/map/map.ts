import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.loadMap();
    this.displayMarkers();
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
      iconUrl: '/assets/imgs/redpin.png',
      shadowUrl: '/assets/imgs/redpin.png',
      iconSize:     [45, 95],
      shadowSize:   [45, 95],
      iconAnchor:   [22, 95],
      shadowAnchor: [22, 95],
      popupAnchor:  [-3, -76]
    });
    let markerGroup = leaflet.featureGroup();
    let marker: any = leaflet.marker([50.815941, 19.117404], {icon: markerIcon}).on('click', () => {
      alert('Temp functionality - add popup or something else');
    })
    markerGroup.addLayer(marker);
    this.pollutionmap.addLayer(markerGroup);
  }

}
