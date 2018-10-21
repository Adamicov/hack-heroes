import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StationObj } from '../../models/stationObj';
import { Polution } from '../../models/polution';
import { Station } from '../../models/station';
import { RankData } from '../../models/rankData';
import { Pollutions } from '../../models/pollutions';
import 'rxjs/operator/map';





@Injectable()
export class RestProvider {

  baseUrlApi: string = "http://localhost:8100/pjp-api/rest/station";
  sensorsUrl: string = '/sensors/';
  factorUrl: string = 'http://localhost:8100/pjp-api/rest/data/getData/';
  stations:Station[]=[];
  stationsObjTab: StationObj[]=[];

  constructor(public http: HttpClient) { }

   getStations(){
    return new Promise(resolve => {
      if(this.stations.length>0){
        resolve(this.stations);
      }
      this.http.get(this.baseUrlApi + '/findAll').subscribe((data : Station[]) => {
        this.stations=data;
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

  getSingleStation(stationId: any){
    this.getMeasurementTab(stationId).then(data => {
      let measureTabs: any = data;
      let pollutions: Polution[] = [];
      for (let j = 0; j < measureTabs.length; j++){
        let provide = measureTabs[j];
        this.getProper(provide.id).then(data =>{
          let proper: any = data;
          let tempArray: any = proper.values;
          for (let k = 0; k < tempArray.length; k++){
            if (tempArray[k].value != null){
              pollutions.push(new Polution (provide.param.paramFormula, tempArray[k].value));
              break;
            }
          }
          return pollutions;
        });
      } 
    })
  }

  getTab=function(){
    let theese:RestProvider=this;
    return new Promise(resolve=>{
      if(this.stationsObjTab.length>0){
       // console.log("ok");
        resolve (this.stationsObjTab);
      }
      this.getStations().then(data=> {
    	 
          let stations=data;
          let wyslane=0;
          let otrzymane=0;
          
          
          for (let i = 0; i < stations.length; i++){
            let station = stations[i];
            let state:StationObj=new StationObj;
            state.name = station.stationName;
            state.provinceName = station.city.commune.provinceName;
            state.latitude = station.gegrLat;
            state.longitude = station.gegrLon;
            wyslane++;
            theese.getMeasurementTab(station.id).then(data => {
                let measureTabs:any = data;
                let polutions: Polution[] = []; 
                for (let j = 0; j < measureTabs.length; j++){
                    let provide = measureTabs[j];
                    wyslane++;
                    theese.getProper(provide.id).then(data =>{
                      let proper: any = data;
                      let tempArray: any = proper.values;
                      for (let k = 0; k < tempArray.length; k++){
                        if (tempArray[k].value != null){
                          polutions.push(new Polution (provide.param.paramFormula, tempArray[k].value));
                          
                          break;
                        }
                      }
                      otrzymane++;
                    });
                }
              otrzymane++;
             state.pollutions = polutions;
             state.station=stations[i];
            this.stationsObjTab.push(state);
             if(this.stationsObjTab.length==stations.length){
                resolve (this.stationsObjTab)
             }
             });
         		 if(i-10>stations.length)
             		 resolve (this.stationsObjTab);
              
            }
              
          }
     
    );
     });
  }
  datas:RankData[]=[];

  stationRank=function(){
    let theese=this;

      return new Promise(resolve=>{
        if(this.datas.length>0){
          resolve (this.datas);
        }
        this.getStations().then(data=> {
            let stations=data;
            for (let i = 0; i < stations.length; i++){
              let station = stations[i];
              let state:RankData=new RankData();

              theese.getMeasurementTab(station.id).then(data => {
                let measureTabs:any = data;
                let polutions: Polution[] = []; 
                let pol=new Pollutions(null,null,null,null,null,null,null);
                for (let j = 0; j < measureTabs.length; j++){
                    let provide = measureTabs[j];
                  
                    theese.getProper(provide.id).then(data =>{
                      let proper: any = data;
                      let tempArray: any = proper.values;
                      for (let k = 0; k < tempArray.length; k++){
                        if (tempArray[k].value != null){
                          pol[provide.param.paramFormula]=tempArray[k].value;
                          break;
                        }
                      }
                    });
                }

               state.station=stations[i];
               state.pollutions=pol;
               this.datas.push(state);
               if(this.datas.length==stations.length){
                resolve (this.datas)
                }
           });

           if(i>stations.length+10){
            resolve (this.datas)
            
           }
              
      }
    
      });
     
    });
  }
  

}
