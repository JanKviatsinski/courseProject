import {URL_ORDER_GET} from "./order.js";
import {showModal} from "./show-modal.js";

export async function reading (urlGet){
    // try {
        const response =await fetch(urlGet);
        return response;
    // } catch (error){
    //     showModal('Упс, что-то пошло не так.')
    //     console.log('ОШИБКА', error);
    //     return false;
    // }
}
