function createFieldset(legend, inputType, inputName, ...rest){
    const template = document.querySelector('#fieldset');

    const clone = document.importNode(template.content, true);

    const fieldsetLegend = clone.querySelector("legend");
    fieldsetLegend.textContent = legend;


    const labelsWrap = clone.querySelector('.order-form__labels-wrap');
    for (let x of rest){
        const label = document.createElement('label');
        label.textContent = x;

        const input = document.createElement('input');
        input.type = inputType;
        input.name = inputName;
        input.value = x;

        label.prepend(input);
        labelsWrap.append(label);
    }

    const formProducts = document.querySelector('.order-form__products');
    formProducts.append(clone);
}

createFieldset('Сыр белый', 'radio', 'white-cheese',
    300, 500, 700, 1000, 1500);

createFieldset('Сыр желтый', 'radio', 'yellow-cheese',
    300, 500, 700, 1000, 1500);

createFieldset('Творог', 'radio', 'curd',
    500, 700, 1000, 1500);

createFieldset('Сметана', 'radio', 'sour-cream',
    500, 1000, 1500);

createFieldset('Масло', 'radio', 'butter',
    300, 500, 700, 1000, 1500);

createFieldset('Молоко', 'radio', 'milk',
     1, 2, 3);

createFieldset('Сыворотка', 'radio', 'serum',
    1, 2);

createFieldset('Адрес где можете забрать заказ', 'radio', 'address',
    'Адрес доставки 1', 'Адрес доставки 2');