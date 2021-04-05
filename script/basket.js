import {
    fillBasket,
    regexId,
    apiUrl,
    emptyStorage,
    fillBasketPage
} from "./utils.js";

fillBasket();

fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
        fillBasketPage(data);
    })

let contact = {};

let formElt = document.getElementById("formulaire");
formElt.addEventListener('submit', function (e) {
    e.preventDefault();
    contact = {
        firstName: formElt.elements.firstName.value,
        lastName: formElt.elements.lastName.value,
        address: formElt.elements.address.value,
        city: formElt.elements.city.value,
        email: formElt.elements.email.value,
    };

    let products = []
    for (let i = 0; i < localStorage.length; i++) {
        if (regexId.test(localStorage.key(i))) {
            products.push(localStorage.key(i));
        }
    }

    fetch(apiUrl + "/order", { // post the request to api
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contact,
                products
            })
        })
        .then(res => res.json())
        .then(data => {
            emptyStorage();
            localStorage.setItem("orderId", `${data.orderId}`); // recover order id
            window.location.assign("./confirmation.html");
        })
});