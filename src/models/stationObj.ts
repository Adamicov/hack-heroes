import { Polution } from './polution';
import { Station } from './station';

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