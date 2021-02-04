import {ORDER_FORM} from "./order-form.js";
import {ORDER} from "./order-form.js";

const BTN_RESET = ORDER_FORM.querySelector('.order-form__btn--reset');

BTN_RESET.addEventListener('click', () => {
    ORDER = {};
})