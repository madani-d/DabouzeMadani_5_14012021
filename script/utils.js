var regexId = /5be.+440000.+/;
var apiUrl = "http://localhost:3000/api/teddies";

var fillBasket = function () {
    let basketElt = document.getElementById("basket");
    let basketEmptyElt = document.getElementById("basketEmpty");

    if (localStorage.length < 1) {
        basketElt.textContent = "";
    } else {
        let basketValue = 0;
        for (let i = 0; i < localStorage.length; i++) {
            if (regexId.test(localStorage.key(i))) {
                basketValue += parseInt(localStorage.getItem(localStorage.key(i)));
            }
        }

        if (basketValue !== 0) {
            basketElt.textContent = basketValue
        }
        console.log(basketValue);
        console.log("hello");
    }
};

let emptyStorage = function () {
    for (let index = 0; index < localStorage.length; index++) {
        if (regexId.test(localStorage.key(index))) {
            localStorage.removeItem(localStorage.key(index));
            emptyStorage();
        }
    }
}


export {
    fillBasket,
    regexId,
    apiUrl,
    emptyStorage
};