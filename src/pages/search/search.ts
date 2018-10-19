import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest'
import { StationDetailsPage } from '../station-details/station-details';

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
      this.restProvider.getStations()
      .then(data => {
        this.stations = data;
      });
      this.initializeItems();
  }

  initializeItems() {
  this.items = this.stations;
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.stationName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  itemTapped(event, item) {
    this.navCtrl.push(StationDetailsPage, {item: item});
  }

}
