const modal = document.querySelector('.modal');
const modalParagraph = modal.querySelector('.modal__paragraph');
const btnCloseModal = document.querySelector('.modal__btn--close-modal');
const wrapButtons = document.createElement('div');
const tableModal = document.createElement('table');
export function showModal(message) {
    modal.style.display = 'flex';
    modalParagraph.textContent = message;
}

export function createTableInModal(data) {
    tableModal.innerHTML = '';

    for (let listPosition in data) {
        const tableRow = tableModal.insertRow();
        const key = tableRow.insertCell();
        const value = tableRow.insertCell();
        key.textContent = listPosition;
        value.textContent = data[listPosition];
    }

    modal.append(tableModal);
}

export function createDialogueButtons (btnOK, btnCancel) {
    wrapButtons.className = 'modal__dialogue-buttons';
    btnOK.className = 'modal__dialogue-btn--ok';
    btnOK.textContent = 'ok';
    btnCancel.className = 'modal__dialogue-btn--cancel';
    btnCancel.textContent = 'отмена';
    wrapButtons.append(btnOK);
    wrapButtons.append(btnCancel);
    modal.append(wrapButtons);
}

export function hideModal () {
    modal.style.display = 'none';
    wrapButtons.remove();
}

btnCloseModal.addEventListener('click', () => {
    modal.style.display = 'none';
})

document.addEventListener('click', (evt) => {
    const clickObj = evt.target;

    if (modal.compareDocumentPosition(clickObj) === 2) {
        modal.style.display = 'none';
        // tableModalOrder.remove();
        wrapButtons.remove();
    }
})