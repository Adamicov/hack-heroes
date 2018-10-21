
import { Injectable } from '@angular/core';
import {HaversineProvider } from '../haversine/haversine';
import { Geolocation } from '@ionic-native/geolocation'
import { RestProvider } from '../rest/rest';
import {GeoCoord} from '../haversine/geocoord';
import { DataGetterProvider } from '../data-getter/data-getter';
import { StationObj } from '../../models/stationObj';
/*
  Generated class for the StationServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StationService {

  stations: StationObj[];
  myLocalization: GeoCoord;

  constructor(public geolocation: Geolocation, public haversineService: HaversineProvider, public restProvider: RestProvider, public dataProvider: DataGetterProvider) {
    this.geolocation.getCurrentPosition().then(pos => {
      this.myLocalization = new GeoCoord(pos.coords.latitude, pos.coords.longitude);
    })
  }

  getNearestStations(){
    let sorted = this.stations;
    sorted = sorted.sort((n1, n2) => {
      return this.haversineService.getDistanceInMeters(this.myLocalization, new GeoCoord(n1.latitude, n1.longitude))
       - this.haversineService.getDistanceInMeters(this.myLocalization, new GeoCoord(n2.latitude, n2.longitude));
    })
  }

}
