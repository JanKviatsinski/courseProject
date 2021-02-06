import {orderForm} from "./order.js";

const inputs = orderForm.querySelectorAll('input');

// localStorage.clear();
for (let input of inputs){
    if (input.value === localStorage[input.name]){
        input.checked = "checked";
    }

    if(localStorage[input.name]){
        input.value = localStorage[input.name];
    }
}


