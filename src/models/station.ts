export class Station {
    id: number;
    stationName: string;
    latitude: number;
    longitude: number;
    city: {
        id: number;
        name: string;
        commune: {
            communeName: string;
            districtName: string;
            provinceName: string;
        }
    }
    addressStreet: string;
    constructor (values: Object = {}){
        Object.assign(this,values);
    }

}