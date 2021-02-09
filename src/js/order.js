import {showModal} from './modal.js';
import {productsValidation, nameValidation, duplicateValidation,} from './validation.js';
import {saveOrder, getAllOrders} from './services.js';
import {createDataTable} from './modal.js';
import {getFromStorage, addDataToStorage} from './storage.js';

export const orderForm = document.querySelector('#order-form');
export const modalOrderForm = document.querySelector('.order-form__modal');
export const paragraphModalOrder = modalOrderForm.querySelector('.order-form__modal-paragraph');
let order = getFromStorage();
const tableModalOrder = document.createElement('table');
const userName = orderForm.querySelector('.order-form__user-name');
const btnCloseModalOrder = document.querySelector('.order-form__btn--close-modal');

completeForm(orderForm);

orderForm.addEventListener('change', (evt) => {
    const {name, value} = evt.target;

    order[name] = value;
    addDataToStorage(name, value);
})

orderForm.addEventListener('submit', async (evt) => {
        evt.preventDefault();

        const nameIsChecked = nameValidation(order);
        const productsIsChecked = productsValidation(orderForm);

        if (!productsIsChecked) {
            showModal('Вы не выбрали ни одного продукта');
            return;
        }

        if (!nameIsChecked) {
            showModal('Нужно обязательно ввести имя.');
            return;
        }

        try {
            const orders = await (await getAllOrders()).json();

            if (orders === null) {
                //можно запаковать код ниже в отдельную функцию, но как ее назвать если она
                // делает несколько разных действий
                await saveOrder(order);
                showModal('Отлично! Заказ принят.');

                paragraphModalOrder.style.marginBottom = '1em';

                createDataTable({
                    location: modalOrderForm,
                    data: order,
                    table: tableModalOrder,
                });
                return;
            }

            const isDuplicate = duplicateValidation(userName.value, orders);

            if (isDuplicate) {
                showModal('Заказ с таким именем уже есть. Используйте пожалуста' +
                    ' другое имя.')
            } else {
                await saveOrder(order);
                showModal('Отлично! Заказ принят.');

                paragraphModalOrder.style.marginBottom = '1em';

                createDataTable({
                    location: modalOrderForm,
                    data: order,
                    table: tableModalOrder,
                });
            }
        } catch (error) {
            showModal('Упс, что-то пошло не так. Сообщите пожалуйста об этом по номеру телефона или' +
                ' напишите мне в телеграм.');
        }
    }
)

function completeForm(form) {
    const inputs = form.querySelectorAll('input');

    for (let input of inputs) {
        if (input.value === localStorage[input.name]) {
            input.checked = "checked";
        }

        if (localStorage[input.name]) {
            input.value = localStorage[input.name];
        }
    }

    const allTextarea = form.querySelectorAll('textarea')

    for (let textarea of allTextarea) {
        if (localStorage[textarea.name]) {
            textarea.value = localStorage[textarea.name];
        }
    }
}

orderForm.addEventListener('reset', () => {
    order = {};
})

btnCloseModalOrder.addEventListener('click', () => {
    modalOrderForm.style.display = 'none';
})

document.addEventListener('click', (evt) => {
    const clickObj = evt.target;

    if (modalOrderForm.compareDocumentPosition(clickObj) === 2) {
        modalOrderForm.style.display = 'none';
        tableModalOrder.remove();
    }
})



// window.onunload = function() {
//     console.log(454);
//     addDataToStorage(order);
//     console.log(localStorage);
//     return false;
// };


