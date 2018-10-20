import { Station } from './station';
import { Pollutions } from './pollutions';

export class RankData {
    station: Station;
    pollutions: Pollutions;
    constructor (g_station: Station,g_pollutions: Pollutions){
        this.station=g_station;
        this.pollutions=g_pollutions;
    }

}