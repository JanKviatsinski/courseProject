// import {showModal} from "./show-modal.js";
//
// export function productValidation(order){
//     let productIsChecked = false;
//
//     for (let x in order){
//         if ((x !== 'name' || x === 'note') && (x === 'name' || x !== 'note')){
//             productIsChecked = true
//         }
//     }
//
//     if (!productIsChecked){
//         showModal('Вы не выбрали ни одного продукта');
//     }
//
//     return productIsChecked;
// }