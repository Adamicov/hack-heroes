import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavouritesPage } from './favourites';

import { AddPage } from '../add/add';
import { StationDetailsPage } from '../station-details/station-details';

@NgModule({
  declarations: [
  ],
  imports: [
    IonicPageModule.forChild(FavouritesPage),
  ],
})
export class FavouritesPageModule {}
