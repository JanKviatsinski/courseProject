'use strict'
const greetingOwner = document.body.querySelector('.greeting-owner-wrap');
// greetingOwner.hidden = true;

const parentGreetingOwner = greetingOwner.parentNode;
const metricParentGreetingOwner = parentGreetingOwner.getBoundingClientRect();

greetingOwner.style.width = metricParentGreetingOwner.width + 'px';
greetingOwner.style.left = metricParentGreetingOwner.left + 'px';

const btnGreetingOwner = document.body.querySelector('.main-header__btn-greeting-owner');
btnGreetingOwner.addEventListener('click', () =>{
     greetingOwner.hidden = !greetingOwner.hidden;
      (!greetingOwner.hidden) ?
          btnGreetingOwner.style.animationName = 'none' :
          btnGreetingOwner.style.animationName = 'button-animation';
});












