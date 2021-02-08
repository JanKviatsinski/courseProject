import {completeFormFromStorage} from "./autocomplete-form.js";

export const orderForm = document.querySelector('#order-form');

completeFormFromStorage(orderForm);

export function getFromStorage() {
    const order = {};
    const keys = Object.keys(localStorage);
    for (let key of keys) {
        order[key] = localStorage.getItem(key);
    }
    return order;
}

export function addDataToStorage(key, value) {
    localStorage.setItem(key, value);
}

// localStorage.clear();


