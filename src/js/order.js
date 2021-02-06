import {showModal} from "./show-modal.js";
import {searchNameInOrders} from "./search-name-in-orders.js";
import {productsValidation, nameValidation} from "./validation.js";
import {readingAllOrders} from "./reading-all-orders.js";
import {postOrder} from "./post-order.js";
import {addDataToLocalStr} from "./add-data-to-localStr.js";

export const URL_ORDER_GET = 'https://course-project-kviatsinski-default-rtdb.firebaseio.com/orders.json';
export const orderForm = document.querySelector('#order-form');
// const BTN_RESET = ORDER_FORM.querySelector('.order-form__btn--reset');
export const MODAL_ORDER_FORM = document.querySelector('.order-form__modal');
export const PARAGRAPH_MODAL_ORDER = MODAL_ORDER_FORM.querySelector('.order-form__modal-paragraph')
export let ORDER = {};
export const USER_NAME = orderForm.querySelector('.order-form__user-name');

orderForm.addEventListener('change', (evt) => {
    evt.preventDefault();
    const CLICK_OBJ = evt.target;
    ORDER[CLICK_OBJ.name] = CLICK_OBJ.value;

    addDataToLocalStr(CLICK_OBJ.name, CLICK_OBJ.value);

})

orderForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    const nameIsChecked = nameValidation(ORDER);
    const productsIsChecked = productsValidation(orderForm);

    if (!productsIsChecked) {
        showModal('Вы не выбрали ни одного продукта');
        return false;
    }

    if (!nameIsChecked) {
        showModal('Нужно обязательно ввести имя.');
        return false;
    }

        const orders = await readingAllOrders();

        switch (orders) {
            case null:
                postOrder(ORDER, URL_ORDER_GET);
                return false;
                // break; ругается
            case false:
                return false;
                // break;
        }

        const NAME_IS_IN_ORDER = await searchNameInOrders(USER_NAME, orders);

        NAME_IS_IN_ORDER ? showModal('Заказ с таким именем уже есть. Используйте пожалуста' +
            ' другое имя.') : postOrder(ORDER, URL_ORDER_GET);
    }
)

orderForm.addEventListener('reset', () => {
    ORDER = {};
})


function delet() {
    fetch(URL_ORDER_GET, {method: 'DELETE',})
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



