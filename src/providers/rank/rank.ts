import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RankData } from '../../models/rankData';
import { Station } from '../../models/station';
import { Pollutions } from '../../models/pollutions';
import { Observable } from 'rxjs';


/*
  Generated class for the RankProvider provider.

  See  for more info on providers
  and Angular DI.
*/
@Injectable()


export class RankProvider {
	abc: RankData =new RankData(
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
	);

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


	constructor() {}


	stationRank =new Observable((observer) =>{
		observer.next(this.rankDatas);
	})

}
/*

export class Station {
    id: number;
    stationName: string;
    latitude: number;
    longitude: number;
    city: {
        name: string;
        commune: {
            communeName: string;
            provinceName: string;
        }
    }
    constructor (values: Object = {}){
        Object.assign(this,values);
    }

}

*/