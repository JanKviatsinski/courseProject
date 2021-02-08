export const URL_ORDER_GET = 'https://course-project-kviatsinski-default-rtdb.firebaseio.com/orders.json';
const URL_ORDER_POST = 'https://course-project-kviatsinski-default-rtdb.firebaseio.com/orders.json';

export async function saveOrder(data) {
    return await fetch(URL_ORDER_POST, {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data),
    });
}

export async function getAllOrders() {
    return await fetch(URL_ORDER_GET);
}


function delet() {
    fetch(URL_ORDER_GET, {method: 'DELETE',})
}

// delet ();