import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GeograbberService } from '../../providers/geograbber-service/geograbber-service';
import { RestProvider } from '../../providers/rest/rest';
import { Station } from '../test/modeltest';

/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {

  latitude: any;
  longitude: any;
  stations: any;
  measureTabs: any;
  measureTab: any;
  factor: any;
  stationsObjTab: Station[] = [];
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public geograbber: GeograbberService, public restProvider: RestProvider) {
    restProvider.getStations().then(data => {
      this.stations = data;
      this.getTab();
    })
  }

  getTab(){
    for (var i = 0; i < this.stations.length; i++){
      let station = this.stations[i];
      let state = new Station();
      state.name = station.stationName;
      state.provinceName = station.city.commune.provinceName;
      state.latitude = station.geogrLat;
      state.longitude = station.geogrLon;
      this.restProvider.getMeasurementTab(station.id).then(data => {
        this.measureTabs = data;
        for (var j = 0; j < this.measureTabs.length; j++){
          let provide = this.measureTabs[j];
          this.restProvider.getProper(provide.id).then(data =>{

          })
        }
      })
    }
  }

  toStationObject(){

  }
}
