import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QualityProvider } from '../../providers/quality/quality';

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
  selectedItem: any;
  color: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public qualityProvider: QualityProvider){
    this.selectedItem = navParams.get('item');
    this.color = this.qualityProvider.AirQuality(this.selectedItem);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StationDetailsPage');
  }


}
