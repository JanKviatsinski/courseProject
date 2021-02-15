const modal = document.querySelector('.modal');
const modalParagraph = modal.querySelector('.modal__paragraph');

export function showModal(message) {
    modal.style.display = 'flex';
    modalParagraph.textContent = message;
}

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

export function createDialogueButtons (btnOK, btnCancel) {
    const wrapButtons = document.createElement('div');
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
}