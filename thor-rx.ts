import 'reflect-metadata'
/**
 * 
 * 
 * @export
 * @param {boolean} isObserved
 * @param {Function} [fn]
 * @returns
 */
/**
 * 
 * 
 * @export
 * @param {boolean} isObserved
 * @param {Function} [fn]
 * @returns
 */
export function Observe(isObserved: boolean) {
        return function (target: any, key: string) {
                Reflect.defineMetadata("isObserved", isObserved, target, key);
        }
}
export class ThorRxBase {
        constructor() {
        }
        observe(target: any): void {
                Reflect.defineMetadata("isObserved", true, target);
        }
        unobserve(target: any): void {
                Reflect.defineMetadata("isObserved", false, target)
        }
}

/**
 * Traps for Array<T> of an ThorRx observer
 * 
 * @class ThorRxArrayHandler
 * @implements {ProxyHandler<T>}
 * @template T
 */
class ThorRxArrayHandler<T> implements ProxyHandler<T>{
        constructor(private fnChanges: (change: ChangeModel) => void) {

        }

        isObseved(target: T) {
                if (!Reflect.hasMetadata("isObserved", target)) return true;
                let result = Reflect.getMetadata("isObserved", target);
                return result;
        }

        set(target: T, key: PropertyKey, value: any, receiver: any) {
                return Reflect.set(target, key, value, receiver)
        }
        get(target: any, key: PropertyKey, receiver: any) {
                let self = this;


                if (key === "splice") {
                        return function (start, end) {
                                let removed = target.slice(start, start + end);
                                let added = (arguments.length > 1 ? arguments.length - 2 : 0);
                                target.splice.apply(target, arguments);
                                if (self.isObseved(target)) {
                                        let change = new ChangeModel(target,
                                                removed.length === 0 ? "add" : "remove",
                                                target[start], null);
                                        self.fnChanges(change);
                                }

                        }

                }
                if (key === "push") {
                        return function (item) {
                                return this.splice(this.length, 0, item);
                        }
                }

                if (key === "pop") {
                        return function () {
                                return this.splice(this.length - 1, 1);
                        }
                }

                if (key === "unshift") {
                        return function (item) {
                                return this.splice(0, 0, item);
                        }
                }

                if (key === "shift") {
                        return function () {
                                return this.splice(0, 1);
                        }
                }

                const result = Reflect.get(target, key, receiver)
                return result;
        }

}

/**
 * Traps for a ThorRx ( non Array's )
 * 
 * @class ThorRxHandler
 * @implements {ProxyHandler<T>}
 * @template T
 */
class ThorRxHandler<T> implements ProxyHandler<T>{
        constructor(private fnChanges: (change: ChangeModel) => void) {

        }
        isObseved(target: T, key: string) {
                if (!Reflect.hasMetadata("isObserved", target, key)) return true;
                let result = Reflect.getMetadata("isObserved", target, key);
                return result;
        }
        set(target: T, key: PropertyKey, value: any, receiver: any) {


                const oldValue = Reflect.get(target, key, receiver)
                if (this.isObseved(target, key.toString()))
                        this.fnChanges(new ChangeModel(target, "update", value, oldValue))
                return Reflect.set(target, key, value, receiver)
        }

        get(target: T, key: PropertyKey, receiver: any) {
                const result = Reflect.get(target, key, receiver)



                if (result instanceof Object && typeof (result) !== "function")                          
                        return (new ThorRx(result, this.fnChanges).getObserver());
                
                return result;
        }
}
export class ChangeModel {
        timeStamp: Date;
        constructor(public target: any, public type: string, public newValue: any, public oldValue: any) {
                this.timeStamp = new Date();
        }
}
export class ThorRx<T extends ThorRxBase> {
        private proxyHandler: ProxyHandler<T>;
        constructor(private obj, private fnChanges: (change: ChangeModel) => void) {
                if ((obj instanceof Array)) {

                        this.proxyHandler = new ThorRxArrayHandler<T>(fnChanges);

                } else {

                        this.proxyHandler = new ThorRxHandler<T>(fnChanges)
                }
        }
        getObserver(): T {
                return new Proxy<T>(this.obj, this.proxyHandler);
        }
}



