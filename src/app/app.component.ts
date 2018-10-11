import {Component, ViewChild} from '@angular/core';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {MenuController, Nav, Platform} from 'ionic-angular';

import {AboutPage} from '../pages/about/about';
import {FavouritesPage} from '../pages/favourites/favourites';
import {MapPage} from '../pages/map/map';
import {RankPage} from '../pages/rank/rank';
import {SearchPage} from '../pages/search/search';

@Component({templateUrl : 'app.html'})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage: any = AboutPage;
  pages: Array<{title : string, component: any}>;

  constructor(public platform: Platform, public menu: MenuController,
              public statusBar: StatusBar, public splashScreen: SplashScreen) {

    this.initializeApp();

    this.pages = [
      {title : 'O nas!', component : AboutPage},
      {title : 'Ulubione', component : FavouritesPage},
      {title : 'Mapa', component : MapPage},
      {title : 'Ranking', component : RankPage},
      {title : 'Szukaj', component : SearchPage},
    ];
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
