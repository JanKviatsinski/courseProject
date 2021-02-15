import {showModal, createDialogueButtons} from './modal.js';
import {productsValidation, nameValidation, duplicateValidation,} from './validation.js';
import {saveOrder, getUserOrders, authentication, registration} from './services.js';
import {createDataTable} from './modal.js';
import {getFromStorage, addDataToStorage} from './storage.js';

const modalOrderForm = document.querySelector('.modal');
const paragraphModalOrder = modalOrderForm.querySelector('.modal__paragraph');
export const orderForm = document.querySelector('#order-form');
let order = getFromStorage();

const tableModalOrder = document.createElement('table');
const userName = orderForm.querySelector('.order-form__user-name');
const btnCloseModalOrder = document.querySelector('.modal__btn--close-modal');
const requestSuccessMessage = 'Отлично! Заказ принят.';
const requestErrorMessage = 'Упс, что-то пошло не так. Сообщите пожалуйста об этом по номеру телефона или' +
    ' напишите мне в телеграм.';
const messageNoProductsSelected = 'Вы не выбрали ни одного продукта';
const messageDuplicateName = 'Заказ с таким именем уже есть. Используйте пожалуста' +
    ' другое имя.';
const messageRegistrationQuestion = 'Зарегестрируемся?';


completeForm(orderForm);

// orderForm.addEventListener('change', (evt) => {
//     const {name, value} = evt.target;
//
//     order[name] = value;
// })

orderForm.addEventListener('submit', async (evt) => {
        evt.preventDefault();
        const userEmail = orderForm.querySelector('#order-form__email').value;
        const userPassword = orderForm.querySelector('#order-form__password').value;
        console.log(userEmail)
        console.log(userPassword)
        let idToken;
        let localId;

        const responseAuth = await authentication(userEmail, userPassword);
        const resultAuth = await responseAuth.json();
        idToken = resultAuth.idToken;
        localId = resultAuth.localId;
        console.log(localId)

        // if (idToken === undefined) {
        //     showModal({
        //         displayableObj: modalOrderForm,
        //         message: messageRegistrationQuestion,
        //         locationMessage: paragraphModalOrder
        //     });
        //     modalOrderForm.append(createDialogueButtons({
        //         wrapClassName: 'registration-dialog',
        //         buttons: {
        //             cancel: 'registration-dialog__button--cancel',
        //             ok: 'registration-dialog__button--OK'
        //         },
        //     }))
        //
        //
        //     return;
        //     console.log('содаем нового');
        //     const responseRegistration = await registration(userEmail, userPassword);
        //     const resultRegistration = await responseRegistration.json();
        //     idToken = resultRegistration.idToken;
        //     localId = resultRegistration.localId;
        // } else {
        //     const responseSaveOrder = await saveOrder(localId, {
        //         email: userEmail,
        //         id: localId,
        //         index: 2,
        //     })
        //     const resultSaveOrder = await responseSaveOrder.json();
        //     console.log('рзультат', resultSaveOrder)
        //
        //     // const responseUserOrders = await getUserOrders(localId, idToken);
        //     // const resultUserOrders = await responseUserOrders.json();
        //     //
        //     // console.log(resultUserOrders);
        // }

        return;


//////-------------------------------//////////////////////////////
        // const nameIsChecked = nameValidation(order);
        const productsIsChecked = productsValidation(orderForm);

        if (!productsIsChecked) {
            showModal({
                displayableObj: modalOrderForm,
                message: messageNoProductsSelected,
                locationMessage: paragraphModalOrder
            });
            return;
        }

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

function completeForm(form) {
    if (!localStorage.order) {
        return;
    }

    const orderFromStorage = JSON.parse(localStorage.order);
    const inputs = form.querySelectorAll('input');
    const allTextarea = form.querySelectorAll('textarea')

    for (let input of inputs) {
        if (input.value === orderFromStorage[input.name]) {
            input.checked = 'checked';
        }

        if (orderFromStorage.name && input.name === 'name') {
            input.value = orderFromStorage.name;
        }
    }

    for (let textarea of allTextarea) {
        if (orderFromStorage[textarea.name]) {
            textarea.value = orderFromStorage[textarea.name];
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

window.addEventListener('unload', (evt) => {
    evt.preventDefault();
    addDataToStorage('order', JSON.stringify(order));
})



