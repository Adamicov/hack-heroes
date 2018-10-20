import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StationObj } from '../../models/stationObj';
import { Polution } from '../../models/polution';
import 'rxjs/operator/map';





@Injectable()
export class RestProvider {

  baseUrlApi: string = "http://localhost:8100/pjp-api/rest/station"
  sensorsUrl: string = '/sensors/'
  factorUrl: string = 'http://localhost:8100/pjp-api/rest/data/getData/'
  stations:any=null;
  stationsObjTab: StationObj[]=null;

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

  getTab=function(){
    let theese:RestProvider=this;
    return new Promise(resolve=>{this.getStations().then(data=> {
          let stations=data;
          let stationsObjTab:StationObj[]=[];

          
          
            for (let i = 0; i < stations.length; i++){
              let station = stations[i];
              let state:StationObj=new StationObj;
              state.name = station.stationName;
              state.provinceName = station.city.commune.provinceName;
              state.latitude = station.gegrLat;
              state.longitude = station.gegrLon;
              theese.getMeasurementTab(station.id).then(data => {
                  let measureTabs:any = data;
                  let polutions: Polution[] = []; 
                  for (let j = 0; j < measureTabs.length; j++){
                      let provide = measureTabs[j];
                    
                      theese.getProper(provide.id).then(data =>{
                        let proper: any = data;
                        let tempArray: any = proper.values;
                        for (let k = 0; k < tempArray.length; k++){
                          if (tempArray[k].value != null){
                            polutions.push(new Polution (provide.param.paramFormula, tempArray[k].value));
                            
                            break;
                          }
                        }
                      });
                  }
               state.pollutions = polutions;
               stationsObjTab.push(state);
               });
            
                
              }
              resolve(stationsObjTab);
          }
      
    );
    
  })
  }

}
