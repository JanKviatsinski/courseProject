import {orderForm} from "./order.js";

const INPUTS = orderForm.querySelectorAll('input');

// localStorage.clear();
for (let input of INPUTS){
    if (input.value === localStorage[input.name]){
        input.checked = "checked";
    }

    if(localStorage[input.name]){
        input.value = localStorage[input.name];
    }
}


