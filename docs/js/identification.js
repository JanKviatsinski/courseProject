import {authentication, registration} from './services.js';
import {createDialogueButtons, showModal, hideModal} from './modal.js';
import {nameValidation, passwordValidation, emailValidation} from './validation.js';
import {addDataToStorage, completeForm, getFromStorage} from './storage.js';
import {MESSAGE_ERROR} from './order.js';

const FormIdentification = document.querySelector('#registration-form');
const identificationBtnSubmit = FormIdentification.querySelector('.registration-form__btn--submit');
const identificationBtnReset = FormIdentification.querySelector('.registration-form__btn--reset');
const MESSAGE_NAME_NOT_SELECTED = 'Нужно обязательно ввести имя.';
const MESSAGE_REGISTRATION_QUESTION = 'Зарегестрируемся?';
const MESSAGE_IDENTIFICATION_SUCCESSFUL = 'Добро пожаловать';
const MESSAGE_PASSWORD_NOT_VALID = 'Пароль не должен быть короче шести символов.';
const MESSAGE_EMAIL_NOT_VALID = 'Что-то не так с вашим Email.'
const IDENTIFICATION_DATA_KEY = 'userData';
let userEmail;
let userPassword;
let userName;
let idToken;
let localId;
let userData = getFromStorage(IDENTIFICATION_DATA_KEY);

completeForm(FormIdentification, IDENTIFICATION_DATA_KEY);

FormIdentification.addEventListener('change', (evt) => {
    const {name, value, type} = evt.target;
    userData[name] = value;

    // if (type !== 'password'){
    //     userData[name] = value;
    // }
})

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
    const emailIsValid = emailValidation(userEmail);

    if (!emailIsValid) {
        showModal(MESSAGE_EMAIL_NOT_VALID);
        return;
    }

    try {
        const responseAuth = await authentication(userEmail, userPassword);
        const resultAuth = await responseAuth.json();
        idToken = resultAuth.idToken;
        localId = resultAuth.localId;
console.log(responseAuth);
        if (idToken === 1) {
            showModal(MESSAGE_REGISTRATION_QUESTION);

            const btnRegistrationOK = document.createElement('button');
            const btnRegistrationCancel = document.createElement('button');
            createDialogueButtons(btnRegistrationOK, btnRegistrationCancel);

            btnRegistrationOK.addEventListener('click', async () => {
                console.log('создаем нового');
                hideModal();


                const responseRegistration = await registration(userEmail, userPassword, userName);
                const resultRegistration = await responseRegistration.json();
                idToken = resultRegistration.idToken;
                localId = resultRegistration.localId;

                if (idToken !== undefined) {
                    showModal(MESSAGE_IDENTIFICATION_SUCCESSFUL);
                }
            })
        } else {
            showModal(MESSAGE_IDENTIFICATION_SUCCESSFUL);
        }
    } catch (error) {
        showModal(MESSAGE_ERROR);
        console.log('ERROR', error)
    }
})

export function collectUserData() {
    return {userName, userEmail, localId, idToken};
}

window.addEventListener('unload', (evt) => {
    evt.preventDefault();
    addDataToStorage(IDENTIFICATION_DATA_KEY, JSON.stringify(userData));
})
