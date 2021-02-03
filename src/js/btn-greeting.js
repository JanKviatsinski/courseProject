const GREETING = document.body.querySelector('.main-header__greeting-wrap');
GREETING.hidden = true;

const BTN_GREETING = document.body.querySelector('.main-header__btn--greeting');

BTN_GREETING.addEventListener('click', () =>{
     GREETING.style.display = 'block';
    BTN_GREETING.style.animationName =
        (GREETING.style.display === 'block') ? 'none' : 'button-animation';
});

export {GREETING, BTN_GREETING};










