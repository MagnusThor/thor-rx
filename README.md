# thor-rx
ThorRx is a tiny Proxy based lib for
deliverering events and change records to keep track of mutations on objects (models).
When a property is modified on an thor-rx 'observed' instance 
thor-rx will deliver change notifications 
that helps you keep track of changes in a smooth way.

## Installation

    npm install thor-rx


# Documentation

Below follows a brief documentation.

## ThorRx&lt;T extends ThorRxBase &gt;(obj:any, (changes:ChangeModel) =>void):ThorRx&lt;T&gt;

Create a new thor-rx observer

    let rx = new ThorRx<T>(instance,(changes:ChangeModel) => {}); 

### getObserver():T

Get a thor-rx instance of type T.  T is the proxied instances of yours. 

    observerOfT = rx.getObserver();


 #### example

 Where we have an object(Model) Person 

      let person = new Person();

      let rx = new ThorRx<T>(person , (changes:ChangeModel) => {
            // do op with changes
      }); 

      let rxPerson= rx.getObserver();

      // rx person is now a observed (Proxied) instance of Person


## ChangeModel

Change model contains information about the current change.

    class ChangeModel {
        target: any;
        type: string;
        newValue: any;
        oldValue: any;
        timeStamp: Date;
        constructor(target: any, type: string, newValue: any, oldValue: any);
        }

### Change type's

An change type can be as follows: add, removed and update.  
add and remove relates to Array properties. 


## ThorRxBase

The objects you wich to observe must derive (extends) from 
ThorRxBase.

     class MyModel extends ThorRxBase{
         constructor(){
             super(); 
             ..
         }
     }

### observe(target:any) : void

Make an property / target of the class that derives from ThorRxBase 
an observable. Will report changes when modified

### unobserve(target:any): void 

Makes a properry ( target) a non observable. Will not report changes when modified



# Decorators

Decorators lets you by decorating properties of your objects(classes)
gain control of what attributes that thor-rx captures mutations on.
By default the property is observed.

### @Observe(isObserve:boolean)

if an @Observe decorator exists on a property , you can control it
by settig isObserve:boolean to true/false, if fn:Function is
defined fn will be the Fn to be called on property mutations.

Note: will not affect newable properties. See observe and unobserve above.

#### example

    class Person{

        @Observe(false) fullName:string;
        @Observe(true) age:number
        ...
    }

# Example ( Quick guide )

The example below creates an thor-rx observer for Person (class) 

    let personObserver = new ThorRx<Person>(new Person(), (change:ChangeModel) => {
         // do op's with the change
    }); 

Where person look needs to extend ThorRxBase such as

    class Person extends ThorRxBase {
        fullName:string
        constructor(){
            super();
        }
    }    

To get an observer instance you need to call .getObserver():T such as below.

    let personObserver = new ThorRx<Person>(new Person(),(change:ChangeModel) => {
        // do op's with the change
    });

    let person =  personObserver.getObserver()

    person.fullName = "Sven Erik Magnusson";

Setting the property .fullName will deliver (fire) the changes 
handler you provded , in this example 

    (change:ChangeModel) => {

        // do op

    }

# Roadmap / Todo

    -

    
