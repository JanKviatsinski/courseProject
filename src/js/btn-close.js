import {GREETING, BTN_GREETING} from "./btn-greeting.js";
// import {PARAGRAPH_MODAL_ORDER} from "./order-submit.js";

const BUTTONS_CLOSE = document.querySelectorAll('.btn--close');
for (let btn of BUTTONS_CLOSE){
    btn.addEventListener('click', (evt) =>{
        const CLICK_OBJ = evt.target;
        const PARENT = CLICK_OBJ.parentNode;
        PARENT.style.display = 'none';

        BTN_GREETING.style.animationName =
            (GREETING.style.display === 'block') ? 'none' : 'button-animation';

    // PARAGRAPH_MODAL_ORDER.style.marginBottom = '0';
    })
}
