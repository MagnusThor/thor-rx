# thor-rx
ThorRx is a tiny Proxy based lib for
deliverering events and change records to keep track of mutations.
When a property is modified on an thor-rx 'observed' instance 
thor-rx will fire events that helps you keep track of changes in a smooth way.

## Installation

    npm install thor-rx


# Documentation

Below follows a brief documentation.

## ThorRx&lt;T extends ThorRxBase &gt;(obj:any):ThorRx&lt;T&gt;

Create a new thor-rx observer

    let rx = new ThorRx<T>(instance); 

### getObserver():T

Get a thor-rx instance of T 

    observerOfT = rx.getObserver();


 #### example

 Where we have an object(class) Person 

      let person = new Person();

      let rx = new ThorRx<T>(person); 

      let rxPerson= rx.getObserver();

      // rx person is now a observed (Proxied) instance of Person
      

## ThorRxBase

The objects you wich to observe must derive (extends) from ThorRxBase
and implement the event handler (method) onChange

### onChange(target: Object, key: PropertyKey, newValue: any, oldValue: any): void;

Then a ThorRx a property on an observed object (class) is modified
the onChange event will fire and report the change. 

#### example

    class MyClass extends ThorRxBase
    {
        prop1: number;
        constructor(){
            super(); 
        }
        onChange(target: Object, key: PropertyKey, newValue: any, oldValue: any){
        
            // will fire then prop1 is modified...
            
        }
        
    }

# Decorators

Decorators lets you by decorating properties of your objects(classes)
gain control of what attributes that thor-rx captures mutations on.
By default the property is observed.

### @Observe(isObserve:boolean,?fn:Function):void

if an @Observe decorator exists on a property , you can control it
by settig isObserve:boolean to true/false, if fn:Function is
defined fn will be the Fn to be called on property mutations.

Note: not yet implemented ( public )

#### example

    class Person{

        @Observe(false) fullName:string;
        @Observe(true,(a,b,c,d) => {
            console.log("age modified to",c )  
        }) age:number

    }


# Example ( Quick guide )

The example below creates an thor-rx observer for Person (class) 

    let personObserver = new ThorRx<Person>(new Person()); 


Where person look needs to extend ThorRxBase such as

    class Person extends ThorRxBase {
        fullName:string
        constructor(){
        }
    }
    
futher on your class that derives from ThorRxBase needs to 
implement the onChange(...) method.

    class Person extends ThorRxBase {
        fullName:string
        constructor(){
        }

        onChange(target: any, key:string, newValue:any, oldValue:any) {
              // do ops with the change..
        }
    }


To get an observer instance you need to call .getObserver():T such as below.

    let personObserver = new ThorRx<Person>(new Person());

    let person =  personObserver.getObserver()

    

As we derived from ThorRxBase and implemented the onChange method 
the "settter" on the properties of Person will fire the onChange events, such 
as below.


    let personObserver = new ThorRx<Person>(new Person());

    let person =  personObserver.getObserver()

    person.fullName = "Sven Erik Magnusson";

Setting the property .fullName will the fire the onChange events 


    











