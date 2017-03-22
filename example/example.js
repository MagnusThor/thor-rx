"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
        this.age = 10;
        this.location = new Location(69, 13);
    }
    getAge() {
        return this.age;
    }
    onChange(target, key, newValue, oldValue) {
        console.log("a change occured on Person '" + key + "' to '" + newValue + "', prior value was '" + oldValue + "'");
    }
}
__decorate([
    thor_rx_1.Observe(false, () => {
        console.log("bohhh!");
    }), 
    __metadata('design:type', Number)
], Person.prototype, "age", void 0);
exports.Person = Person;
console.log("\nExample 1");
let personObserver = new thor_rx_1.ThorRx(new Person());
let person = personObserver.getObserver();
person.fullName = "John Doe";
person.location.lat = 55;
person.location.lng = 18;
console.log("\n");
console.log("Age = ", person.getAge());
console.log("\n");
console.log("\n");
console.log(person);
console.log("\n");
//# sourceMappingURL=example.js.map