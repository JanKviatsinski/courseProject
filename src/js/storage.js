export function getFromStorage() {
    const order = {};
    const keys = Object.keys(localStorage);
    for (let key of keys) {
        order[key] = localStorage.getItem(key);
    }
    return order;
}

export function addDataToStorage(key, value) {
    localStorage.setItem(key, value);
}

// localStorage.clear();


