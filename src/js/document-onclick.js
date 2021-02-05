import {MODAL_ORDER_FORM} from "./order-submit.js";
import {TABLE_MODAL_ORDER_FORM} from "./post-order.js";

document.addEventListener('click', (evt) => {
    const CLICK_OBJ = evt.target;

    if (MODAL_ORDER_FORM.compareDocumentPosition(CLICK_OBJ) === 2) {
        MODAL_ORDER_FORM.style.display = 'none';
        TABLE_MODAL_ORDER_FORM.remove();
    }
})