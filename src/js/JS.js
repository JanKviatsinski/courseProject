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


