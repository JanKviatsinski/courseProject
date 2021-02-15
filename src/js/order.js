import {showModal, createDialogueButtons} from './modal.js';
import {productsValidation, duplicateValidation, nameValidation} from './validation.js';
import {saveOrder, getUserOrders, authentication, registration} from './services.js';
import {createDataTable} from './modal.js';
import {getFromStorage, addDataToStorage, ORDER_KEY, completeForm} from './storage.js';
import {collectUserData} from './identification.js';

export const orderForm = document.querySelector('#order-form');
const tableModalOrder = document.createElement('table');
const MESSAGE_NO_REGISTRATION = 'Пройдите пожалуйста регистрацию, это нужно для просмотра своих' +
    ' заказов';
const requestSuccessMessage = 'Отлично! Заказ принят.';
const requestErrorMessage = 'Упс, что-то пошло не так. Сообщите пожалуйста об этом по номеру телефона или' +
    ' напишите мне в телеграм.';
const messageNoProductsSelected = 'Вы не выбрали ни одного продукта';
const messageDuplicateName = 'Заказ с таким именем уже есть. Используйте пожалуста' +
    ' другое имя.';
let order = getFromStorage(ORDER_KEY);

completeForm(orderForm, ORDER_KEY);

orderForm.addEventListener('change', (evt) => {
    const {name, value} = evt.target;
    order[name] = value;
})

orderForm.addEventListener('submit', async (evt) => {
        evt.preventDefault();
        let [userName, userEmail] = collectUserData();

        const userRegistered = nameValidation(userName);

        if (!userRegistered) {
            showModal(MESSAGE_NO_REGISTRATION)
            return;
        }

        const productsIsChecked = productsValidation(orderForm);

        if (!productsIsChecked) {
            showModal(messageNoProductsSelected);
            return;
        }

        order.name = userName;
        order.email = userEmail;

        const responseSaveOrder = await saveOrder(order)
        const resultSaveOrder = await responseSaveOrder.json();
        console.log('рзультат', resultSaveOrder)

        const responseUserOrders = await getUserOrders();
        const resultUserOrders = await responseUserOrders.json();

        console.log(resultUserOrders);


        return;


//////-------------------------------//////////////////////////////
        // const nameIsChecked = nameValidation(order);


        // if (!nameIsChecked) {
        //     showModal({
        //         displayableObj: modalOrderForm,
        //         message: messageNameNotSelected,
        //         locationMessage: paragraphModalOrder
        //     });
        //     return;
        // }

        try {
            const orders = await (await getUserOrders()).json();

            if (orders === null) {
                //можно запаковать код ниже в отдельную функцию, но как ее назвать если она
                // делает несколько разных действий
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

orderForm.addEventListener('reset', () => {
    order = {};
})

window.addEventListener('unload', (evt) => {
    evt.preventDefault();
    addDataToStorage(ORDER_KEY, JSON.stringify(order));
})



