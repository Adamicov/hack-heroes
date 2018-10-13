import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Station } from '../../models/station';
import 'rxjs/add/operator/map';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  baseUrlApi: string = "http://localhost:8100/pjp-api/rest/station"

  constructor(public http: HttpClient) { }

  getStations(){
    return new Promise(resolve => {
      this.http.get(this.baseUrlApi + '/findAll').subscribe(data => {
        resolve(data);
      }, err => console.log(err));
    });
  }
  
}
