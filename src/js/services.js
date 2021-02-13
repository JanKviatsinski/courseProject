const URL_ORDER_GET = 'https://course-project-kviatsinski-default-rtdb.firebaseio.com/orders.json';
const URL_ORDER_POST = 'https://course-project-kviatsinski-default-rtdb.firebaseio.com/orders.json';

export function saveOrder(data) {
    return fetch(URL_ORDER_POST, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data),
    });
}

export function getAllOrders() {
    return fetch(URL_ORDER_GET, {
        method: 'GET',
    });
}


function fetchDeleteOrders() {
    fetch(URL_ORDER_GET, {method: 'DELETE',})
}

// fetchDeleteOrders ();