export function categoryValidation(inputs, category) {
    let categoryIsChecked = false;

    inputs.forEach((input) => {
        const inputCategory = input.getAttribute('data-category');

        if (inputCategory === category && input.checked) {
            categoryIsChecked = true;
        }
    })

    return categoryIsChecked;
}

export function isRequired(value) {
    return Boolean(value);
}

export function duplicateValidation(name, orders) {
    let nameIsOnOrders = false;

    for (let order in orders) {
        if (orders[order].name === name) {
            nameIsOnOrders = true;
        }
    }

    return nameIsOnOrders;
}
