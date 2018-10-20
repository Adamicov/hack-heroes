import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Polution } from '../../models/polution';
import { StationObj } from '../../models/stationObj';

/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {

  latitude: any;
  longitude: any;
  stations: any;
  measureTabs: any; ///example http://api.gios.gov.pl/pjp-api/rest/station/sensors/14
  factor: any;
  stationsObjTab: any;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider) {
  }

  ionViewDidLoad() {

    this.restProvider.getStations().then(data=>{
        this.stations=data;
        console.log(data);
            this.restProvider.getTab().then(data=>{
              this.stationsObjTab=data;
            });
    });
  }
  
  toStationObject(){

  }
}
