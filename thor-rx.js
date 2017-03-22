"use strict";
class ThorRxBase {
    constructor() {
    }
    onChange(target, key, newValue, oldValue) {
    }
}
exports.ThorRxBase = ThorRxBase;
class ThorRxHandler {
    constructor() {
    }
}
exports.ThorRxHandler = ThorRxHandler;
class ThorRx {
    constructor(instance) {
        this.instance = instance;
        this.proxyHandler = new ThorRxHandler();
        this.proxyHandler.set = (target, key, value, receiver) => {
            const oldValue = Reflect.get(target, key, receiver);
            if (Reflect.has(target, "onChange"))
                target.onChange(target, key, value, oldValue);
            return Reflect.set(target, key, value, receiver);
        };
        this.proxyHandler.get = (target, key, receiver) => {
            const result = Reflect.get(target, key, receiver);
            if (result instanceof Object) {
                let wrapper = new ThorRx(result);
                return wrapper.getObserver();
            }
            return result;
        };
    }
    getObserver() {
        return new Proxy(this.instance, this.proxyHandler);
    }
}
exports.ThorRx = ThorRx;
//# sourceMappingURL=thor-rx.js.map