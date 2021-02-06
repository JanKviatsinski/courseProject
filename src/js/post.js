import {showModal} from "./show-modal.js";
import {createDataTable} from "./create-table.js";
import {modalOrderForm, paragraphModalOrder} from "./order.js";


export async function post(data, url) {
    // try {
        const  response = await fetch(url, {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data),
        });
        return response;
    //
    //     showModal('Отлично! Заказ принят.');
    //
    //     PARAGRAPH_MODAL_ORDER.style.marginBottom = '1em';
    //
    //     createDataTable({
    //         location: MODAL_ORDER_FORM,
    //         data: data,
    //         table: TABLE_MODAL_ORDER_FORM,
    //     });
    // } catch (error) {
    //     showModal('Упс, что-то пошло не так.')
    //     console.log('ОШИБКА', error);
    // }
}