import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { AlertController } from 'ionic-angular';
import { RankData } from '../../models/rankData';
import { RankProvider } from '../../providers/rank/rank';
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
  rankDatas: RankData[];
  typesOfPollutions: string[] = [
    'PM_10','PM_25','NO2','SO3','SO2','O3','C6H6'
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider, public alertCtrl: AlertController, public rankProvider: RankProvider) {
  	
  }

  ngOnInit(rankProvider: RankProvider){
    this.rankProvider.stationRank.subscribe((value:RankData[])=>this.rankDatas=value);
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
      let self = this.stations[i];
      let pollutions = this.rankDatas[0].pollutions;
      let testie = "";
      if(self.stationName == "Wrocław - Korzeniowskiego") {
        testie = `PM_10: ${this.rankDatas[0].pollutions["PM_10"]}`;
      } else {
        testie = "Fill-in!";
      }
      //this.stations.foreach((element)=>{
      let marker: any = leaflet.marker([self.gegrLat, self.gegrLon], {icon: redIcon}).on('click', () => {
      let alert = this.alertCtrl.create({
          title: `Stacja ${self.stationName}`,
          subTitle: `<p>Dane o stacji:</p>
                     <p>PM<sub>10</sub>: ${pollutions["PM_10"]}</p>
                     <p>PM<sub>25</sub>: ${pollutions["PM_25"]}</p>
                     <p>NO<sub>2</sub>: ${pollutions["NO2"]}</p>
                     <p>SO<sub>3</sub>: ${pollutions["SO3"]}</p>
                     <p>SO<sub>2</sub>: ${pollutions["SO2"]}</p>
                     <p>O<sub>3</sub>: ${pollutions["O3"]}</p>
                     <p>C<sub>6</sub>H<sub>6</sub>: ${pollutions["C6H6"]}</p>`,
          buttons: ['Oki!']
        });
        alert.present();
      })
      markerGroup.addLayer(marker);
    }
    
    this.pollutionmap.addLayer(markerGroup);
  }

}
