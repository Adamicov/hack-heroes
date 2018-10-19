import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GeograbberService } from '../../providers/geograbber-service/geograbber-service';
import { RestProvider } from '../../providers/rest/rest';
import { Station } from '../test/modeltest';
import { Polution } from './modeltest2';

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
  measureTabs: any; ///example http://api.gios.gov.pl/pjp-api/rest/station/sensors/14
  factor: any;
  stationsObjTab: Station[] = [];
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public geograbber: GeograbberService, public restProvider: RestProvider) {
    restProvider.getStations().then(data => {
      this.stations = data;
      this.getTab();
    })
  }

  getTab(){
    for (let i = 0; i < this.stations.length; i++){
      let station = this.stations[i];
      let state = new Station();
      state.name = station.stationName;
      state.provinceName = station.city.commune.provinceName;
      state.latitude = station.geogrLat;
      state.longitude = station.geogrLon;
      this.restProvider.getMeasurementTab(station.id).then(data => { // example http://api.gios.gov.pl/pjp-api/rest/station/sensors/14
        this.measureTabs = data;
        let polutions: Polution[] = []; 
        for (let j = 0; j < this.measureTabs.length; j++){ // example http://api.gios.gov.pl/pjp-api/rest/station/sensors/14
          let provide = this.measureTabs[j];
          this.restProvider.getProper(provide.id).then(data =>{
            let proper: any = data;
            polutions.push(new Polution(provide.param.paramFormula, proper.values[0]));
          })
        }
        state.polutions = polutions;
      })
    }
  }

  toStationObject(){

  }
}
