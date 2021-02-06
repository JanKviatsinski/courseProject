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