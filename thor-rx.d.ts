export declare function Observe(isObserved: boolean, fn?: Function): (t: any, k: string) => never;
export declare class ThorRxBase {
    constructor();
    onChange(target: Object, key: PropertyKey, newValue: any, oldValue: any): void;
}
export declare class ThorRx<T extends ThorRxBase> {
    private obj;
    private proxyHandler;
    constructor(obj: any);
    getObserver(): T;
}
