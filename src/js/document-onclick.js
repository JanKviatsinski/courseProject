import {modalOrderForm} from "./order.js";
import {tableModalOrder} from "./order.js";

document.addEventListener('click', (evt) => {
    const CLICK_OBJ = evt.target;

    if (modalOrderForm.compareDocumentPosition(CLICK_OBJ) === 2) {
        modalOrderForm.style.display = 'none';
        tableModalOrder.remove();
    }
})