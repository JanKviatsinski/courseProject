export function completeFormFromStorage(form) {
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
            textarea.value = localStorage[textarea.name];
        }
    }
}