import {showModal} from "./show-modal.js";
import {ORDER} from "./order-form.js";

export function productsValidation(){
    let productIsChecked = true;
    if (!Object.keys(ORDER)[0]) {
        productIsChecked = false;
    }
    return productIsChecked;
}