import { Commune }  from './commune';
import {Deserializable} from "./deserializable";

export class City implements Deserializable{
        
    name: string;
    commune: Commune;
    

    constructor () { }

    deserialize(input: any): this{
        Object.assign(this, input);
        this.commune = new Commune().deserialize(input.commune);
        return this;
    }
}
