import { Polution } from './polution';

export class StationObj  {
    name:string;
    cityName:string;
    provinceName:string;
    latitude:number;
    longitude:number;
    pollutions: Polution[];
    id:number;

    constructor () { }
}