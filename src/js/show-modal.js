import {MODAL_ORDER_FORM, PARAGRAPH_MODAL_ORDER} from "./order-form.js";

export function showModal (titleText){
    MODAL_ORDER_FORM.style.display = 'block';
    PARAGRAPH_MODAL_ORDER.textContent = titleText;
    PARAGRAPH_MODAL_ORDER.style.marginBottom = '0';
}