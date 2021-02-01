// export {GREETING};

const GREETING = document.body.querySelector('.main-header__greeting-wrap');
GREETING.hidden = true;

const BTN_GREETING = document.body.querySelector('.main-header__btn--greeting');

BTN_GREETING.addEventListener('click', () =>{
     GREETING.hidden = false;
    BTN_GREETING.style.animationName =
        !GREETING.hidden ? 'none' : 'button-animation';
});












