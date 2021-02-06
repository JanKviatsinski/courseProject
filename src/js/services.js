export const URL_ORDER_GET = 'https://course-project-kviatsinski-default-rtdb.firebaseio.com/orders.json';
const URL_ORDER_POST = 'https://course-project-kviatsinski-default-rtdb.firebaseio.com/orders.json';

export async function saveOrder(data) {
    // try {
    return await fetch(URL_ORDER_POST, {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data),
    });

    //     showModal('Отлично! Заказ принят.');
    //
    //     PARAGRAPH_MODAL_ORDER.style.marginBottom = '1em';
    //
    //     createDataTable({
    //         location: MODAL_ORDER_FORM,
    //         data: data,
    //         table: TABLE_MODAL_ORDER_FORM,
    //     });
    // } catch (error) {
    //     showModal('Упс, что-то пошло не так.')
    //     console.log('ОШИБКА', error);
    // }
}

export async function getAllOrders (){
    // try {
    return await fetch(URL_ORDER_GET);
    // } catch (error){
    //     showModal('Упс, что-то пошло не так.')
    //     console.log('ОШИБКА', error);
    //     return false;
    // }
}


function delet() {
    fetch(URL_ORDER_GET, {method: 'DELETE',})
}

// delet ();