'use strict'
const headerInformationOwner = document.body.querySelector('.header__information-owner');
headerInformationOwner.hidden = true;

const btnInformationOwner = document.body.querySelector('.header__btn-information-owner');
btnInformationOwner.addEventListener('click', () =>{
     headerInformationOwner.hidden = !headerInformationOwner.hidden;
      (!headerInformationOwner.hidden) ?
          btnInformationOwner.style.animationName = 'none' :
          btnInformationOwner.style.animationName = 'button-animation';
});

// function debounce(cb, ms) {
//     let timeoutID = null;
//
//     return value => {
//         if (timeoutID) {
//             return;
//         }
//
//         timeoutID = setTimeout(() => {
//             cb(value);
//             timeoutID = null;
//         }, ms);
//     };
// }
//
// const f = debounce(value => console.log(`Hey! ${value}`), 1000);
//
// f(1);
// setTimeout(() => f(2), 500);
// setTimeout(() => f(3), 1500);
// setTimeout(() => f(4), 2000);


