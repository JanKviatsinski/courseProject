import {showModal} from "./show-modal.js";
// import {addProductsToOrder} from "./add-data-to-order.js";
import {searchNameInOrders} from "./search-name-in-orders.js";
import {formValidation} from "./form-validation.js";
import {readingAllOrders} from "./reading-all-orders.js";

export const URL_ORDER = 'https://course-project-kviatsinski-default-rtdb.firebaseio.com/orders.json';

export const ORDER_FORM = document.querySelector('#order-form');
export const MODAL_ORDER_FORM = document.querySelector('.order-form__modal');
export const PARAGRAPH_MODAL_ORDER = MODAL_ORDER_FORM.querySelector('.order-form__modal-paragraph')
const TABLE_MODAL_ORDER_FORM = document.createElement('table');
export const ORDER = {};
export const USER_NAME = ORDER_FORM.querySelector('.order-form__user-name');
export const USER_NOTE = ORDER_FORM.querySelector('textarea');


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



        async function postOrder(data, url) {
            try {
                await fetch(url, {
                        method: 'Post',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify(data),
                    });
                showModal('Отлично! Заказ принят.');
                PARAGRAPH_MODAL_ORDER.style.marginBottom = 1 + 'em';
                createDataTable(MODAL_ORDER_FORM, data, TABLE_MODAL_ORDER_FORM);
            } catch (error) {
                MODAL_ORDER_FORM.style.display = 'block';
                PARAGRAPH_MODAL_ORDER.textContent =
                    'Упс, что-то пошло не так. Попробуйте пожалуйста позже.';
                PARAGRAPH_MODAL_ORDER.style.marginBottom = '0';
                console.log('ОШИБКА', error);
            }
        }
    }
)

function delet() {
    fetch(URL_ORDER, {method: 'DELETE',})
}

// delet ()
document.body.addEventListener('click', (evt) => {
    const CLICK_OBJ = evt.target;

    if (MODAL_ORDER_FORM.compareDocumentPosition(CLICK_OBJ) === 2) {
        MODAL_ORDER_FORM.style.display = 'none';
        TABLE_MODAL_ORDER_FORM.remove();
    }


    // if(clickObj !== btnGreetingOwner)
    // greetingOwner.hidden = !greetingOwner.hidden;
    // (!greetingOwner.hidden) ?
    //     btnGreetingOwner.style.animationName = 'none' :
    //     btnGreetingOwner.style.animationName = 'button-animation';
})

function createDataTable(location, data, table) {
    table.innerHTML = '';

    for (let listPosition in data) {
        const TABLE_ROW = table.insertRow();
        const POINT = TABLE_ROW.insertCell();
        const VALUE = TABLE_ROW.insertCell();
        POINT.textContent = listPosition;
        VALUE.textContent = data[listPosition];
    }

    location.append(table);
}



