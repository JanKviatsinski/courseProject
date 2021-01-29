const orderForm = document.querySelector('#order-form');
const url = "https://course-project-kviatsinski-default-rtdb.firebaseio.com/orders.json"
const modalOrderForm = document.querySelector('.order-form__modal');
const modalOrderFormWrap = modalOrderForm.querySelector('.order-form__wrap-modal');

orderForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const userName =
            orderForm.querySelector('.order-form__user-name');
        const userNote =
            orderForm.querySelector('textarea');
        const inputs = document.getElementsByTagName('input');
        const order = {};

        let productIsSelected = false;

        for (let input of inputs) {
            if (input.checked) {
                let legendText = input.closest('fieldset').querySelector('legend').textContent;
                 order[legendText] = input.value;
                productIsSelected = true;
            }
        }
        if (!productIsSelected) {
            modalOrderForm.style.display = 'block';
            modalOrderFormWrap.textContent = 'Вы не выбрали ни одного продукта';
            console.log('вы не выбрали ни одного продукта')
            return false;
        }

        let orders;

        try {
            const response = await fetch(url);
            orders = await response.json();
            let modifiedObjOrders = {};
            for (let orderId in orders) {
                modifiedObjOrders [orders[orderId].name] = {...orders[orderId]};
                modifiedObjOrders [orders[orderId].name].id = orderId;
            }
            orders = modifiedObjOrders;
        } catch (error) {
            modalOrderForm.style.display = 'block';
            modalOrderFormWrap.textContent =
                'Упс, что-то пошло не так. Попробуйте пожалуйста позже.';
            console.log('ОШИБКА', error)
            return new Error(error)
        }

        let nameInDatabase = false;

        if (Object.keys(orders).length === 0) {
            console.log('нет базы')
            postOrder(order, url)
        } else if (orders[userName.value]) {
            modalOrderForm.style.display = 'block';
            modalOrderFormWrap.textContent =
                'Заказ с таким именем уже есть. Используйте пожалуста другое имя.';
            console.log('имя есть в базе');
            nameInDatabase = true;
        } else {
            console.log('имя НЕТ в базе')
        }

        if (!nameInDatabase) {
            console.log('сделаем новый')
            postOrder(order, url);
        }

        async function postOrder(data, url) {
            order[userName.placeholder]= userName.value;
            order[userNote.placeholder] = userNote.value;
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
                modalOrderForm.style.display = 'block';
                modalOrderFormWrap.textContent =
                    `Отлично! Заказ принят. Ваш заказ ${result}` ;
                console.log('новый заказ зарегестрирован', data);
            } catch (error) {
                modalOrderForm.style.display = 'block';
                modalOrderFormWrap.textContent =
                    'Упс, что-то пошло не так. Попробуйте пожалуйста позже.';
                console.log('ОШИБКА', error)
            }
        }
    }
)

function delet() {
    fetch(url, {method: 'DELETE',})
}

// delet ()
document.body.addEventListener('click', (event) =>{
    const clickObj = event.target;
    if (clickObj !== modalOrderForm){
        modalOrderForm.style.display = 'none';
    }

    // if(clickObj !== btnGreetingOwner)
    // greetingOwner.hidden = !greetingOwner.hidden;
    // (!greetingOwner.hidden) ?
    //     btnGreetingOwner.style.animationName = 'none' :
    //     btnGreetingOwner.style.animationName = 'button-animation';
})









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
//
//         let productIsSelected = false;
//
//         for (let input of inputs) {
//             if (input.checked) {
//                 order[input.name] = input.value;
//                 productIsSelected = true;
//             }
//         }
//
//         if (!productIsSelected) {
//             console.log('вы не выбрали ни одного продукта')
//             return false;
//         }
//
//         let orders;
//
//         try {
//             const response = await fetch(url);
//             orders = await response.json();
//         } catch (error) {
//             console.log('ОШИБКА', error)
//         }
//
//         let nameInDatabase = false;
//
//         if (orders === null) {
//             console.log('нет базы')
//             postOrder(order, url)
//         } else {
//             for (let order in orders) {
//                 if (orders[order].name === userName) {
//                     console.log('имя есть в базе');
//                     nameInDatabase = true;
//                 } else {
//                     console.log('имя НЕТ в базе')
//                 }
//             }
//         }
//
//         if (!nameInDatabase) {
//             console.log('сделаем новый')
//             postOrder(order, url)
//         }
//
//         async function postOrder(data, url) {
//             order.name = userName;
//             order.note = userNote;
//             try {
//                 const response = await fetch(
//                     url, {
//                         method: 'Post',
//                         headers: {
//                             'Content-Type': 'application/json;charset=utf-8'
//                         },
//                         body: JSON.stringify(data),
//                     });
//                 const result = await response.json();
//                 console.log('новый заказ зарегестрирован', result);
//             } catch (error) {
//                 console.log('ОШИБКА', error)
//             }
//         }
//     }
// )
