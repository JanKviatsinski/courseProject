const orderForm = document.querySelector('#order-form');
const url = "https://course-project-kviatsinski-default-rtdb.firebaseio.com/orders.json"

orderForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const userNote =
            orderForm.querySelector('#order-form__textarea').value;
        const userName =
            document.getElementsByName('user-name')[0].value;
        const inputs = document.getElementsByTagName('input');
        const order = {};

        let productIsSelected = false;

        for (let input of inputs) {
            if (input.checked) {
                order[input.name] = input.value;
                productIsSelected = true;
            }
        }

        if (!productIsSelected) {
            console.log('вы не выбрали ни одного продукта')
            return false;
        }

        let orders;

        try {
            const response = await fetch(url);
            orders = await response.json();
        } catch (error) {
            console.log('ОШИБКА', error)
        }

        let nameInDatabase = false;

        if (orders === null) {
            console.log('нет базы')
            postOrder(order, url)
        } else {
            for (let order in orders) {
                if (orders[order].name === userName) {
                    console.log('имя есть в базе');
                    nameInDatabase = true;
                } else {
                    console.log('имя НЕТ в базе')
                }
            }
        }

        if (!nameInDatabase) {
            console.log('сделаем новый')
            postOrder(order, url)
        }

        async function postOrder(data, url) {
            order.name = userName;
            order.note = userNote;
            try {
                const response = await fetch(
                    url, {
                        method: 'Post',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify(data),
                    });
                const result = await response.json();
                console.log(result);
            } catch (error) {
                console.log('ОШИБКА', error)
            }
        }
    }
)

function delet() {
    fetch(url, {method: 'DELETE',})
}

// delet ()








// const orderForm = document.querySelector('#order-form');
// const url = "https://course-project-kviatsinski-default-rtdb.firebaseio.com/orders.json"
//
// orderForm.addEventListener('submit', async (e) => {
//         e.preventDefault();
//
//         const userNote =
//             orderForm.querySelector('#order-form__textarea').value;
//         const userName =
//             document.getElementsByName('user-name')[0].value;
//         const inputs = document.getElementsByTagName('input');
//         const order = {};
//         await lookupName(userName);
//
//         async function lookupName(name) {
//             await fetch(url)
//                 .then(response => response.json())
//                 .then(result => {
//                     if (result === null) {
//                         console.log(result === null)
//                         postOrder(order, url)
//                         return false;
//                     } else {
//                         let d = true;
//                         for (let x in result) {
//                             if (result[x].name === name) {
//                                 console.log('yes');
//                                 d = false;
//                             } else {
//                                 console.log(88)
//                                 // d = true;
//                                 // return true;
//                             }
//                         }
//                         return d;
//                     }
//                 }).then(result => {
//                     if (result) {
//                         console.log(result)
//                         console.log(userName)
//                         postOrder(order, url)
//                     }
//                 }).catch(error => console.log('error', error));
//         }
//
//         function postOrder(data, url) {
//             for (let x of inputs) {
//                 if (x.checked) {
//                     order.name = userName;
//                     order.note = userNote;
//                     order[x.name] = x.value;
//                 }
//             }
//
//             fetch(
//                 url, {
//                     method: 'Post',
//                     headers: {
//                         'Content-Type': 'application/json;charset=utf-8'
//                     },
//                     body: JSON.stringify(data),
//                     // redirect: 'follow'
//                 })
//                 .then(response => response.json())
//                 .then(result => console.log(result))
//                 .catch(error => console.log('error', error));
//         }
//     }
// )
//
// function delet() {
//     fetch(url, {method: 'DELETE',})
// }
