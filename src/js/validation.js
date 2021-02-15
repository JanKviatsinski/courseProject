export function productsValidation(form) {
    const inputs = form.querySelectorAll('input');
    let productsIsChecked = false;

    for (let input of inputs) {
        const inputCategory = input.getAttribute('data-category');

        if (inputCategory === 'product' && input.checked) {
            productsIsChecked = true;
        }
    }

    return productsIsChecked;
}

export function nameValidation(name) {
    return Boolean(name.trim());
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

export function passwordValidation (password) {
    return Boolean(password.length > 6)
}


