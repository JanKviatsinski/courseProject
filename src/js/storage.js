export function getFromStorage() {
    return (localStorage.order) ? JSON.parse(localStorage.order) : {};
}

export function addDataToStorage(key, value) {
    localStorage.setItem(key, value);
}

// localStorage.clear();


