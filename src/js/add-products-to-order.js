import {ORDER} from "./order-form.js";

const INPUTS = document.getElementsByTagName('input');

export function addProductsToOrder(){
    for (let input of INPUTS) {
        if (input.checked) {
            ORDER[input.name] = input.value;
        }
    }
}