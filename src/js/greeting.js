const greeting = document.querySelector('.main-header__greeting-wrap');
const btnGreeting = document.querySelector('.main-header__btn--greeting');
const btnGreetingCloseTop = greeting.querySelector('.greeting__top-btn--close');
const btnGreetingCloseBottom = greeting.querySelector('.greeting__bottom-btn--close');

document.addEventListener('click', (evt) => {
    const clickObj = evt.target;

    if (clickObj !== btnGreeting ||
        clickObj === btnGreetingCloseBottom ||
        clickObj === btnGreetingCloseTop) {
        greeting.style.display = 'none';
        btnGreeting.style.animationName = 'button-animation';
    } else if (clickObj === btnGreeting){
        greeting.style.display = 'block';
        btnGreeting.style.animationName = 'none';
    }
})











