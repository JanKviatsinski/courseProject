import {USER_NAME, URL_ORDER} from "./order-form.js";

export async function readingAllOrders (){
    const RESPONSE = await fetch(URL_ORDER);
    let orders;
    orders = await RESPONSE.json();

    for (let orderId in orders) {
        orders[orders[orderId][USER_NAME.placeholder]] = {...orders[orderId]};
        orders[orders[orderId][USER_NAME.placeholder]].id = orderId;
    }

    return orders;
}