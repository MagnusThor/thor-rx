"use strict";
const thor_rx_1 = require('../thor-rx');
class Location extends thor_rx_1.ThorRxBase {
    constructor(lat, lng) {
        super();
        this.lat = lat;
        this.lng = lng;
    }
    onChange(target, key, newValue, oldValue) {
        console.log("a change occured on Location '" + key + "' to '" + newValue + "', prior value was '" + oldValue + "'");
    }
}
exports.Location = Location;
class Person extends thor_rx_1.ThorRxBase {
    constructor() {
        super();
        this.skills = new Array();
        this.skills.push("TypeScript");
        this.location = new Location(69, 13);
    }
    onChange(target, key, newValue, oldValue) {
        console.log("a chnage occured on Person '" + key + "' to '" + newValue + "', prior value was '" + oldValue + "'");
    }
}
exports.Person = Person;
let personObserver = new thor_rx_1.ThorRx(new Person());
let instance = personObserver.getObserver();
instance.fullName = "John Doe";
instance.skills.push("bar");
instance.location.lat = 13;
//# sourceMappingURL=example.js.map