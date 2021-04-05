const regexId = /5be.+440000.+/;
const chooseApiUrl = function () {
    if (location.hostname === "127.0.0.1") {
        return "http://localhost:3000/api/teddies";
    } else {
        return "https://powerful-inlet-34349.herokuapp.com/api/teddies";
    }
}

const apiUrl = chooseApiUrl();

var fillBasket = function () { // function for fill basket icon
    let basketElt = document.getElementById("basket");

    if (localStorage.length < 1) { // if no product in localestorage basket badge empty 
        basketElt.textContent = "";
    } else {
        let basketValue = 0; // reset value basket badge
        for (let i = 0; i < localStorage.length; i++) {
            if (regexId.test(localStorage.key(i))) { // controle if item in localestorage is valid product
                basketValue += parseInt(localStorage.getItem(localStorage.key(i))); // for each product in localstorage add value (quantity) to basketValue
            }
        }

        if (basketValue !== 0) {
            basketElt.textContent = basketValue
        }
    }
};

let emptyStorage = function () { // function delete all products in localestorage
    for (let index = 0; index < localStorage.length; index++) {
        if (regexId.test(localStorage.key(index))) {
            localStorage.removeItem(localStorage.key(index));
            emptyStorage();
        }
    }
}

let checkStorageEmpty = function (storage) { // function control if products in localstorage
    let count = 0;
    for (let i = 0; i < storage.length; i++) {
        if (regexId.test(storage.key(i))) {
            count++;
        }
    }
    return count; // return 0 if no products in localstorage
}

let searchProductStorage = function (storageProductId) {
    if (localStorage.getItem(storageProductId)) { // initialise nbProduct 
        return parseInt(localStorage.getItem(storageProductId)); // if this product exists in localestorage equal his value
    } else {
        return 0; // or equal 0
    }
}

let hiddingElement = function (storage) {
    let basketContainerElt = document.getElementById("basketContainer");
    let basketEmptyElt = document.getElementById("basketEmpty");
    if (storage.length > 0) { // hidding basketEmpty if product in localstorage
        basketContainerElt.classList.remove("visually-hidden");
        basketEmptyElt.classList.add("visually-hidden");
    }
    if (storage.length < 1 || checkStorageEmpty(storage) === 0) { // disabled hidding basketEmpty no product in localstorage
        basketContainerElt.classList.add("visually-hidden");
        basketEmptyElt.classList.remove("visually-hidden");
    }
}

let basketListElt = document.getElementById("basketList");

let addProductLine = function (storage, data) {
    for (let i = 0; i < storage.length; i++) { // loop for each product in localstorage
        let productId = storage.key(i);
        let productQuantity = storage.getItem(productId);

        for (let j = 0; j < data.length; j++) { // loop for each product in api
            if (productId === data[j]._id) { // if localstorage id equal product api id 
                let prix = productQuantity * data[j].price / 100;
                let basketLineElt = document.createElement("tr");
                basketLineElt.innerHTML = `
                        <th scope="col">${data[j].name}</th>
                        <td>${data[j].price / 100} €</td>
                        <td>${productQuantity}</td>
                        <td>${prix} €</td>
                        <td><i class="fas fa-trash-alt btn btn-danger py-1 px-2 m-auto" id="${data[j]._id}"></i></td>`;
                basketListElt.appendChild(basketLineElt);
                let idproduct = data[j]._id
                addRemoveButton(idproduct, data);
            }
        }
    }
}

let addTotalPrice = function (storage, data) {
    let totalPrice = 0;
    for (let i = 0; i < storage.length; i++) {
        let productId = storage.key(i);
        let productQuantity = storage.getItem(productId);
        for (let j = 0; j < data.length; j++) {
            if (productId === data[j]._id){
                let price = productQuantity * data[j].price / 100;
                totalPrice += price;
            }
        }
    }
    return totalPrice;
}

let addRemoveButton = function (idproduct, data) {
    document.getElementById(idproduct).addEventListener('click', function () { // add button to delete the product and reset basket and basket page
        localStorage.removeItem(idproduct);
        fillBasket();
        basketListElt.innerHTML = "";
        fillBasketPage(data);
    })
}

let addTotalLine = function (totalPrice) {
    let basketTotalElt = document.createElement("tr");
    basketTotalElt.classList.add("bg-pink");
    basketTotalElt.innerHTML = `
            <th scope="col" colspan="1" class="text-end">Total Panier</th>
            <th></th>
            <th></th>
            <th colspan="3" class="text-center">${totalPrice} €</th>
            <th></th>`;
    basketListElt.appendChild(basketTotalElt);
}

let fillBasketPage = function (data) {
    let totalPrice = 0;
    hiddingElement(localStorage);
    addProductLine(localStorage, data);
    totalPrice = addTotalPrice(localStorage, data);
    addTotalLine(totalPrice);
}


export {
    fillBasket,
    regexId,
    apiUrl,
    emptyStorage,
    checkStorageEmpty,
    searchProductStorage,
    fillBasketPage
};