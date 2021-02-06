// import {orderForm} from "./order.js";
//
// orderForm.addEventListener('change', (evt) => {
//     evt.preventDefault();
//     const clickObj = evt.target;
//
//     if ((clickObj.type === 'radio' || clickObj.type === 'checkbox') && clickObj.name !== 'address'){
//         productsIsChecked = true;
//     }
// })

let productsIsChecked = false;/*изменить на фолс*/

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
