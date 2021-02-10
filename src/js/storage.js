export function getFromStorage() {
    if (localStorage.order){
        return JSON.parse(localStorage.order);
    }else {
        return {};
    }
    // const order = ;
    // const keys = Object.keys(localStorage);
    // for (let key of keys) {
    //     order[key] = localStorage.getItem(key);
    // }
    // console.log(order);
    // return order;
}

export function addDataToStorage(key, value) {
    // localStorage.clear();
    localStorage.setItem(key, value);
}

// localStorage.clear();


