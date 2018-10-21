import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyStationPage } from './my-station';

@NgModule({
  declarations: [
    MyStationPage,
  ],
  imports: [
    IonicPageModule.forChild(MyStationPage),
  ],
})
export class MyStationPageModule {}
