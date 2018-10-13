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