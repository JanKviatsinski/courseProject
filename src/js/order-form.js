import {showModal} from "./show-modal.js";
// import {addProductsToOrder} from "./add-data-to-order.js";
import {searchNameInOrders} from "./search-name-in-orders.js";
import {formValidation} from "./form-validation.js";
import {readingAllOrders} from "./reading-all-orders.js";
import {postOrder} from "./post-order.js";

export const URL_ORDER = 'https://course-project-kviatsinski-default-rtdb.firebaseio.com/orders.json';
export const ORDER_FORM = document.querySelector('#order-form');
const BTN_RESET = ORDER_FORM.querySelector('.order-form__btn--reset');
export const MODAL_ORDER_FORM = document.querySelector('.order-form__modal');
export const PARAGRAPH_MODAL_ORDER = MODAL_ORDER_FORM.querySelector('.order-form__modal-paragraph')
export let ORDER = {};
export const USER_NAME = ORDER_FORM.querySelector('.order-form__user-name');

ORDER_FORM.addEventListener('submit', async (evt) => {
        evt.preventDefault();

        let [nameIsChecked, productIsChecked] = formValidation(ORDER);

    if (!productIsChecked) {
        showModal('Вы не выбрали ни одного продукта');
        return false;
    }

    if (!nameIsChecked) {
        showModal('Нужно обязательно ввести имя.');
        return false;
    }

        const ORDERS = await readingAllOrders();

        if (ORDERS === null) {
            postOrder(ORDER, URL_ORDER);
            return false;/*nado li?*/
        }

        const NAME_IS_IN_ORDER = await searchNameInOrders(USER_NAME,ORDERS);

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






