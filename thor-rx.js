"use strict";
require('reflect-metadata');
function Observe(isObserved) {
    return function (target, key) {
        Reflect.defineMetadata("isObserved", isObserved, target, key);
    };
}
exports.Observe = Observe;
class ThorRxBase {
    constructor() {
    }
    observe(target) {
        Reflect.defineMetadata("isObserved", true, target);
    }
    unobserve(target) {
        Reflect.defineMetadata("isObserved", false, target);
    }
    getName() {
        return this.constructor.name;
    }
}
exports.ThorRxBase = ThorRxBase;
class ThorRxArrayHandler {
    constructor(fnChanges) {
        this.fnChanges = fnChanges;
    }
    isObseved(target) {
        if (!Reflect.hasMetadata("isObserved", target))
            return true;
        let result = Reflect.getMetadata("isObserved", target);
        return result;
    }
    set(target, key, value, receiver) {
        return Reflect.set(target, key, value, receiver);
    }
    get(target, key, receiver) {
        let self = this;
        if (key === "splice") {
            return function (start, end) {
                let removed = target.slice(start, start + end);
                let added = (arguments.length > 1 ? arguments.length - 2 : 0);
                target.splice.apply(target, arguments);
                if (self.isObseved(target)) {
                    let change = new ChangeModel(target, key, removed.length === 0 ? "add" : "remove", target[start], null);
                    self.fnChanges(change);
                }
            };
        }
        if (key === "push") {
            return function (item) {
                return this.splice(this.length, 0, item);
            };
        }
        if (key === "pop") {
            return function () {
                return this.splice(this.length - 1, 1);
            };
        }
        if (key === "unshift") {
            return function (item) {
                return this.splice(0, 0, item);
            };
        }
        if (key === "shift") {
            return function () {
                return this.splice(0, 1);
            };
        }
        const result = Reflect.get(target, key, receiver);
        return result;
    }
}
class ThorRxHandler {
    constructor(fnChanges) {
        this.fnChanges = fnChanges;
    }
    isObseved(target, key) {
        if (!Reflect.hasMetadata("isObserved", target, key))
            return true;
        let result = Reflect.getMetadata("isObserved", target, key);
        return result;
    }
    set(target, key, value, receiver) {
        const oldValue = Reflect.get(target, key, receiver);
        if (this.isObseved(target, key.toString()))
            this.fnChanges(new ChangeModel(target, key, "update", value, oldValue));
        return Reflect.set(target, key, value, receiver);
    }
    get(target, key, receiver) {
        const result = Reflect.get(target, key, receiver);
        if (result instanceof Object && typeof (result) !== "function")
            return (new ThorRx(result, this.fnChanges).getObserver());
        return result;
    }
}
class ChangeModel {
    constructor(target, key, type, newValue, oldValue) {
        this.target = target;
        this.key = key;
        this.type = type;
        this.newValue = newValue;
        this.oldValue = oldValue;
        this.parentType = target.constructor.name || typeof (target);
        this.timeStamp = new Date();
    }
}
exports.ChangeModel = ChangeModel;
class ThorRx {
    constructor(obj, fnChanges) {
        this.obj = obj;
        this.fnChanges = fnChanges;
        if ((obj instanceof Array)) {
            this.proxyHandler = new ThorRxArrayHandler(fnChanges);
        }
        else {
            this.proxyHandler = new ThorRxHandler(fnChanges);
        }
    }
    getObserver() {
        return new Proxy(this.obj, this.proxyHandler);
    }
}
exports.ThorRx = ThorRx;
//# sourceMappingURL=thor-rx.js.map