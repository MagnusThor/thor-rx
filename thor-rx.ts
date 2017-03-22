
export class ThorRxBase {
        constructor() {
        }
        onChange(target: Object, key: PropertyKey, newValue: any, oldValue: any) {
        }
}


export class ThorRxHandler<T> implements ProxyHandler<T>{
        constructor() {
        }
}

export class ThorRx<T extends ThorRxBase> {
        private proxyHandler: ProxyHandler<T>;
        constructor(private instance) {
                this.proxyHandler = new ThorRxHandler<T>()
                this.proxyHandler.set = (target: T, key: PropertyKey, value: any, receiver: any) => {
                        const oldValue = Reflect.get(target, key, receiver)
                        if (Reflect.has(target, "onChange"))
                                target.onChange(target, key, value, oldValue);
                        return Reflect.set(target, key, value, receiver)
                }
                this.proxyHandler.get = (target: T, key: PropertyKey, receiver: any) => {
                        const result = Reflect.get(target, key, receiver)
                        if (result instanceof Object) {
                                let wrapper = new ThorRx(result);
                                return wrapper.getObserver();
                        }
                        return result;
                }
        }
        getObserver(): T {
                return new Proxy<T>(this.instance, this.proxyHandler);
        }
}

