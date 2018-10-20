import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest'
import { StationDetailsPage } from '../station-details/station-details';
import {FavouritesService} from '../../providers/FavouritesService/favourites-service'


/**
 * Generated class for the AddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {
  searchQuery: string = '';
  stations: any;
  items: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public restProvider:RestProvider,
  //  public nativeStorage: NativeStorage,
    public favouritesService: FavouritesService
  ) {
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
    console.log('ionViewDidLoad AddPage');
  }
    itemAdd(event, item){
      this.favouritesService.addFavourite(item);
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
