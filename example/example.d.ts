import { ThorRxBase } from '../thor-rx';
export declare class Location extends ThorRxBase {
    lat: number;
    lng: number;
    constructor(lat: number, lng: number);
    onChange(target: any, key: string, newValue: any, oldValue: any): void;
}
export declare class Person extends ThorRxBase {
    fullName: string;
    location: Location;
    age: number;
    constructor();
    getAge(): number;
    onChange(target: any, key: string, newValue: any, oldValue: any): void;
}
