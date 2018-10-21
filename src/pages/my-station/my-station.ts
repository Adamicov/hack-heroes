import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation'
import {GeoCoord} from '../../providers/haversine/geocoord';
import { StationObj } from '../../models/stationObj';
import { RestProvider } from '../../providers/rest/rest';
import { HaversineProvider } from '../../providers/haversine/haversine';
import { Polution } from '../../models/polution';

/**
 * Generated class for the MyStationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-station',
  templateUrl: 'my-station.html',
})
export class MyStationPage {

  stations: StationObj[] = [];
  pollution: Polution[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, public restProvider: RestProvider, public haversineService: HaversineProvider) {
    this.restProvider.getTab().then((data: StationObj[]) => {
      this.stations = data;
      let station = this.getNearestStation();
      this.restProvider.getSingleStation(station.id).then(data => {
       this.pollution;
      })
    })
  }


  getNearestStation(){
    let station: StationObj = this.stations[0];
    let myLocalization = this.getMyLocalization();
    let max = this.getInMeters(myLocalization, new GeoCoord(station.latitude, station.longitude));
    for (let i = 1; i < this.stations.length; i++){
      let state = this.stations[i];
      let value = this.getInMeters(myLocalization, new GeoCoord(state.latitude, state.longitude))
      if (value > max){
        max = value;
        station = state;
      }
    }
    return station;
  }

  getMyLocalization(){
    let my: GeoCoord;
    this.geolocation.getCurrentPosition().then(pos => {
      my = new GeoCoord(pos.coords.latitude, pos.coords.longitude);
    })
    return my;
  }

  getInMeters(my: GeoCoord, stat: GeoCoord){
    return this.haversineService.getDistanceInMeters(my, stat);
  }


}
