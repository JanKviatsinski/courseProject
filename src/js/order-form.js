const ORDER_FORM = document.querySelector('#order-form');
const URL_ORDER = "https://course-project-kviatsinski-default-rtdb.firebaseio.com/orders.json"
const MODAL_ORDER_FORM = document.querySelector('.order-form__modal');
const modalOrderFormWrap = MODAL_ORDER_FORM.querySelector('.order-form__wrap-modal');
const PARAGRAPH_MODAL_ORDER = MODAL_ORDER_FORM.querySelector('.order-form__modal-paragraph')
const TABLE_MODAL_ORDER_FORM = document.createElement('table');
ORDER_FORM.addEventListener('submit', async (e) => {
        e.preventDefault();

        const USER_NAME =
            ORDER_FORM.querySelector('.order-form__user-name');
        const USER_NOTE =
            ORDER_FORM.querySelector('textarea');
        const INPUTS = document.getElementsByTagName('input');
        const ORDER = {};

        let productIsSelected = false;

        for (let input of INPUTS) {
            if (input.checked) {
                let legendText = input.closest('fieldset').querySelector('legend').textContent;
                 ORDER[legendText] = input.value;
                productIsSelected = true;
            }
        }

        if (!productIsSelected) {
            MODAL_ORDER_FORM.style.display = 'block';
            PARAGRAPH_MODAL_ORDER.textContent = 'Вы не выбрали ни одного продукта';
            return false;
        }

        let orders;

        try {
            const RESPONSE = await fetch(URL_ORDER);
            orders = await RESPONSE.json();
            const MODIFIED_ORDERS = {};

            for (let orderId in orders) {
                MODIFIED_ORDERS[orders[orderId][USER_NAME.placeholder]] = {...orders[orderId]};
                MODIFIED_ORDERS[orders[orderId][USER_NAME.placeholder]].id = orderId;
            }

            orders = MODIFIED_ORDERS;
        } catch (error) {
            MODAL_ORDER_FORM.style.display = 'block';
            PARAGRAPH_MODAL_ORDER.textContent =
                'Упс, что-то пошло не так. Попробуйте пожалуйста позже.';
            console.log('ОШИБКА', error)
            return new Error(error)
        }

        if (orders[USER_NAME.value]) {
            // tableModalOrderForm.remove();
            MODAL_ORDER_FORM.style.display = 'block';
            PARAGRAPH_MODAL_ORDER.textContent =
                'Заказ с таким именем уже есть. Используйте пожалуста другое имя.';
        } else {
            postOrder(ORDER, URL_ORDER);
        }

        async function postOrder(data, url) {
            ORDER[USER_NAME.placeholder] = USER_NAME.value;
            ORDER[USER_NOTE.placeholder] = USER_NOTE.value;
            try {
                await fetch(
                    url, {
                        method: 'Post',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify(data),
                    });
                MODAL_ORDER_FORM.style.display = 'flex';
                PARAGRAPH_MODAL_ORDER.textContent = 'Отлично! Заказ принят.';
                createDataTable(MODAL_ORDER_FORM, data, TABLE_MODAL_ORDER_FORM);
            } catch (error) {
                MODAL_ORDER_FORM.style.display = 'block';
                PARAGRAPH_MODAL_ORDER.textContent =
                    'Упс, что-то пошло не так. Попробуйте пожалуйста позже.';
                console.log('ОШИБКА', error)
            }
        }
    }
)

function delet() {
    fetch(URL_ORDER, {method: 'DELETE',})
}
// delet ()
document.body.addEventListener('click', (event) =>{
    const CLICK_OBJ = event.target;

    if (MODAL_ORDER_FORM.compareDocumentPosition(CLICK_OBJ) === 2){
        MODAL_ORDER_FORM.style.display = 'none';
        TABLE_MODAL_ORDER_FORM.remove();
    }



    // if(clickObj !== btnGreetingOwner)
    // greetingOwner.hidden = !greetingOwner.hidden;
    // (!greetingOwner.hidden) ?
    //     btnGreetingOwner.style.animationName = 'none' :
    //     btnGreetingOwner.style.animationName = 'button-animation';
})

function createDataTable(location, data, form) {
    form.innerHTML = '';

    for (let listPosition in data) {
        const TABLE_ROW = form.insertRow();
        const POINT = TABLE_ROW.insertCell();
        const VALUE = TABLE_ROW.insertCell();
        POINT.textContent = listPosition;
        VALUE.textContent = data[listPosition];
    }

    location.append(form);

    // const tablePreviousSibling = table.previousElementSibling;
    // tablePreviousSibling.style.marginBottom = 1 + 'rem';
}

