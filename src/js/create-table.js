export function createDataTable({location, data, table}) {
    table.innerHTML = '';

    for (let listPosition in data) {
        const TABLE_ROW = table.insertRow();
        const POINT = TABLE_ROW.insertCell();
        const VALUE = TABLE_ROW.insertCell();
        POINT.textContent = listPosition;
        VALUE.textContent = data[listPosition];
    }

    location.append(table);
}