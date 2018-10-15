import {Deserializable} from "./deserializable";

export class Commune implements Deserializable {
    
    communeName: string;
    provinceName: string;

    constructor () { }

    deserialize(input: any): this{
        Object.assign(this, input);
        return this;
    }
}