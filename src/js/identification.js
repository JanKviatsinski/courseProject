import {authentication, registration, saveOrder} from './services.js';
import {createDialogueButtons, showModal, hideModal} from './modal.js';
import {nameValidation, passwordValidation} from './validation.js';

const FormIdentification = document.querySelector('#registration-form');
const identificationBtnSubmit = FormIdentification.querySelector('.registration-form__btn--submit');
const identificationBtnReset = FormIdentification.querySelector('.registration-form__btn--reset');
const MESSAGE_NAME_NOT_SELECTED = 'Нужно обязательно ввести имя.';
const MESSAGE_REGISTRATION_QUESTION = 'Зарегестрируемся?';
const MESSAGE_REGISTRATION_SUCCESSFUL = 'Добро пожаловать';
const MESSAGE_PASSWORD_NOT_VALID = 'Пароль должен быть не короче шести символов.'
let userEmail;
let userPassword;
let userName;
let idToken;
let localId;


for (let x of ' @ '){
    console.log(x === '@')
}

FormIdentification.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    userName = FormIdentification.querySelector('#registration-form__user-name').value;
    const nameIsChecked = nameValidation(userName);

    if (!nameIsChecked) {
        showModal(MESSAGE_NAME_NOT_SELECTED);
        return;
    }

    userPassword = FormIdentification.querySelector('#registration-form__password').value;
   const passwordIsValid = passwordValidation(userPassword);

    if (!passwordIsValid) {
        showModal(MESSAGE_PASSWORD_NOT_VALID);
        return;
    }

    userEmail = FormIdentification.querySelector('#registration-form__email').value;

    console.log(userEmail);
    console.log(userPassword)

    const responseAuth = await authentication(userEmail, userPassword);
    const resultAuth = await responseAuth.json();
    idToken = resultAuth.idToken;
    localId = resultAuth.localId;
    console.log(localId);

    if (idToken === undefined) {
        showModal(MESSAGE_REGISTRATION_QUESTION);

        const btnRegistrationOK = document.createElement('button');
        const btnRegistrationCancel = document.createElement('button');
        createDialogueButtons(btnRegistrationOK, btnRegistrationCancel);

        btnRegistrationOK.addEventListener('click', async () => {
            console.log('содаем нового');
            hideModal();

            const responseRegistration = await registration(userEmail, userPassword);
            const resultRegistration = await responseRegistration.json();
            idToken = resultRegistration.idToken;
            localId = resultRegistration.localId;

            if (idToken !== undefined){
                showModal(MESSAGE_REGISTRATION_SUCCESSFUL);
            }
        })
        return;

    } /*else {
        const responseSaveOrder = await saveOrder(localId, {
            email: userEmail,
            id: localId,
            index: 2,
        })
        const resultSaveOrder = await responseSaveOrder.json();
        console.log('рзультат', resultSaveOrder);*/

        // const responseUserOrders = await getUserOrders(localId, idToken);
        // const resultUserOrders = await responseUserOrders.json();
        //
        // console.log(resultUserOrders);
    // }
    // return;
})
