'use strict'
const greetingOwner = document.body.querySelector('.greeting-owner-wrap');
greetingOwner.hidden = true;

const btnGreetingOwner = document.body.querySelector('.main-header__btn-greeting-owner');
btnGreetingOwner.addEventListener('click', () =>{
     greetingOwner.hidden = !greetingOwner.hidden;
    btnGreetingOwner.style.animationName = !greetingOwner.hidden ? 'none' : 'button-animation';
});












