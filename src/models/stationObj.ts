import { Polution } from './polution';
import { Station } from './station';

export class StationObj  {
    name:string;
    provinceName:string;
    latitude:number;
    longitude:number;
    pollutions: Polution[];
    station:Station;

    constructor () { }
}