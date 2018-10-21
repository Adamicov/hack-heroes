import { Station } from './station';
import { Pollutions } from './pollutions';

export class RankData {
    station: Station;
    pollutions: Pollutions;
    constructor (g_station: Station=new Station(),g_pollutions: Pollutions =new Pollutions(null,null,null,null,null,null,null)){
        this.station=g_station;
        this.pollutions=g_pollutions;
    }


}