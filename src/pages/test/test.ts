import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GeograbberService } from '../../providers/geograbber-service/geograbber-service';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public geograbber: GeograbberService) {
  }

  ionViewDidLoad() {
    
  }

}
