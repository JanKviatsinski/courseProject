import {showModal} from "./show-modal.js";
import {createDataTable} from "./create-table.js";
import {MODAL_ORDER_FORM, PARAGRAPH_MODAL_ORDER} from "./order.js";

export const TABLE_MODAL_ORDER_FORM = document.createElement('table');

export async function postOrder(data, url) {
    try {
        await fetch(url, {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data),
        });

        showModal('Отлично! Заказ принят.');

        PARAGRAPH_MODAL_ORDER.style.marginBottom = '1em';

        createDataTable({
            location: MODAL_ORDER_FORM,
            data: data,
            table: TABLE_MODAL_ORDER_FORM,
        });
    } catch (error) {
        showModal('Упс, что-то пошло не так.')
        console.log('ОШИБКА', error);
    }
}