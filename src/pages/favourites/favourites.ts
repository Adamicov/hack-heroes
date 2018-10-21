import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {FavouritesService} from '../../providers/FavouritesService/favourites-service'

import { AddPage } from '../add/add';
import { StationDetailsPage } from '../station-details/station-details';


@IonicPage()
@Component({
  selector: 'page-favourites',
  templateUrl: 'favourites.html',
})

export class FavouritesPage {
  favourites: any;
  color: string[];
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
