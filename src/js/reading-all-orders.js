import {URL_ORDER_GET} from "./order.js";
import {showModal} from "./show-modal.js";

export async function readingAllOrders (urlGet){
    try {
        const RESPONSE = await fetch(urlGet);

        const ORDERS = await RESPONSE.json();
        return ORDERS;
    } catch (error){
        showModal('Упс, что-то пошло не так.')
        console.log('ОШИБКА', error);
        return false;
    }
}
