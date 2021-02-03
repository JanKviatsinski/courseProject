import {showModal} from "./show-modal.js";
import {addProductsToOrder} from "./add-products-to-order.js";
import {productsValidation} from "./products-validation.js";
import {readingAllOrders} from "./reading-all-orders.js";
export const URL_ORDER = "https://course-project-kviatsinski-default-rtdb.firebaseio.com/orders.json"

const ORDER_FORM = document.querySelector('#order-form');
export const MODAL_ORDER_FORM = document.querySelector('.order-form__modal');
export const PARAGRAPH_MODAL_ORDER = MODAL_ORDER_FORM.querySelector('.order-form__modal-paragraph')
const TABLE_MODAL_ORDER_FORM = document.createElement('table');
export const ORDER ={};
export const USER_NAME = ORDER_FORM.querySelector('.order-form__user-name');
export const USER_NOTE = ORDER_FORM.querySelector('textarea');

ORDER_FORM.addEventListener('submit', async (e) => {
        e.preventDefault();

    await addProductsToOrder();

    let productIsChecked = productsValidation();

    if(!productIsChecked){
        showModal('Вы не выбрали ни одного продукта');
        return false;
    }

        let orders = await readingAllOrders();

if(orders === null){
    postOrder(ORDER, URL_ORDER);
}

        orders[USER_NAME.value] ? showModal(
            'Заказ с таким именем уже есть. Используйте пожалуйста другое имя.') :
            postOrder(ORDER, URL_ORDER);


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
                PARAGRAPH_MODAL_ORDER.style.marginBottom =  1 + 'em';
                createDataTable(MODAL_ORDER_FORM, data, TABLE_MODAL_ORDER_FORM);
            } catch (error) {
                MODAL_ORDER_FORM.style.display = 'block';
                PARAGRAPH_MODAL_ORDER.textContent =
                    'Упс, что-то пошло не так. Попробуйте пожалуйста позже.';
                PARAGRAPH_MODAL_ORDER.style.marginBottom = '0';
                console.log('ОШИБКА', error);
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

function createDataTable(location, data, table) {
    table.innerHTML = '';

    for (let listPosition in data) {
        const TABLE_ROW = table.insertRow();
        const POINT = TABLE_ROW.insertCell();
        const VALUE = TABLE_ROW.insertCell();
        POINT.textContent = listPosition;
        VALUE.textContent = data[listPosition];
    }

    location.append(table);
}

// export {PARAGRAPH_MODAL_ORDER};

