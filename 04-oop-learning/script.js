// =========================================================================================
// =========================================================================================
// 1. Object– An Object is a unique entity that contains property and methods.
// For example “car” is a real life Object, which has some characteristics like color, type, model, horsepower and performs certain action like drive. The characteristics of an Object are called as Property, in Object-Oriented Programming and the actions are called methods. An Object is an instance of a class. Objects are everywhere in JavaScript almost every element is an Object whether it is a function, array, and string. 
// Note: A Method in javascript is a property of an object whose value is a function. 
// Object can be created in two ways in JavaScript:
// =========================================================================================
// =========================================================================================


// =========================================================================================
// Defining object - Using an Object Literal
// =========================================================================================
/*
let person = {
    first_name: "Gabor",
    last_name: "Pecsek",

    // Method
    getFunction : function() {
        return (`The name of the person is ${person.first_name} ${person.last_name}`)
    },

    // Object within object
    phone_number: {
        mobile: "12345677",
        landline: "6665433"
    }
}

console.log(person.getFunction());
console.log(person.phone_number.mobile);
*/

// =========================================================================================
// Using an Object Constructor
// =========================================================================================
/*
function member(first_name, last_name) {
    this.first_name = first_name;
    this.last_name = last_name;
}

//creating new instances of persona object
let member1 = new member("Gábor", "Pécsek");
let member2 = new member("Noémi", "Felker");

console.log(member1.first_name);
console.log(`${member2.first_name} ${member2.last_name}`);
*/
/*
const schoola = new Object();
schoola.name = 'Babay József Általános Iskola';
schoola.location = 'Nagyatád';
schoola.established = 1983;

schoola.displayInfo = function() {
    console.log(`${schoola.name} was established in ${schoola.established} at ${schoola.location}`);
}

schoola.displayInfo();
*/
// =========================================================================================
// Using Object.create() method: The Object.create() method creates a new object, 
// using an existing object as the prototype of the newly created object
// Object.create() example
// A simple object with some properties
// =========================================================================================
/*
const coder = {
    isStudying: false,
    printIntroduction : function() {
        console.log(`My name is ${this.name}. Am I studying?: ${this.isStudying}`)
    }
}

// Object.create() method
const me = Object.create(coder);

// "name" is a property set on "me", but not on "coder"
me.name = 'Gábor';

// Inherited properties can be overwritten
me.isStudying = true;
me.printIntroduction();
*/

// =========================================================================================
// =========================================================================================
// 2. Classes– Classes are blueprint of an Object. A class can have many Object,
// because class is a template while Object are instances of the class or the concrete implementation. 
// Before we move further into implementation, we should know unlike other
// Object Oriented Language there is no classes in JavaScript we have only Object.
// To be more precise, JavaScript is a prototype based object oriented language,
// which means it doesn’t have classes rather it define behaviors using constructor function
// and then reuse it using the prototype. 
// Note: Even the classes provided by ECMA2015 are objects.
// =========================================================================================
// =========================================================================================

// =========================================================================================
// Defining class using ES6
// =========================================================================================
/*
class Vehicle {
    constructor (name, maker, engine) {
        this.name = name;
        this.maker = maker;
        this.engine = engine;
    }
    getDetails() {
        return (`The name of the bike is ${this.name}.`)
    }
}
// Making object with the help of the constructor
let bike1 = new Vehicle('Hayabusa', 'Suzuki', '11340cc');
let bike2 = new Vehicle('Ninja', 'Kawasaki', '998cc');

console.log(bike1.name);    // Hayabusa
console.log(bike2.maker);   // Kawasaki
console.log(bike1.getDetails());
*/
// =========================================================================================
// Defining class in a Traditional Way
// =========================================================================================
/*
function Vehicles(name, maker, engine) {
    this.name = name,
    this.maker = maker,
    this.engine = engine
};

Vehicles.prototype.getDetail = function() {
    console.log('The name of the bike is ' + this.name);
}

let bikes1 = new Vehicles('Hayabusa', 'Suzuki', '11340cc');
let bikes2 = new Vehicles('Ninja', 'Kawasaki', '998cc');

console.log(bikes1.name);    // Hayabusa
console.log(bikes2.maker);   // Kawasaki
console.log(bikes1.getDetail());
*/

