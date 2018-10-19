import { Polution } from './polution';

export class StationObj  {
    name:string;
    provinceName:string;
    latitude:number;
    longitude:number;
    pollutions: Polution[];

    constructor () { }
}