
const greetingOwner = document.body.querySelector('.main-header__greeting-wrap');
greetingOwner.hidden = true;

const btnGreetingOwner = document.body.querySelector('.main-header__btn--greeting');
btnGreetingOwner.addEventListener('click', () =>{
     greetingOwner.hidden = !greetingOwner.hidden;
    btnGreetingOwner.style.animationName = !greetingOwner.hidden ? 'none' : 'button-animation';
});












