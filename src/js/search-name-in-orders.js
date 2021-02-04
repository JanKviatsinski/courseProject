export function searchNameInOrders(name, orders){
    let nameIsOnOrders = false;

    for (let order in orders){
        if (orders[order].name === name.value){
            nameIsOnOrders = true;
        }
    }
    return nameIsOnOrders;
}