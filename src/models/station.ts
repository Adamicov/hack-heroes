import { City } from './city';
import {Deserializable} from "./deserializable";

export class Station implements Deserializable {
    id: number;
    stationName: string;
    latitude: number;
    longitude: number;
    city: City;
    constructor () { }

    deserialize(input: any): this{
        Object.assign(this, input);
        this.city = new City().deserialize(input.city);
        return this;
    }
}