// =========================================================================================
// =========================================================================================
// 3. Encapsulation – The process of wrapping property and function within a single unit
// is known as encapsulation. 
// Let’s understand encapsulation with an example.
// =========================================================================================
// =========================================================================================

// =========================================================================================
// Encapsulation example
// =========================================================================================
/*
class person {
    constructor(name, id) {
        this.name = name;
        this.id = id;
    }
    add_Address(add) {
        this.add = add;
    }
    getDetails() {
        console.log(`Name is ${this.name}, Address is: ${this.add}`);
    }
}

let person1 = new person('Gabor', 21);
person1.add_Address('Budapest');

person1.getDetails();
*/
// =========================================================================================
// In the above example we simply create an person Object using the constructor and Initialize
// it property and use it functions we are not bother about the implementation details.
// We are working with an Objects interface without considering the implementation details. 
// Sometimes encapsulation refers to hiding of data or data Abstraction which means representing
// essential features hiding the background detail. Most of the OOP languages provide access modifier
// to restrict the scope of a variable, but their are no such access modifiers in JavaScript
// but their are certain way by which we can restrict the scope of variable within the Class/Object. 
//
//Example:
// =========================================================================================

// Abstract example
/*
function persona(fname, lname) {
    let firstname = fname;
    let lastname = lname;

    let getDetails_noaccess = function() {
        return (`First name is: ${firstname}, Last name is: ${lastname}`);
    }

    this.getDetails_access = function() {
        return (`First name is: ${firstname}, Last name is: ${lastname}`);
    }
}

let person2 = new persona('Noémi', 'Budapest');

console.log(person2.firstname);
console.log(person2.getDetails_noaccess());
console.log(person2.getDetails_access());
*/

// =========================================================================================
// =========================================================================================
// 4. Inheritance – It is a concept in which some property and methods of an Object is being
// used by another Object. Unlike most of the OOP languages where classes inherit classes,
// JavaScript Object inherits Object i.e. certain features (property and methods)of one object
// can be reused by other Objects. 
// =========================================================================================
// =========================================================================================

// =========================================================================================
// Ler's understand inheritance with example:
// =========================================================================================

class personb {
    constructor(name) {
        this.name = name;
    }

    // method to return the string
    toString() {
        return (`Name of person: ${this.name}`);
    }
}

class student extends personb {
    constructor(name, id) {
        // super keyword to for calling above class constructor
        super(name);
        this.id = id;
    }
    toString() {
        return (`${super.toString()}, Student ID: ${this.id}`);
    }
}
let student1 = new student('Péter', 22);
console.log(student1.toString());


// =========================================================================================
// In the above example, we define an Person Object with certain property and method and then
// we inherit the Person Object in the Student Object and use all the property and method of
// person Object as well define certain property and methods for Student. 
// Note: The Person and Student object both have same method i.e toString(), this is called
// as Method Overriding. Method Overriding allows method in a child class to have the same name
// and method signature as that of a parent class. 
// In the above code, super keyword is used to refer immediate parent class instance variable. 
// =========================================================================================

// =========================================================================================
// The property names can be strings or numbers.
// In case the property names are numbers, they must be accessed using the “bracket notation”
// like this :
// =========================================================================================

let school = {
    name: 'Babay József Általános Iskola',
    location: 'Nagyatád',
    established: '1983',
    20: 1000,
    displayInfo: function() {
        console.log(`The value of the key 20 is ${school['20']}`);
    }
}
school.displayInfo();

// =========================================================================================
// Property names can also be strings with more than one space separated words.
// In which case, these property names must be enclosed in quotes :
// =========================================================================================

let school2 = {
    "school name": 'Babay József Általános Iskola'
}
console.log(school2["school name"]);