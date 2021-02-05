import {showModal} from "./show-modal.js";
import {searchNameInOrders} from "./search-name-in-orders.js";
import {productValidation} from "./product-validation.js";
import {nameValidation} from "./name-validation.js";
import {readingAllOrders} from "./reading-all-orders.js";
import {postOrder} from "./post-order.js";

export const URL_ORDER = 'https://course-project-kviatsinski-default-rtdb.firebaseio.com/orders.json';
export const ORDER_FORM = document.querySelector('#order-form');
// const BTN_RESET = ORDER_FORM.querySelector('.order-form__btn--reset');
export const MODAL_ORDER_FORM = document.querySelector('.order-form__modal');
export const PARAGRAPH_MODAL_ORDER = MODAL_ORDER_FORM.querySelector('.order-form__modal-paragraph')
export let ORDER = {};
export const USER_NAME = ORDER_FORM.querySelector('.order-form__user-name');

ORDER_FORM.addEventListener('submit', async (evt) => {
        evt.preventDefault();

        const PRODUCT_IS_CHECKED = productValidation(ORDER);
        const NAME_IS_CHECKED = nameValidation(ORDER);

        if (!(PRODUCT_IS_CHECKED && NAME_IS_CHECKED)) {
            return false;
        }

        const ORDERS = await readingAllOrders();

        switch (ORDERS) {
            case null:
                postOrder(ORDER, URL_ORDER);
                return false;
                // break; ругается
            case false:
                return false;
                // break;
        }

        const NAME_IS_IN_ORDER = await searchNameInOrders(USER_NAME, ORDERS);

        NAME_IS_IN_ORDER ? showModal('Заказ с таким именем уже есть. Используйте пожалуста' +
            ' другое имя.') : postOrder(ORDER, URL_ORDER);
    }
)

ORDER_FORM.addEventListener('reset', () => {
    ORDER = {};
})


function delet() {
    fetch(URL_ORDER, {method: 'DELETE',})
}

// delet ();


// if (ORDERS === null) {
//             postOrder(ORDER, URL_ORDER);
//             return false;
//         }
//
// if (!ORDERS) {
//     return false;/*nado li?*/
// }



