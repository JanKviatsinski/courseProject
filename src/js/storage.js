export const ORDER_KEY = 'order';
export function getFromStorage() {
    return (localStorage.getItem(ORDER_KEY)) ? JSON.parse(localStorage.getItem(ORDER_KEY)) : {};
}

export function addDataToStorage(key, value) {
    localStorage.setItem(key, value);
}

// localStorage.clear();


