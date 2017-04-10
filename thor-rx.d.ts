import 'reflect-metadata';
export declare function Observe(isObserved: boolean): (target: any, key: string) => void;
export declare class ThorRxBase {
    constructor();
    observe(target: any): void;
    unobserve(target: any): void;
    getName(): any;
}
export declare class ChangeModel {
    target: any;
    key: PropertyKey;
    type: string;
    newValue: any;
    oldValue: any;
    timeStamp: Date;
    parentType: string;
    constructor(target: any, key: PropertyKey, type: string, newValue: any, oldValue: any);
}
export declare class ThorRx<T extends ThorRxBase> {
    private obj;
    private fnChanges;
    private proxyHandler;
    constructor(obj: any, fnChanges: (change: ChangeModel) => void);
    getObserver(): T;
}
