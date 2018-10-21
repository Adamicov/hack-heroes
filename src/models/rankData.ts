import { Station } from './station';
import { Pollutions } from './pollutions';

export class RankData {
    name:string;
    pollutions: Pollutions;
    constructor (g_name:string="",g_pollutions: Pollutions =new Pollutions(null,null,null,null,null,null,null)){
        this.name=g_name;
        this.pollutions=g_pollutions;
    }


}