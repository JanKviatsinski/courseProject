import {showModal, createDataTable} from './modal.js';
import {categoryValidation, isRequired, duplicateValidation,} from './validations.js';
import {saveOrder, getAllOrders} from './services.js';
import {getFromStorage, addDataToStorage, ORDER_KEY} from './storage.js';

const btnCloseModalOrder = document.querySelector('.order-form__btn--close-modal');
const modalOrderForm = document.querySelector('.order-form__modal');
const paragraphModalOrder = modalOrderForm.querySelector('.order-form__modal-paragraph');
const orderForm = document.querySelector('#order-form');
let order = getFromStorage();
const tableModalOrder = document.createElement('table');
const userName = orderForm.querySelector('.order-form__user-name');
const requestSuccessMessage = 'Отлично! Заказ принят.';
const requestErrorMessage = 'Упс, что-то пошло не так. Сообщите пожалуйста об этом по номеру телефона или' +
    ' напишите мне в телеграм.';
const messageNameNotSelected = 'Нужно обязательно ввести имя.';
const messageNoProductsSelected = 'Вы не выбрали ни одного продукта';
const messageDuplicateName = 'Заказ с таким именем уже есть. Используйте пожалуста' +
    ' другое имя.';

fillForm(JSON.parse(localStorage.getItem(ORDER_KEY)));

orderForm.addEventListener('change', (evt) => {
    const {name, value} = evt.target;

    order[name] = value;
})

orderForm.addEventListener('submit', async (evt) => {
        evt.preventDefault();
        const inputs = orderForm.querySelectorAll('input');
        const nameIsChecked = isRequired(order.name);
        const productsIsChecked = categoryValidation(inputs, 'product');

        if (!productsIsChecked) {
            showModal({
                displayableObj: modalOrderForm,
                message: messageNoProductsSelected,
                locationMessage: paragraphModalOrder
            });
            return;
        }

        if (!nameIsChecked) {
            showModal({
                displayableObj: modalOrderForm,
                message: messageNameNotSelected,
                locationMessage: paragraphModalOrder
            });
            return;
        }

        try {
            const orders = await (await getAllOrders()).json();

            if (orders === null) {
                await saveOrder(order);

                showModal({
                    displayableObj: modalOrderForm,
                    message: requestSuccessMessage,
                    locationMessage: paragraphModalOrder
                });

                createDataTable({
                    location: modalOrderForm,
                    data: order,
                    table: tableModalOrder,
                });
                return;
            }

            const isDuplicate = duplicateValidation(userName.value, orders);

            if (isDuplicate) {
                showModal({
                    displayableObj: modalOrderForm,
                    message: messageDuplicateName,
                    locationMessage: paragraphModalOrder
                });
            } else {
                await saveOrder(order);

                showModal({
                    displayableObj: modalOrderForm,
                    message: requestSuccessMessage,
                    locationMessage: paragraphModalOrder
                });

                createDataTable({
                    location: modalOrderForm,
                    data: order,
                    table: tableModalOrder,
                });
            }
        } catch (error) {
            showModal({
                displayableObj: modalOrderForm,
                message: requestErrorMessage,
                locationMessage: paragraphModalOrder
            });
        }
    }
)

function fillForm(data) {
    if (Object.keys(data).length === 0) {
        return;
    }

    if (data.name) {
        userName.value = data.name;
    }

    const inputs = orderForm.querySelectorAll('input');
    const allTextarea = orderForm.querySelectorAll('textarea')

    inputs.forEach((input) => {
        if (input.value === data[input.name]) {
            input.checked = 'checked';
        }
    })

    allTextarea.forEach((textarea) => {
        if (data[textarea.name]) {
            textarea.value = data[textarea.name];
        }
    })
}

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

orderForm.addEventListener('reset', () => {
    order = {};
})

window.addEventListener('unload', (evt) => {
    evt.preventDefault();
    addDataToStorage(ORDER_KEY, JSON.stringify(order));
})



