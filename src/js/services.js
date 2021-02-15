import {collectUserData} from './identification.js';
const URL_ORDER_GET = 'https://course-project-kviatsinski-default-rtdb.firebaseio.com/orders.json';
const URL_ORDER_POST = 'https://course-project-kviatsinski-default-rtdb.firebaseio.com/orders.json';
const apiKey = 'AIzaSyD_MiDZhDFSmUZgvSUqSffavdsjWxwixbo';

export async function saveOrder(data) {
    let [, , localId] = collectUserData();

    return await fetch(`https://course-project-kviatsinski-default-rtdb.firebaseio.com/orders/${localId}.json`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data),
    });
}

export async function getUserOrders() {
    let [, , localId, idToken] = collectUserData();

    return await fetch(`https://course-project-kviatsinski-default-rtdb.firebaseio.com/orders/${localId}.json?auth=${idToken}`, {
        method: 'GET',
    });
}

export async function authentication (email, password){
    return await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
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

export async function registration (email, password, name){
    return await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
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