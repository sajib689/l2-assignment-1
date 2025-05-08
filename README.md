What is the difference between interface and type in TypeScript ?

In TypeScript, both interface and type are used to define the structure of objects, but they differ in flexibility and usage. While interface is extendable and primarily for object shapes, type is more versatile, allowing unions, intersections, and more complex type definitions.

Type in TypeScript
The Type System in TypeScript describes the various data types supported by the language. It is divided into three major sections: Any Type, Built-In Type, and User-Defined Type. The Type System in TypeScript is responsible for ensuring the correctness of the data types before they are used in a program.

Example: In this example we defines two TypeScript types, Sajib and MoreSajib, and combines them using the intersection & operator. The gfg constant implements both types, storing and logging the combined object.


type Sajib = {
  name: string;
  age: number;
};

type MoreSajib = {
  email: string;
};

type CombinedSajib = Sajib & MoreSajib;

const gfg: CombinedSajib = {
  name: "kgowda",
  age: 20,
  email: "kgowda@gmail.com"
};

console.log(gfg);
Output:

{"name": "kgowda","age": 20,"email": "kgowda@gmail.com"}
Interface in TypeScript
An Interface in TypeScript is a syntactical contract that entities must adhere to. It can only contain the declaration of properties, methods, and events, without any implementation. Interfaces define a standard structure that implementing classes must follow.

Example: In this example we demonstrates interface merging in TypeScript. Two Sajib interfaces are combined automatically, allowing the gfg object to implement all properties (name, age, email) and log the merged result.


// Creating a interface
interface Sajib {
  name: string;
  age: number
}

interface Sajib {
  email: string;
}

// Using the merged interface
const gfg: Sajib = {
  name: "kgowda",
  age: 20,
  email: "kgowda@gmail.com"
};

console.log(gfg);
Output

name: " kgowda", age: 20, email: " kgowda@gmail.com"
Differences Between Type and Interface in TypeScript
Feature	Type	Interface
Definition	A collection of data types.	A syntactical contract.
Flexibility	More flexible.	Less flexible compared to type.
Keyw	Uses the type keyword	Uses the interface keyword.
Naming	Supports creating a new name for a type.	Provides a way to define entities.
Capabilities	Has fewer capabilities.	Has more capabilities.
Object Usage	Does not inherently support the use of an object.	Supports the use of an object.
Merged Declarations	Does not support multiple merged declarations.	Supports multiple merged declarations.
Name Conflicts	Two types with the same name raise an exception.	Two interfaces with the same name get merged.
Implementation	Does not have implementation purposes.	Used for implementation and extending in classes.
Union Types	Does not support implementing or extending union types.	Supports implementing and extending union types.
Intersection Types	Can create intersection types by combining multiple types.	Cannot create intersection interfaces.
Usage with Primitives, Unions, and Tuples	Can be used for types like primitives, unions, and tuples.	Cannot be used with other types of declaration.
Though TypeScript’s type and interface differ in certain features, they are similar in many ways, and one does not entirely replace the other. Developers can choose which one to use based on the specific requirements of their project. The flexibility and specific use cases of both type and interface make them valuable tools in TypeScript development.











##What is the use of the keyof keyword in TypeScript? Provide an example.

In JavaScript, we often use Object.keys to get a list of property keys. In the TypeScript world, the equivalent concept is the keyof operator. Although they are similar, keyof only works on the type level and returns a literal union type, while Object.keys returns values.

Introduced in TypeScript 2.1, the keyof operator is used so frequently that it has become a building block for advanced typing in TypeScript. In this article, we will examine the keyof operator and how it is commonly used with other TypeScript features to achieve better type safety with TypeScript generics, TypeScript mapped types, and TypeScript string literal types.

Let’s look at how each one interacts with the keyof operator.

Defining the keyof operator
The TypeScript handbook documentation says:

The keyof operator takes an object type and produces a string or numeric literal union of its keys.

A simple usage is shown below. We apply the keyof operator to the Staff type, and we get a staffKeys type in return, which represents all the property names. The result is a union of string literal types: “name” | “salary“:

type Staff = {
 name: string;
 salary: number;
} 
type staffKeys = keyof Staff; // "name" | "salary"
In the above example, the keyof operator is used for an object type. It can also be used for non-object types, including primitive types. Below are a few examples:

type BooleanKeys = keyof boolean; // "valueOf"

type NumberKeys = keyof number; // "toString" | "valueOf" | "toFixed" | "toExponential" | "toPrecision" | "toLocaleString"

type SymbolKeys = keyof symbol; 
//typeof Symbol.toPrimitive | typeof Symbol.toStringTag | "toString" | "valueOf"
As shown in the above examples, it’s less useful when applied to primitive types.

Object.keys vs. keyof operator
In JavaScript, Object.keys are used to return an array of object keys. In the code below, the returned keys are used to access the value of each property:

const user = {
  name: 'John',
  age: 32
};

console.log(Object.keys(user));
// output: Array ["name", "age"]
Object.keys(user).forEach(key => {
  console.log(user[key])
}) // output: John, 32
It’s worth noting that Object.keys ignore symbol properties in JavaScript. To overcome this issue, we can use Object.getOwnPropertySymbols, which returns an array comprised of only symbol keys.

