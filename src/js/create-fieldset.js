import {createLabel} from "./create-label";

function createFieldset({legend, inputType, inputName, values}) {
    const template = document.querySelector('#form-template');
    const cloneNode = template.content.cloneNode( true);
    const fieldset = cloneNode.querySelector('.order-form__fieldset');
    const fieldsetLegend = fieldset.querySelector('legend');

    fieldsetLegend.textContent = legend;
    for (let value of values) {
        fieldset.append(createLabel ({
            value: value,
            type: inputType,
            name: inputName,
        }));
    }

    const formProducts = document.querySelector('.order-form__products');
    formProducts.append(cloneNode);
}

createFieldset({
    legend: 'Сыр белый',
    inputType: 'radio',
    inputName: 'white-cheese',
    values: [300, 500, 700, 1000, 1500],
});

createFieldset({
    legend: 'Сыр желтый',
    inputType: 'radio',
    inputName: 'yellow-cheese',
    values: [300, 500, 700, 1000, 1500],
});

createFieldset({
    legend: 'Творог',
    inputType: 'radio',
    inputName: 'curd',
    values: [500, 1000, 1500],
});

createFieldset({
    legend: 'Масло',
    inputType: 'radio',
    inputName: 'butter',
    values: [300, 500, 700, 1000, 1500],
});

createFieldset({
    legend: 'Молоко',
    inputType: 'radio',
    inputName: 'milk',
    values: [1, 2, 3],
});

createFieldset({
    legend: 'Сыворотка',
    inputType: 'radio',
    inputName: 'serum',
    values: [1, 2],
});

createFieldset({
    legend: 'Адрес где можете забрать заказ',
    inputType: 'radio',
    inputName: 'address',
    values: ['Адрес доставки 1', 'Адрес доставки 2'],
});
