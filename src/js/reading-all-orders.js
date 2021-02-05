import {URL_ORDER} from "./order-submit.js";

export async function readingAllOrders (){
    const RESPONSE = await fetch(URL_ORDER);
    let orders;

    orders = await RESPONSE.json();
    return orders;
}
