import {ThorRx,ThorRxBase,ThorRxHandler} from '../thor-rx'

export class Location extends ThorRxBase {
        
        lat: number
        lng: number
      
        constructor(lat:number, lng:number) {
                super();
                this.lat = lat;
                this.lng = lng;               
        }
        onChange(target: any, key:string, newValue:any, oldValue:any) {
           console.log("a change occured on Location '" + key + "' to '" + newValue + "', prior value was '" + oldValue + "'");
        }
}

export class Person extends ThorRxBase {
       
        public fullName: string;
        public skills: Array<string>;
        public location: Location

        constructor() {
                super();
                this.skills = new Array<string>();
                this.skills.push("TypeScript");
                this.location = new Location(69,13);
         }       

        onChange(target: any, key:string, newValue:any, oldValue:any) {
                console.log("a chnage occured on Person '" + key + "' to '" + newValue + "', prior value was '" + oldValue + "'");
        }

}




// Create an ThorRx instance for class Person
let personObserver = new ThorRx<Person>(new Person());

// Get the observed instance of Person created
let instance = personObserver.getObserver();

    // Will fire onChange on Person
    instance.fullName = "John Doe";
    instance.skills.push("bar");

    // will fire onChnage on Person.Location
    instance.location.lat = 13;

