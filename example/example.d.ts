import { ThorRxBase } from '../thor-rx';
export declare class Location extends ThorRxBase {
    lat: number;
    lng: number;
    constructor(lat: number, lng: number);
}
export declare class MyModel extends ThorRxBase {
    fullName: string;
    location: Location;
    skills: Array<string>;
    constructor();
}
