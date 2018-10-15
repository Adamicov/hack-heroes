import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Station } from '../../models/station';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class RestProvider {

  baseUrlApi: string = "http://localhost:8100/pjp-api/rest/station"

  constructor(public http: HttpClient) { }

  getStations(): Observable<Station[]>{
    return this.http.get(this.baseUrlApi + '/findAll')
    .map((res: Response) => res.json().response.map((user: Station) => new Station().deserialize(user)));
  }
  
}
