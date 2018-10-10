import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { FavouritesPage } from '../pages/favourites/favourites';
import { MapPage } from '../pages/map/map';
import { RankPage } from '../pages/rank/rank';
import { SearchPage } from '../pages/search/search';
import { StationDetailsPage } from '../pages/station-details/station-details';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    FavouritesPage,
    MapPage,
    RankPage,
    SearchPage,
    StationDetailsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    FavouritesPage,
    MapPage,
    RankPage,
    SearchPage,
    StationDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
