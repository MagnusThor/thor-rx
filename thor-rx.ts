/**
 * 
 * 
 * @export
 * @param {boolean} isObserved
 * @param {Function} [fn]
 * @returns
 */
export function Observe(isObserved:boolean,fn?:Function){
        return function(t:any,k:string){
              throw "not yet implemented..";
        }
}
/**
 * 
 * 
 * @export
 * @class ThorRxBase
 */
/**
 * 
 * 
 * @export
 * @class ThorRxBase
 */
export class ThorRxBase {
        /**
         * Creates an instance of ThorRxBase.
         * 
         * 
         * @memberOf ThorRxBase
         */
        /**
         * Creates an instance of ThorRxBase.
         * 
         * 
         * @memberOf ThorRxBase
         */
        constructor() {
        }
        /**
         * 
         * 
         * @param {Object} target
         * @param {PropertyKey} key
         * @param {*} newValue
         * @param {*} oldValue
         * 
         * @memberOf ThorRxBase
         */
        /**
         * 
         * 
         * @param {Object} target
         * @param {PropertyKey} key
         * @param {*} newValue
         * @param {*} oldValue
         * 
         * @memberOf ThorRxBase
         */
        onChange(target: Object, key: PropertyKey, newValue: any, oldValue: any) {
        }
}


/**
 * 
 * 
 * @export
 * @class ThorRxHandler
 * @implements {ProxyHandler<T>}
 * @template T
 */
/**
 * 
 * 
 * @export
 * @class ThorRxHandler
 * @implements {ProxyHandler<T>}
 * @template T
 */
 class ThorRxHandler<T> implements ProxyHandler<T>{
        /**
         * Creates an instance of ThorRxHandler.
         * 
         * 
         * @memberOf ThorRxHandler
         */
        /**
         * Creates an instance of ThorRxHandler.
         * 
         * 
         * @memberOf ThorRxHandler
         */
        constructor() {
        }
}

/**
 * 
 * 
 * @export
 * @class ThorRx
 * @template T
 */
/**
 * 
 * 
 * @export
 * @class ThorRx
 * @template T
 */
export class ThorRx<T extends ThorRxBase> {
        /**
         * 
         * 
         * @private
         * @type {ProxyHandler<T>}
         * @memberOf ThorRx
         */
        /**
         * 
         * 
         * @private
         * @type {ProxyHandler<T>}
         * @memberOf ThorRx
         */
        private proxyHandler: ProxyHandler<T>;
        /**
         * Creates an instance of ThorRx.
         * 
         * @param {any} instance
         * 
         * @memberOf ThorRx
         */
        /**
         * Creates an instance of ThorRx.
         * 
         * @param {any} obj
         * 
         * @memberOf ThorRx
         */
        constructor(private obj) {
                this.proxyHandler = new ThorRxHandler<T>()
                /**
                 * 
                 * 
                 * @param {T} target
                 * @param {PropertyKey} key
                 * @param {*} value
                 * @param {*} receiver
                 * @returns
                 */
                /**
                 * 
                 * 
                 * @param {T} target
                 * @param {PropertyKey} key
                 * @param {*} value
                 * @param {*} receiver
                 * @returns
                 */
                this.proxyHandler.set = (target: T, key: PropertyKey, value: any, receiver: any) => {
                        const oldValue = Reflect.get(target, key, receiver)
                        if (Reflect.has(target, "onChange"))
                                target.onChange(target, key, value, oldValue);
                        return Reflect.set(target, key, value, receiver)
                }
                /**
                 * 
                 * 
                 * @param {T} target
                 * @param {PropertyKey} key
                 * @param {*} receiver
                 * @returns
                 */
                /**
                 * 
                 * 
                 * @param {T} target
                 * @param {string} key
                 * @param {*} receiver
                 * @returns
                 */
                this.proxyHandler.get = (target: T, key: PropertyKey, receiver: any) => {
                        // fire if fn is called?
                        const result = Reflect.get(target, key, receiver)                      

                        if (result instanceof Object) {
                                let wrapper = new ThorRx(result);
                                return wrapper.getObserver();
                        }
                        return result;
                }
        }
        /**
         * 
         * 
         * @returns {T}
         * 
         * @memberOf ThorRx
         */
        /**
         * 
         * 
         * @returns {T}
         * 
         * @memberOf ThorRx
         */
        getObserver(): T {
                return new Proxy<T>(this.obj, this.proxyHandler);
        }
}

