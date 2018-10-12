import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GeograbberService } from '../../providers/geograbber-service/geograbber-service'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  latitude: any;
  longitude: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geograbberService: GeograbberService) {
    geograbberService.getPosition().then(pos => {
     this.latitude = pos.coords.latitude;
     this.longitude = pos.coords.longitude;
   }).catch(error => {
      console.log('Error getting location', error);
   })
  }
}
