import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddPage } from '../add/add';
import { StationDetailsPage } from '../station-details/station-details';

/**
 * Generated class for the FavouritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favourites',
  templateUrl: 'favourites.html',
})
export class FavouritesPage {
  color: string[];
  items: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.color = ['good', 'medium', 'bad', 'worst'];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavouritesPage');
  }



  toAdd(event){
      this.navCtrl.push(AddPage);
  }

  itemTapped(event, item) {
    this.navCtrl.push(StationDetailsPage, {item: item});
  }

}
