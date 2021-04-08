export const greeting = document.querySelector('.main-header__greeting-wrap');
const btnGreeting = document.querySelector('.main-header__btn--greeting');
const btnGreetingCloseTop = greeting.querySelector('.greeting__top-btn--close');
const btnGreetingCloseBottom = greeting.querySelector('.greeting__bottom-btn--close');
greeting.style.display = 'none';

btnGreeting.addEventListener('click', () => {
    greeting.style.display = 'block';
    btnGreeting.style.animationName =
        (greeting.style.display === 'block') ? 'none' : 'button-animation';
});

document.addEventListener('click', (evt) => {
    const clickObj = evt.target;

    if (clickObj !== btnGreeting ||
        clickObj === btnGreetingCloseBottom ||
        clickObj === btnGreetingCloseTop) {
        greeting.style.display = 'none';
        btnGreeting.style.animationName =
            (greeting.style.display === 'block') ? 'none' : 'button-animation';
    }
})











