var regexId = /5be.+440000.+/;
var chooseApiUrl = function () {
    if (location.hostname === "127.0.0.1") {
        return "http://localhost:3000/api/teddies";
    } else {
        return "https://powerful-inlet-34349.herokuapp.com/api/teddies";
    }
}

var apiUrl = chooseApiUrl();

var fillBasket = function () { // function for fill basket icon
    let basketElt = document.getElementById("basket");
    let basketEmptyElt = document.getElementById("basketEmpty");

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

let checkStorage = function (storage) { // function control if products in localstorage
    let count = 0;
    for (let i = 0; i < storage.length; i++) {
        if (regexId.test(storage.key(i))) {
            count++;
        }
    }
    return count; // return 0 if no products in localstorage
}


export {
    fillBasket,
    regexId,
    apiUrl,
    emptyStorage,
    checkStorage
};