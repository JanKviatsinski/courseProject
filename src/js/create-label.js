export {createLabel};

function createLabel ({value, type, name}) {
    const LABEL = document.createElement('label');
    LABEL.textContent = value;

    const INPUT = document.createElement('input');
    INPUT.type = type;
    INPUT.name = name;
    INPUT.value = value;

    LABEL.prepend(INPUT);

    return LABEL;
}