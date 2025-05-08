"use strict";
function formatString(input, toUpper) {
    if (!input)
        return undefined;
    if (toUpper === false)
        return input.toLowerCase();
    return input.toUpperCase();
}
function filterByRating(items) {
    return items.filter(item => item.rating > 4);
}
function concatenateArrays(...arrays) {
    return arrays.flat();
}
class Vehicle {
    constructor(make, year) {
        this.make = make;
        this.year = year;
    }
    getInfo() {
        return `Make: ${this.make}, Year: ${this.year}`;
    }
}
class Car extends Vehicle {
    constructor(make, year, model) {
        super(make, year);
        this.model = model;
    }
    getModel() {
        return `Model: ${this.model}`;
    }
}
function processValue(value) {
    if (typeof value === 'string')
        return value.length;
    if (typeof value === 'number')
        return value * 2;
    return undefined;
}
function getMostExpensiveProduct(products) {
    if (products.length === 0)
        return null;
    return products.reduce((prev, current) => (prev.price > current.price ? prev : current));
}
var Day;
(function (Day) {
    Day[Day["Monday"] = 0] = "Monday";
    Day[Day["Tuesday"] = 1] = "Tuesday";
    Day[Day["Wednesday"] = 2] = "Wednesday";
    Day[Day["Thursday"] = 3] = "Thursday";
    Day[Day["Friday"] = 4] = "Friday";
    Day[Day["Saturday"] = 5] = "Saturday";
    Day[Day["Sunday"] = 6] = "Sunday";
})(Day || (Day = {}));
function getDayType(day) {
    if (day === Day.Sunday)
        return 'Sunday';
    return 'Weekday';
}
async function squareAsync(n) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (n < 0) {
                reject(new Error("Negative number not allowed"));
            }
            else {
                resolve(n * n);
            }
        }, 10);
    });
}
squareAsync(4).then(console.log); // Output: 16
squareAsync(-3).catch(console.error); // Output: Error: Negative number not allowed
