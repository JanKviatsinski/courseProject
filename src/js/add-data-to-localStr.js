export function addDataToLocalStr(key, value){
    localStorage.setItem(key, value);
    console.log(localStorage);
}