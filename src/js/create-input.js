export function createInput({value, type, name, attribute, id}){
    const input = document.createElement('input');
    input.type = type;
    input.name = name;
    input.value = value;
    input.id = id;
    input.setAttribute('data-category', attribute);

    return input;
}