import {showModal} from "./show-modal.js";

export function nameValidation(order){
    let nameIsChecked = false
    order.name ? nameIsChecked = true : showModal('Нужно обязательно ввести имя.');

    return nameIsChecked;
}