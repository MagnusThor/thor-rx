import { ThorRx, ThorRxBase, Observe } from '../thor-rx'
export class Location extends ThorRxBase {
        lat: number
        lng: number
        constructor(lat: number, lng: number) {
                super();
                this.lat = lat;
                this.lng = lng;
        }
        onChange(target: any, key: string, newValue: any, oldValue: any) {
                console.log("a change occured on Location '" + key + "' to '" + newValue + "', prior value was '" + oldValue + "'");
        }
}

export class Person extends ThorRxBase {
        fullName: string;
        location: Location
        @Observe(false, () => {
                        console.log("bohhh!");
        }) 
        age: number = 10;
        constructor() {
                super();
                this.location = new Location(69, 13);
        }
        getAge(){
                return this.age;
        }
        onChange(target: any, key: string, newValue: any, oldValue: any) {
                console.log("a change occured on Person '" + key + "' to '" + newValue + "', prior value was '" + oldValue + "'");
        }
}


console.log("\nExample 1");

// Create an ThorRx instance for class Person
let personObserver = new ThorRx<Person>(new Person());

// Get the observed instance of Person created
let person = personObserver.getObserver();

// Will fire onChange on Person
person.fullName = "John Doe";

// will fire onChnage on Person.Location
person.location.lat = 55;
person.location.lng = 18;


console.log("\n")


console.log("Age = ", person.getAge());

console.log("\n")


console.log("\n");
console.log(person);

console.log("\n");

