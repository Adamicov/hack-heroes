
import { Injectable } from '@angular/core';
import { HaversineService, GeoCoord } from "ng2-haversine";
import { Geolocation } from '@ionic-native/geolocation'
import { RestProvider } from '../rest/rest';
/*
  Generated class for the StationServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StationService {

  constructor(public geolocation: Geolocation, public haversineService: HaversineService, public restProvider: RestProvider) {
    
  }

  getNearestStation(): GeoCoord{
    let myPosition: GeoCoord;
    this.geolocation.getCurrentPosition().then(pos => {
      myPosition.latitude = pos.coords.latitude;
      myPosition.longitude = pos.coords.longitude;
    })
    let stations;
    this.restProvider.getStations().then(data => {
      stations = data;
    })
   
    
    return null;
  }

}
