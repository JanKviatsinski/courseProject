import {orderForm} from "./validation.js";

const inputs = orderForm.querySelectorAll('input');

export function getFromStorage () {
    const order = {};

    const keys = Object.keys(localStorage);

    for(let key of keys) {
        order[key] = localStorage.getItem(key);
    }
console.log(order)
    return order;
}

export function addDataToStorage(key, value){
    localStorage.setItem(key, value);
    // console.log(localStorage);
}

// localStorage.clear();

for (let input of inputs){
    if (input.value === localStorage[input.name]){
        input.checked = "checked";
    }

    if(localStorage[input.name]){
        input.value = localStorage[input.name];
    }
}


