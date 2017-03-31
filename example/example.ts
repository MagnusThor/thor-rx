import { ThorRx, ThorRxBase, Observe, ChangeModel } from '../thor-rx'

export class Location extends ThorRxBase {
        lat: number
        lng: number
        constructor(lat: number, lng: number) {
                super();
                this.lat = lat;
                this.lng = lng;
        }
}
export class MyModel extends ThorRxBase {
      
        // @Observe(false)
         fullName: string;
        

        @Observe(false) // <-- wont work as we we 'new' it.
        location: Location

        @Observe(false)  // <-- wont work as we we 'new' it.
        skills: Array<string>;

      
        // age: number;

        constructor() {
                super();
                  this.skills = new Array<string>();
                 // this.unobserve(this.skills);      
                 this.location = new Location(69, 13);
                // this.age = 11;

        }
       

}


let myModel = new ThorRx<MyModel>(new MyModel(), (change: ChangeModel) => {
        console.log("change", change.newValue);
}).getObserver();


 myModel.location.lat = 69.3;


 myModel.skills.push("c++");
 myModel.skills.push("typescript");
 myModel.skills.push("javascript");

// myModel.skills.splice(myModel.skills.indexOf("typescript"), 1);


 myModel.fullName = "Doc Holliday";

//myModel.age = 12;





