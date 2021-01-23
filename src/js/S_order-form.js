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

        label.prepend(input);
        labelsWrap.append(label);
    }

    const formProducts = document.querySelector('.order-form__products');
    formProducts.append(clone);
}

createFieldset('Сыр белый 8руб/500г', 'radio', 'white-cheese',
    300, 500, 700, 1000, 1500);

createFieldset('Сыр желтый 10руб/500г', 'radio', 'yellow-cheese',
    300, 500, 700, 1000, 1500);

createFieldset('Творог 4руб/500г', 'radio', 'curd',
    500, 700, 1000, 1500);

createFieldset('Сметана 4руб/500г', 'radio', 'sour-cream',
    500, 1000, 1500);

createFieldset('Масло 10руб/500г', 'radio', 'butter',
    300, 500, 700, 1000, 1500);

createFieldset('Молоко 2руб/л', 'radio', 'milk',
     1, 2, 3);

createFieldset('Сыворотка бесплатно л.', 'radio', 'serum',
    1, 2);

createFieldset('Адрес где можете забрать заказ', 'radio', 'address',
    'Адрес доставки 1', 'Адрес доставки 2');