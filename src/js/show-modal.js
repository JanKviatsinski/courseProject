import {modalOrderForm, paragraphModalOrder} from './order.js';

export function showModal(titleText) {
    modalOrderForm.style.display = 'flex';
    paragraphModalOrder.textContent = titleText;
    paragraphModalOrder.style.marginBottom = '0';
}