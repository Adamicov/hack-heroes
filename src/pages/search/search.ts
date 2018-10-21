import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest'
import { StationDetailsPage } from '../station-details/station-details';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  searchQuery: string = '';
  stations: any;
  items: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider) {
      this.restProvider.getTab()
      .then((data: StationObj[]) => {
        this.stations = data;
      });
  }

  initializeItems() {
  this.items = this.stations.slice();
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

      console.log('TUTAJ')
    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.station.stationName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  itemTapped(event, item) {
    this.navCtrl.push(StationDetailsPage, {item: item});
  }

}
