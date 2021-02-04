import {ORDER, ORDER_FORM} from "./order-form.js";
ORDER_FORM.addEventListener('change', (evt) => {
    evt.preventDefault();
    // console.log(ORDER)
    const CLICK_OBJ = evt.target;
    ORDER[CLICK_OBJ.name] = CLICK_OBJ.value;

    if (CLICK_OBJ.type === 'radio'){

    }

})
