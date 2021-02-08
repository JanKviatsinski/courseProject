export const orderForm = document.querySelector('#order-form');

console.log(localStorage);
completeFormFromStorage(orderForm)
function completeFormFromStorage(form) {
    const inputs = form.querySelectorAll('input');

    for (let input of inputs) {
        if (input.value === localStorage[input.name]) {
            input.checked = "checked";
        }

        if (localStorage[input.name]) {
            input.value = localStorage[input.name];
        }
    }

    const allTextarea = form.querySelectorAll('textarea')

    for (let textarea of allTextarea) {

        if (localStorage[textarea.name]) {
            textarea.placeholder = localStorage[textarea.name];
        }
    }
}

export function getFromStorage () {

    const order = {};

    const keys = Object.keys(localStorage);
    for(let key of keys) {
        order[key] = localStorage.getItem(key);
    }
    // console.log(order)
    return order;
}

export function addDataToStorage(key, value){
    localStorage.setItem(key, value);
    // console.log(localStorage);
}

// localStorage.clear();


