export function createLabel ({value, type, name}) {
    const label = document.createElement('label');
    label.textContent = value;

    const input = document.createElement('input');
    input.type = type;
    input.name = name;
    input.value = value;

    label.prepend(input);

    return label;
}