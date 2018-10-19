import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/operator/map';





@Injectable()
export class RestProvider {

  baseUrlApi: string = "http://localhost:8100/pjp-api/rest/station"
  sensorsUrl: string = '/sensors/'
  factorUrl: string = 'http://localhost:8100/pjp-api/rest/data/getData/'

  constructor(public http: HttpClient) { }

   getStations(){
    return new Promise(resolve => {
      this.http.get(this.baseUrlApi + '/findAll').subscribe(data => {
        resolve(data);
      }, err => console.log(err));
    });
  }

  getMeasurementTab(stationId: any){ // get tables of coefficient 
    return new Promise(resolve => {
      this.http.get(this.baseUrlApi + this.sensorsUrl + stationId).subscribe(data => {
        resolve(data);
      }), err => console.log(err); 
    })
  }

  getProper(factorId: any){ // get factor by 
    return new Promise(resolve => {
      this.http.get(this.factorUrl + factorId).subscribe(data => {
        resolve(data);
      })
    })
  }

}
