import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {FavouritesService} from '../../providers/FavouritesService/favourites-service'
import { LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { StationObj } from '../../models/stationObj';

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
  constructor(public restProvider: RestProvider,public loadingController:LoadingController,public navCtrl: NavController, public navParams: NavParams) {
    this.color = ['good', 'medium', 'bad', 'worst'];
    let loading:any;
    loading = this.loadingController.create({ content: "Właśnie pobierane są najświeższe informacje!" });
    loading.present();
    this.restProvider.getTab().then((value:StationObj[])=>{
      loading.dismissAll();
      
    });
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad FavouritesPage');
  }



  toAdd(event){
    this.navCtrl.push(AddPage);
  }

  itemTapped(event, item) {
    this.navCtrl.push(StationDetailsPage, {item: item});
  }

}
