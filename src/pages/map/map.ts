import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { StationDetailsPage } from '../station-details/station-details';
import { StationObj } from '../../models/stationObj';
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
  typesOfPollutions: string[] = [
    'PM_10','PM_25','NO2','SO3','SO2','O3','C6H6'
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider, public alertCtrl: AlertController) {
  	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.restProvider.getTab().then((data:StationObj[]) => {
      this.stations = data;
      this.displayMarkers();
    })
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
    let greenIcon = leaflet.icon({
      iconUrl: '/assets/imgs/greenpin.png',
      shadowUrl: '/assets/imgs/greenpin.png',
      iconSize:     [16, 16],
      shadowSize:   [16, 16],
      iconAnchor:   [8, 8],
      shadowAnchor: [8, 8],
      popupAnchor:  [8, 8]
    });
    let orangeIcon = leaflet.icon({
      iconUrl: '/assets/imgs/orangepin.png',
      shadowUrl: '/assets/imgs/orangepin.png',
      iconSize:     [16, 16],
      shadowSize:   [16, 16],
      iconAnchor:   [8, 8],
      shadowAnchor: [8, 8],
      popupAnchor:  [8, 8]
    });
    let redIcon = leaflet.icon({
      iconUrl: '/assets/imgs/redpin.png',
      shadowUrl: '/assets/imgs/redpin.png',
      iconSize:     [16, 16],
      shadowSize:   [16, 16],
      iconAnchor:   [8, 8],
      shadowAnchor: [8, 8],
      popupAnchor:  [8, 8]
    });
    let markerGroup = leaflet.featureGroup();
    for(var i = 0; i < this.stations.length; i++) {
      let station = this.stations[i];

      let marker: any = leaflet.marker([station.latitude, station.longitude], {icon: redIcon}).on('click', () => {
        let alert = this.alertCtrl.create({
          title: `Stacja ${station.name}`,
          subTitle: `<p>Dane o stacji:</p>
                     ${0 < station.pollutions.length ? `<p>PM<sub>10</sub>: ${station.pollutions[0].value}</p>` : ""}
                     ${1 < station.pollutions.length ? `<p>PM<sub>25</sub>: ${station.pollutions[1].value}</p>` : ""}
                     ${2 < station.pollutions.length ? `<p>NO<sub>2</sub>: ${station.pollutions[2].value}</p>` : ""}
                     ${3 < station.pollutions.length ? `<p>SO<sub>3</sub>: ${station.pollutions[3].value}</p>` : ""}
                     ${4 < station.pollutions.length ? `<p>SO<sub>2</sub>: ${station.pollutions[4].value}</p>` : ""}
                     ${5 < station.pollutions.length ? `<p>O<sub>3</sub>: ${station.pollutions[5].value}</p>` : ""}
                     ${6 < station.pollutions.length ? `<p>C<sub>6</sub>H<sub>6</sub>: ${station.pollutions[6].value}</p>` : ""}`,
          buttons: [{
            text: 'Info',
            handler: ()=> {
              this.navCtrl.push(StationDetailsPage, {item: station});
            }},'Powróć']
        });
        alert.present();
      })
      markerGroup.addLayer(marker);
    }
    
    this.pollutionmap.addLayer(markerGroup);
  }

}
