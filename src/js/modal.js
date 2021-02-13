const btnCloseModalOrder = document.querySelector('.order-form__btn--close-modal');

export function showModal({displayableObj, locationMessage, message}) {
    displayableObj.style.display = 'flex';
    locationMessage.textContent = message;
}

btnCloseModalOrder.addEventListener('click', () => {
    modalOrderForm.style.display = 'none';
})

document.addEventListener('click', (evt) => {
    const clickObj = evt.target;

    if (modalOrderForm.compareDocumentPosition(clickObj) === 2) {
        modalOrderForm.style.display = 'none';
        tableModalOrder.remove();
    }
})

export function createDataTable({location, data, table}) {
    table.innerHTML = '';

    for (let listPosition in data) {
        const tableRow = table.insertRow();
        const key = tableRow.insertCell();
        const value = tableRow.insertCell();
        key.textContent = listPosition;
        value.textContent = data[listPosition];
    }

    location.append(table);
}