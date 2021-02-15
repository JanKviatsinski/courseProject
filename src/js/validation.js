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
    return Boolean(name !== undefined && name.trim());
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
    return Boolean(password.length >= 6)
}

export function emailValidation (email) {
    const regExp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return (email !== undefined && regExp.test(email.trim()));
}



