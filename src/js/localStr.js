import {USER_NAME} from "./order-submit.js";
import {FORM_PRODUCTS} from "./create-fieldset.js";
const INPUTS = FORM_PRODUCTS.querySelectorAll('input');

// USER_NAME.value = localStorage.name;
// localStorage.clear();
// const ADDRESSES = FORM_PRODUCTS.getElementsByName('address');
for (let input of INPUTS){
    if (input.value === localStorage[input.name]){
        input.checked = "checked";
        // input.value = localStorage[input.name];
    }
}


