import {orderForm} from "./order.js";

let productsIsChecked = false;

export function productsValidation(){
    return productsIsChecked;
}

orderForm.addEventListener('change', (evt) => {
    evt.preventDefault();
    const CLICK_OBJ = evt.target;

    if ((CLICK_OBJ.type === 'radio' || CLICK_OBJ.type === 'checkbox') && CLICK_OBJ.name !== 'address'){
        productsIsChecked = true;
    }
})

export function nameValidation(order){
    let nameIsChecked;
    order.name ? nameIsChecked = true : nameIsChecked = false;

    return nameIsChecked;
}
