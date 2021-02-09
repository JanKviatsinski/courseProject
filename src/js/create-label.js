export function createLabel(value, id) {
    const label = document.createElement('label');
    label.textContent = value;
    label.setAttribute('for', id);

    return label;
}