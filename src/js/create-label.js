export function createLabel({value, type, name, attribute}) {
    const label = document.createElement('label');
    label.textContent = value;

    const input = document.createElement('input');
    input.type = type;
    input.name = name;
    input.value = value;
    input.setAttribute('data-category', attribute);

    label.prepend(input);

    return label;
}