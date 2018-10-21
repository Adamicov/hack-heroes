import { Injectable } from '@angular/core';
import { RankData } from '../../models/rankData';
import { Station } from '../../models/station';
import { Pollutions } from '../../models/pollutions';
import { Observable } from 'rxjs';
import { RestProvider } from '../../providers/rest/rest';
import { StationObj } from '../../models/stationObj';
import { Polution } from '../../models/polution';
@Injectable()


export class RankProvider {
	rankDatas: RankData[]=[new RankData(
			new Station({
				id: 1,
				stationName: 'first',
			    latitude: 1,
			    longitude: 2,
			    city: {
			        name: 'Kopalnia',
			        commune: {
			            communeName: 'ŚLĄSKIE',
			            provinceName: 'Częstochowa',
			        }
			  	}
			}),
			new Pollutions(10,16,76,23,10,8,9)
		),
		new RankData(
			new Station({
				id: 2,
				stationName: 'second',
			    latitude: 10,
			    longitude: 42,
			    city: {
			        name: 'Herby',
			        commune: {
			            communeName: 'ŚLĄSKIE',
			            provinceName: 'Częstochowa',
			        }
			    }

				}),
			new Pollutions(1000,150,120,70,990,69,43)
		),
		new RankData(
			new Station({
				id: 3,
				stationName: 'third',
			    latitude: 100,
			    longitude: 72,
			    city: {
			        name: 'Pcim',
			        commune: {
			            communeName: '??',
			            provinceName: '??',
			        }
			    }

				}),
			new Pollutions(0,0,0,0,0,0,0)
		)

	];


	constructor(public restProvider: RestProvider) {}


	stationObjTab:StationObj[]=[];

	stationRank=function(){
		return new Promise(resolve =>{
			let datas :RankData[]=[];
			this.restProvider.getTab().then((data:StationObj[])=>{
				console.log(data);
				this.stationObjTab =data;
				let i=0;
				let TIME_IN_MS = 17500;
				let wait=setTimeout( () => {  
				
				 /*{
				    // key: the name of the object key
				    // index: the ordinal position of the key within the object 
				});*/
					while(data[i]!=undefined){
						
							console.log(i);
							let state=new Pollutions(null,null,null,null,null,null,null);
							let temp=data[i];
							//console.log(temp);
							for(let j=0;j<temp.pollutions.length;j++){
								state[temp.pollutions[j].paramFormula]=temp.pollutions[j].value;
							}
							datas.push(new RankData(temp.station,state));
							i++;
						
					}
					console.log(datas);
					resolve(datas);
				});
				
			});
		});
	}
	

}