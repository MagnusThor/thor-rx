import { ThorRxBase } from '../thor-rx';
export declare class Location extends ThorRxBase {
    lat: number;
    lng: number;
    constructor(lat: number, lng: number);
    onChange(target: any, key: string, newValue: any, oldValue: any): void;
}
export declare class Person extends ThorRxBase {
    fullName: string;
    skills: Array<string>;
    location: Location;
    constructor();
    onChange(target: any, key: string, newValue: any, oldValue: any): void;
}
