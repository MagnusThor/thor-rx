export declare class ThorRxBase {
    constructor();
    onChange(target: Object, key: PropertyKey, newValue: any, oldValue: any): void;
}
export declare class ThorRxHandler<T> implements ProxyHandler<T> {
    constructor();
}
export declare class ThorRx<T extends ThorRxBase> {
    private instance;
    private proxyHandler;
    constructor(instance: any);
    getObserver(): T;
}
