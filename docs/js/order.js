import {showModal} from './modal.js';
import {productsValidation, nameValidation} from './validation.js';
import {saveOrder, getUserOrders} from './services.js';
import {createTableInModal} from './modal.js';
import {getFromStorage, addDataToStorage, completeForm} from './storage.js';
import {collectUserData} from './identification.js';

export const orderForm = document.querySelector('#order-form');
const ORDER_KEY = 'order';
const MESSAGE_NO_REGISTRATION = 'Пройдите пожалуйста регистрацию, это нужно для просмотра своих' +
    ' заказов';
const MESSAGE_NO_PRODUCTS_SELECTED = 'Вы не выбрали ни одного продукта.';
const MESSAGE_POST_SUCCESS = 'Отлично! Заказ принят.';
export const MESSAGE_ERROR = 'Упс, что-то пошло не так. Сообщите пожалуйста об этом по номеру телефона' +
    ' или' +
    ' напишите мне в телеграм.';
let order = getFromStorage(ORDER_KEY);

completeForm(orderForm, ORDER_KEY);

orderForm.addEventListener('change', (evt) => {
    const {name, value} = evt.target;
    order[name] = value;
})

orderForm.addEventListener('submit', async (evt) => {
        evt.preventDefault();
        let {userName, userEmail} = collectUserData();

        const userRegistered = nameValidation(userName);

        if (!userRegistered) {
            showModal(MESSAGE_NO_REGISTRATION)
            return;
        }

        const productsIsChecked = productsValidation(orderForm);

        if (!productsIsChecked) {
            showModal(MESSAGE_NO_PRODUCTS_SELECTED);
            return;
        }

        order.name = userName;
        order.email = userEmail;

        try {
            const responseSaveOrder = await saveOrder(order);
            const resultSaveOrder = await responseSaveOrder.json();
            console.log('рзультат', resultSaveOrder)

            showModal(MESSAGE_POST_SUCCESS);

            createTableInModal(order);
            // const responseUserOrders = await getUserOrders();
            // const resultUserOrders = await responseUserOrders.json();
            //
            // console.log(resultUserOrders);
        } catch {
            showModal(MESSAGE_ERROR);
        }
    }
)

orderForm.addEventListener('reset', () => {
    order = {};
})

window.addEventListener('unload', (evt) => {
    evt.preventDefault();
    addDataToStorage(ORDER_KEY, JSON.stringify(order));
})



