import {showModal} from "./show-modal.js";
import {productsValidation, nameValidation, duplicateValidation} from "./validation.js";
import {reading} from "./reading.js";
import {post} from "./post.js";
import {addDataToLocalStr} from "./add-data-to-localStr.js";
import {createDataTable} from "./create-table.js";

export const tableModalOrder = document.createElement('table');
export const URL_ORDER_GET = 'https://course-project-kviatsinski-default-rtdb.firebaseio.com/orders.json';
const URL_ORDER_POST = 'https://course-project-kviatsinski-default-rtdb.firebaseio.com/orders.json';
export const orderForm = document.querySelector('#order-form');
export const modalOrderForm = document.querySelector('.order-form__modal');
export const paragraphModalOrder = modalOrderForm.querySelector('.order-form__modal-paragraph')
export let order = localStorage;
export const userName = orderForm.querySelector('.order-form__user-name');
const btnCloseModalOrder = document.querySelector('.order-form__btn--close-modal');
console.log(order);

orderForm.addEventListener('change', (evt) => {
    evt.preventDefault();
    const CLICK_OBJ = evt.target;
    order[CLICK_OBJ.name] = CLICK_OBJ.value;
    /*добавить сторедж в ордер*/
    addDataToLocalStr(CLICK_OBJ.name, CLICK_OBJ.value);
})

orderForm.addEventListener('submit', async (evt) => {
        evt.preventDefault();

        const nameIsChecked = nameValidation(order);
        const productsIsChecked = productsValidation(orderForm);

        if (!productsIsChecked) {
            showModal('Вы не выбрали ни одного продукта');
            return false;
        }

        if (!nameIsChecked) {
            showModal('Нужно обязательно ввести имя.');
            return false;
        }

        const orders = await (await reading(URL_ORDER_GET)).json();

        switch (orders) {
            case null:
                await post(order, URL_ORDER_POST);
                console.log('нет заказов')
                showModal('Отлично! Заказ принят.');

                paragraphModalOrder.style.marginBottom = '1em';

                createDataTable({
                    location: modalOrderForm,
                    data: order,
                    table: tableModalOrder,
                });
                return false;
            case false:
                return false;
        }

        const isDuplicate = await duplicateValidation(userName.value, orders);

        if (isDuplicate) {
            showModal('Заказ с таким именем уже есть. Используйте пожалуста' +
                ' другое имя.')
        } else {
            await post(order, URL_ORDER_POST);
            console.log('есть')
            showModal('Отлично! Заказ принят.');

            paragraphModalOrder.style.marginBottom = '1em';

            createDataTable({
                location: modalOrderForm,
                data: order,
                table: tableModalOrder,
            });
        }
    }
)

orderForm.addEventListener('reset', () => {
    order = {};
    console.log(order);
})

btnCloseModalOrder.addEventListener('click',() => {
    modalOrderForm.style.display = 'none';
})

function delet() {
    fetch(URL_ORDER_GET, {method: 'DELETE',})
}

// delet ();




