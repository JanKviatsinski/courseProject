export function productsValidation(form){
    const inputs = form.querySelectorAll('input');
    let productsIsChecked = false;

    for (let input of inputs){
        const inputCategory = input.getAttribute('data-category');

        if (inputCategory === 'product' && input.checked){
           productsIsChecked = true;
       }
    }

    return productsIsChecked;
}

export function nameValidation(order){
    return Boolean(order.name);
}

export function duplicateValidation(name, orders){
    //ко мне приходит обьект с сервера. Как сделать чтобы риходил массив я не знаю
    let nameIsOnOrders = false;

    for (let order in orders){
        if (orders[order].name === name){
            nameIsOnOrders = true;
        }
    }

    return nameIsOnOrders;
}
