export function getFromStorage(key) {
    return (localStorage.getItem(key)) ? JSON.parse(localStorage.getItem(key)) : {};
}

export function addDataToStorage(key, value) {
    localStorage.setItem(key, value);
}

export function completeForm(form, key) {
    if (!localStorage.getItem(key)) {
        return;
    }

    const dataFromStorage = JSON.parse(localStorage.getItem(key));
    const inputs = form.querySelectorAll('input');
    const allTextarea = form.querySelectorAll('textarea')

    for (let input of inputs) {
        if (input.value === dataFromStorage[input.name]) {
            input.checked = 'checked';
        }

        if (dataFromStorage[input.name]) {
            input.value = dataFromStorage[input.name];
        }
    }

    for (let textarea of allTextarea) {
        if (dataFromStorage[textarea.name]) {
            textarea.value = dataFromStorage[textarea.name];
        }
    }
}

// localStorage.clear();