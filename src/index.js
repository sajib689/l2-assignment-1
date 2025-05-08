"use strict";
function formatString(input, toUpper) {
    if (input) {
        return input.toUpperCase();
    }
    else if (toUpper) {
        return input.toUpperCase();
    }
    return undefined;
}
console.log(formatString('hi'));
