
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation'


/*
  Generated class for the GeograbberServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeograbberService {

  constructor(public geolocation: Geolocation) {
  }

  getPosition(){
    return this.geolocation.getCurrentPosition();
  }
}