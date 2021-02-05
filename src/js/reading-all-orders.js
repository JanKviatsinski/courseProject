import {URL_ORDER} from "./order-submit.js";
import {showModal} from "./show-modal.js";

export async function readingAllOrders (){

    try {
        const RESPONSE = await fetch(URL_ORDER);

        const ORDERS = await RESPONSE.json();
        return ORDERS;
    } catch (error){
        showModal('Упс, что-то пошло не так.')
        console.log('ОШИБКА', error);
        return false;
    }

}