Object.keys works similarly in TypeScript. Below is the TypeScript declaration of Object.keys:

interface ObjectConstructor {
 //...
 keys(o: object): string[]
 //...
}
If we run the earlier code snippet in TypeScript, we get the same output for Object.keys:

const user = {
  name: 'John',
  age: 32
};
console.log(Object.keys(user)); // output: ["name", "age"]
But, when we iterate the keys and access the object property by the key, TypeScript throws an error when the TypeScript strict mode is turned on:

Object.keys(user).forEach(key => {
  console.log(user[key]) // error is shown
})
TypeScript Object.keys Error

The error is because we tried to use the string type key to access the object with union type “name” | “age“.

You might wonder why TypeScript doesn’t return typed keys as “name” | “age“. This is intentional. Anders Hejlsberg explains the reason in this GitHub comment.

In a nutshell, the strongly typed Object.keys is fine at compile time. But objects often have extra properties at runtime. If this is the case, Object.keys will return extra keys. Those extra keys will violate the assumption that keyof is an exhaustive list of the key of the object. This may cause the app to crash. I created a StackBlitz example to demonstrate this behavior.

To work around this restriction, the simplest solution is to use type assertion with the keyof operator:

type userKeyType = keyof typeof user; //  "name" | "age"
Object.keys(user).forEach((key) => {
 console.log(user[key as userKeyType])
})
A more elegant solution is to extend the ObjectConstructor interface by declaration merging:

interface ObjectConstructor {
  keys<T>(o: T): (keyof T)[];
}

Object.keys(user).forEach((key) => {
  console.log(user[key]);
});
Please note that both workarounds will have the same restriction described in Hejlsberg’s comment. So use these workarounds with caution. We only want to use them when we are sure that additional properties won’t be added to the object at runtime; otherwise, it may cause an unexpected crash.

Using the keyof typeof pattern
We often combine keyof and typeof together, to create a type that represents the keys of a specific object. This is particularly useful when you want to define a type based on the structure of an existing object.

Let’s say we have a userProfile object as shown here:

const userProfile = {
  username: 'john_doe',
  email: 'john@example.com',
  age: 30,
  isAdmin: false,
};
We can use the keyof typeof pattern to create a type representing the keys of this user profile object:

type UserProfileKeys = keyof typeof userProfile;
// type UserProfileKeys = "username" | "email" | "age" | "isAdmin"
The UserProfileKeys type is a union of literal types containing the keys username, email, age, and isAdmin. This type can be useful for creating functions or components that need to work with various user profile properties in a type-safe manner:

function getUserInfo(key: UserProfileKeys): any {
  return userProfile[key];
}
const usernameValue = getUserInfo('username'); // Type-safe access
In the above example, the getUserInfo function takes a key parameter constrained to the UserProfileKeys type, ensuring that only valid keys of userProfile can be passed. This helps prevent runtime errors and enhances the overall type safety of our code.

Using keyof to create new types based on Object.keys
We can use keyof operator to derive new types based on the object keys. For example, we have an object that represents medicine below:

const medicineObject = {
  name: 'Aspirin',
  dosage: 500,
  manufacturer: 'ExamplePharma'
};
We want to create a new type ExtendedMedicineType that includes an additional description property for each key in medicineObject:

type MedicineKeys = keyof typeof medicineObject;
type ExtendedMedicineType = {
  [K in MedicineKeys]: {
    value: typeof medicineObject[K];
    description: string;
  };
};
With the help of keyof typeof, we create a new type: MedicineKeys. Then, we derive an ExtendedMedicineType based on the MedicineKeys, which ensures that each property has a specific structure (value and description). The newly added description property serves as documentation for each property.

We can use the new ExtendedMedicineType as shown below:

const myMedicine: ExtendedMedicineType = {
  name: {
    value: 'Aspirin',
    description: 'Name of the medicine'
  },
  dosage: {
    value: 500,
    description: 'Dosage of the medicine in milligrams'
  },
  manufacturer: {
    value: 'ExamplePharma',
    description: 'Manufacturer of the medicine'
  }
};
Using keyof with TypeScript generics
The keyof operator can be used to apply constraints in a generic function. The following function can retrieve the type of an object property using generics, an indexed access type, and the keyof operator:

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
If we are new to TypeScript, the above function may look complex. Let’s break it down:

keyof T returns a union of string literal types. The extends keyword is used to apply constraints to K, so that K is one of the string literal types only
extends means “is assignable” instead of “inherits”; K extends keyof T means that any value of type K can be assigned to the string literal union types
The indexed access operator obj[key] returns the same type that the property has
We can see how the getProperty type is used below:

const developer: Staff = {
  name: 'Tobias',
  salary: 100, 
};

const nameType = getProperty(developer, 'name'); // string 
// Compiler error 
const salaryType getProperty(developer, 'pay'); //Cannot find name 'pay'.(2304)
The compiler will validate the key to match one of the property names of type T because we apply the type constraint for the second parameter. In the above example, the compiler shows the error when an invalid key 'pay' is passed.