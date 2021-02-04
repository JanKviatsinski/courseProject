import {ORDER} from "./order-form.js";

export function formValidation(order){
    let nameIsChecked = false;
    let productIsChecked = false;

    for (let x in order){
        if ((x !== 'name' || x === 'note') && (x === 'name' || x !== 'note')){
            productIsChecked = true
        }
    }

    if (order.name){
        nameIsChecked = true;
    }
    return [nameIsChecked, productIsChecked];
}