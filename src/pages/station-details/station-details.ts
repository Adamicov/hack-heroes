import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest'

/**
 * Generated class for the StationDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-station-details',
  templateUrl: 'station-details.html',
})
export class StationDetailsPage {

  stations: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider ) {
    console.log(this.restProvider.getStations());
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StationDetailsPage');
  }

}
