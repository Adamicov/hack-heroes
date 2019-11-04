import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { GeograbberService } from '../providers/geograbber-service/geograbber-service';
import { Geolocation } from '@ionic-native/geolocation';
import { AboutPage } from '../pages/about/about';
import { FavouritesPage } from '../pages/favourites/favourites';
import { MapPage } from '../pages/map/map';
import { RankPage } from '../pages/rank/rank';
import { SearchPage } from '../pages/search/search';
import { StationDetailsPage } from '../pages/station-details/station-details';
import { AddPage } from '../pages/add/add';
import { RestProvider } from '../providers/rest/rest';
import { HttpClientModule } from '@angular/common/http';
//import { IonicStorageModule }from '@ionic/storage';
import { TestPage } from '../pages/test/test';
import { FavouritesService } from '../providers/FavouritesService/favourites-service';
import { StationService } from '../providers/station-service/station-service';
import { MyStationPage } from '../pages/my-station/my-station';
import { HaversineProvider } from '../providers/haversine/haversine';
import { QualityProvider } from '../providers/quality/quality';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    FavouritesPage,
    MapPage,
    RankPage,
    SearchPage,
    StationDetailsPage,
    AddPage,
    TestPage,
    MyStationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  //  IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    FavouritesPage,
    MapPage,
    RankPage,
    SearchPage,
    StationDetailsPage,
    AddPage,
    TestPage,
    MyStationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GeograbberService,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    //Storage
    RestProvider,
    StationService,
    HaversineProvider,

    FavouritesService,
    QualityProvider


  ]
})
export class AppModule {}
