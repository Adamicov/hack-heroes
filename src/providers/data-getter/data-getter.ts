import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestProvider } from '../../providers/rest/rest';
import { Station } from '../../models/station';
import { Polution } from '../../models/polution';
import { StationObj } from '../../models/stationObj';

@Injectable()
export class DataGetterProvider {
	stations:any=null;
	stationsObjTab: StationObj[]=null;

	constructor(public http: HttpClient,private restProvider: RestProvider) {
  		
	}
   getStations = function(){

    return new Promise(resolve=>{
    	
     	 if(this.stations==null){
     	 	
      		this.restProvider.getStations().then(function(data)
	      {
	        this.stations=data;
	        console.log("pobieram dane");
	        //console.log(data);
	        resolve (this.stations);
	      });
	    } else {
		    resolve (this.stations);
		  	console.log("wracam");
   		}
    });
  };
  
  getTab(){
  		let stations=this.getStations().then(data=> {this.stations=data;
		let stationsObjTab=this.stationsObjTab;
		let restProvider=this.restProvider;	
		console.log("ok");
		console.log(this.stations);
   		 var def = new Promise(resolve=>{
    		console.log(this.stations);
		    
		    	for (let i = 0; i < this.stations.length; i++){
				    let station = this.stations[i];
				    let state:StationObj=new StationObj;
				    state.name = station.stationName;
				    state.provinceName = station.city.commune.provinceName;
				    state.latitude = station.gegrLat;
				    state.longitude = station.gegrLon;
				    restProvider.getMeasurementTab(station.id).then(data => {
				        let measureTabs:any = data;
				        let polutions: Polution[] = []; 
				        for (let j = 0; j < measureTabs.length; j++){
				            let provide = measureTabs[j];
				          
				            restProvider.getProper(provide.id).then(data =>{
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
		    }
			
		);

		return def;
		
  })
	}
}
