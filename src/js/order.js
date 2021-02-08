import {showModal} from "./show-modal.js";
import {productsValidation, nameValidation, duplicateValidation,} from "./validation.js";
import {saveOrder, getAllOrders} from "./services.js";
import {createDataTable} from "./create-table.js";
import {getFromStorage, addDataToStorage, orderForm} from "./storage.js";

export const modalOrderForm = document.querySelector('.order-form__modal');
export const paragraphModalOrder = modalOrderForm.querySelector('.order-form__modal-paragraph')
const tableModalOrder = document.createElement('table');
let order = getFromStorage();
const userName = orderForm.querySelector('.order-form__user-name');
const btnCloseModalOrder = document.querySelector('.order-form__btn--close-modal');

orderForm.addEventListener('change', (evt) => {
    evt.preventDefault();
    const {name, value} = evt.target;
    // console.log(name, value)
    order[name] = value;
    addDataToStorage(name, value);
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

        const orders = await (await getAllOrders()).json();

        switch (orders) {
            case null:
                await saveOrder(order, URL_ORDER_POST);
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
            await saveOrder(order);
            // console.log('есть')
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
})

btnCloseModalOrder.addEventListener('click',() => {
    modalOrderForm.style.display = 'none';
})

document.addEventListener('click', (evt) => {
    const clickObj = evt.target;

    if (modalOrderForm.compareDocumentPosition(clickObj) === 2) {
        modalOrderForm.style.display = 'none';
        tableModalOrder.remove();
    }
})






