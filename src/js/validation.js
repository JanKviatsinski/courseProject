import {orderForm} from "./order.js";

// orderForm.addEventListener('change', (evt) => {
//     evt.preventDefault();
//     const CLICK_OBJ = evt.target;
//
//     if ((CLICK_OBJ.type === 'radio' || CLICK_OBJ.type === 'checkbox') && CLICK_OBJ.name !== 'address'){
//         productsIsChecked = true;
//     }
// })

let productsIsChecked = true;/*изменить на фолс*/

export function productsValidation(){
    return productsIsChecked;
}

export function nameValidation(order){
    let nameIsChecked;
    order.name ? nameIsChecked = true : nameIsChecked = false;

    return nameIsChecked;
}

export function duplicateValidation(name, orders){
    let nameIsOnOrders = false;

    for (let order in orders){
        if (orders[order].name === name){
            nameIsOnOrders = true;
        }
    }

    return nameIsOnOrders;
}
