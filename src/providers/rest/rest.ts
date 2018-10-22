import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StationObj } from '../../models/stationObj';
import { Polution } from '../../models/polution';
import { RankData } from '../../models/rankData';
import { Pollutions } from '../../models/pollutions';
import { Station } from '../../models/station';
import 'rxjs/operator/map';





@Injectable()
export class RestProvider {
  czy:boolean=true;
//  baseUrlApi: string = "http://jacek.jaap.pl/stations.php/?name=/station";  //on device this url
  baseUrlApi: string = "http://localhost:8100/pjp-api/rest/station";          //on pc this url
  sensorsUrl: string = '/sensors/';
//  factorUrl: string = 'http://jacek.jaap.pl/stations.php/?name=/data/getData/';  //on device this url
  factorUrl: string = 'http://localhost:8100/pjp-api/rest/data/getData/';        //on pc this url
  stations:Station[]=[];
  stationsObjTab: StationObj[]=[];

  constructor(public http: HttpClient) { }

   getStations(){
    return new Promise(resolve => {
      if(this.stations.length>0){
        resolve(this.stations);
      }
      else{
      this.http.get(this.baseUrlApi + '/findAll').subscribe((data : Station[]) => {
        this.stations=data;
        resolve(data);
      }, err => console.log(err));
      }
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

  getSingleStation=function(stationId: any){
    return new Promise(resolve=>{
      this.getTab().then(data=>{
        for(let i=0;i<this.stationObjTab;i++){
          if(this.stationObjTab[i].id==stationId){
            resolve(this.stationObjTab[i].pollutions);
            //console.log("ok");
          }
        }
      });
    });

  }

  getTab=function(){
    let theese:RestProvider=this;
    return new Promise(resolve=>{

      this.getStations().then(data=> {
      	  if(this.stationsObjTab.length==data.length){
            //console.log("szybciej");
            resolve (this.stationsObjTab);
          }
         else{
          let stations=data;
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
             state.id=stations[i].id;
             state.cityName=stations[i].city.name;
            this.stationsObjTab.push(state);
             if(this.stationsObjTab.length==stations.length){
              // console.log(this.stationsObjTab);
                resolve (this.stationsObjTab)
             }
             });
         		 if(i-10>stations.length)
             		 resolve (this.stationsObjTab);

            }

          }
      }
    );
     });
  }

  datas:RankData[]=[];

  stationRank=function(){
    return new Promise(resolve=>{
       if(this.datas.length>0){
         resolve(this.datas);
       }
      else{
       this.getTab().then(data=>{

         for(let i=0;i<data.length;i++){
           let pol=new Pollutions(null,null,null,null,null,null,null);
           let state=data[i];
           let polTab=state.pollutions;
           for(let j=0;j<polTab.length;j++){
             pol[polTab[j].paramFormula]=polTab[j].value;
           }
           this.datas.push(new RankData(state.cityName,pol));
         }
         resolve(this.datas);
       });
      }
    });
  }
}
