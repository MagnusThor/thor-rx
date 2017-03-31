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
}
exports.Location = Location;
class MyModel extends thor_rx_1.ThorRxBase {
    constructor() {
        super();
        this.skills = new Array();
        this.location = new Location(69, 13);
    }
}
__decorate([
    thor_rx_1.Observe(false), 
    __metadata('design:type', Location)
], MyModel.prototype, "location", void 0);
__decorate([
    thor_rx_1.Observe(false), 
    __metadata('design:type', Array)
], MyModel.prototype, "skills", void 0);
exports.MyModel = MyModel;
let myModel = new thor_rx_1.ThorRx(new MyModel(), (change) => {
    console.log("change", change.newValue);
}).getObserver();
myModel.location.lat = 69.3;
myModel.skills.push("c++");
myModel.skills.push("typescript");
myModel.skills.push("javascript");
myModel.fullName = "Doc Holliday";
//# sourceMappingURL=example.js.map