import {collectUserData} from './identification.js';
const URL_ORDER_GET = 'https://course-project-kviatsinski-default-rtdb.firebaseio.com/orders.json';
const URL_ORDER_POST = 'https://course-project-kviatsinski-default-rtdb.firebaseio.com/orders.json';
const apiKey = 'AIzaSyD_MiDZhDFSmUZgvSUqSffavdsjWxwixbo';

export function saveOrder(data) {
    let {localId} = collectUserData();

    return fetch(`https://course-project-kviatsinski-default-rtdb.firebaseio.com/orders/${localId}.json`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data),
    });
}

export function getUserOrders() {
    let {localId, idToken} = collectUserData();

    return fetch(`https://course-project-kviatsinski-default-rtdb.firebaseio.com/orders/${localId}.json?auth=${idToken}`, {
        method: 'GET',
    });
}

export function authentication (email, password){
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            password: password,
            email: email,
            returnSecureToken: true,
        }),
    })
}

export function registration (email, password, name){
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            password: password,
            email: email,
            displayName: name,
            returnSecureToken: true,
        }),
    })
}

export function getUserData(token) {
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({idToken:  token})
    });
}

function fetchDeleteOrders() {
    fetch(URL_ORDER_GET, {method: 'DELETE',})
}

// fetchDeleteOrders ();