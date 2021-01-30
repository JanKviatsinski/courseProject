const orderForm = document.querySelector('#order-form');
const url = "https://course-project-kviatsinski-default-rtdb.firebaseio.com/orders.json"
const modalOrderForm = document.querySelector('.order-form__modal');
const modalOrderFormWrap = modalOrderForm.querySelector('.order-form__wrap-modal');
const paragraphModalOrder = modalOrderFormWrap.querySelector('.order-form__modal-paragraph')
const table = document.createElement('table');
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
            paragraphModalOrder.textContent = 'Вы не выбрали ни одного продукта';
            return false;
        }

        let orders;

        try {
            const response = await fetch(url);
            orders = await response.json();
            let modifiedObjOrders = {};

            for (let orderId in orders) {
                modifiedObjOrders[orders[orderId][userName.placeholder]] = {...orders[orderId]};
                modifiedObjOrders[orders[orderId][userName.placeholder]].id = orderId;
            }

            orders = modifiedObjOrders;
        } catch (error) {
            modalOrderForm.style.display = 'block';
            paragraphModalOrder.textContent =
                'Упс, что-то пошло не так. Попробуйте пожалуйста позже.';
            console.log('ОШИБКА', error)
            return new Error(error)
        }

        let nameInDatabase = false;

        if (Object.keys(orders).length === 0) {
            postOrder(order, url)
        } else if (orders[userName.value]) {
            modalOrderForm.style.display = 'block';
            paragraphModalOrder.textContent =
                'Заказ с таким именем уже есть. Используйте пожалуста другое имя.';
            nameInDatabase = true;
        }

        if (!nameInDatabase) {
            postOrder(order, url);
        }

        async function postOrder(data, url) {
            order[userName.placeholder] = userName.value;
            order[userNote.placeholder] = userNote.value;
            try {
                /*const response = await*/ fetch(
                    url, {
                        method: 'Post',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify(data),
                    });
                // const result = await response.json();
                modalOrderForm.style.display = 'block';
                paragraphModalOrder.textContent = 'Отлично! Заказ принят.';

                createTableOrder(modalOrderFormWrap, data);
            } catch (error) {
                modalOrderForm.style.display = 'block';
                paragraphModalOrder.textContent =
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

function createTableOrder(location, data){
    for (let listPosition in data) {
            const tableRow = table.insertRow();
            const point = tableRow.insertCell();
            const value = tableRow.insertCell();
        point.textContent = listPosition;
        value.textContent = data[listPosition];
    }

    location.append(table);

    const tablePreviousSibling = table.previousElementSibling;
    tablePreviousSibling.style.marginBottom = 1 + 'rem';
}

