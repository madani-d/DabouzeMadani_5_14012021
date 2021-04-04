import {
    fillBasket,
    regexId,
    apiUrl,
    emptyStorage,
    checkStorage
} from "./utils.js";


fillBasket();

if (document.getElementById("basketContainer") !== null) {
    let basketContainerElt = document.getElementById("basketContainer");
    let basketEmptyElt = document.getElementById("basketEmpty");
    let basketListElt = document.getElementById("basketList");




    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            let basketListElt = document.getElementById("basketList");
            let fillBasketPage = function () {
                let totalPrice = 0;
                if (localStorage.length > 0) {// hidding basketEmpty if product in localstorage
                    basketEmptyElt.classList.add("visually-hidden");
                    basketContainerElt.classList.remove("visually-hidden");
                }
                if (localStorage.length < 1 || checkStorage(localStorage) === 0) {// disabled hidding basketEmpty no product in localstorage
                    basketEmptyElt.classList.remove("visually-hidden");
                    basketContainerElt.classList.add("visually-hidden");
                }
                for (let i = 0; i < localStorage.length; i++) {// loop for each product in localstorage
                    let productId = localStorage.key(i);
                    let productQuantity = localStorage.getItem(productId);

                    for (let j = 0; j < data.length; j++) {// loop for each product in api
                        if (productId === data[j]._id) {// if localstorage id equal api id 
                            var prix = productQuantity * data[j].price / 100;
                            let basketLineElt = document.createElement("tr");
                            basketLineElt.innerHTML = `
                                <th scope="col">${data[j].name}</th>
                                <td>${data[j].price / 100} €</td>
                                <td>${productQuantity}</td>
                                <td>${prix} €</td>
                                <td><i class="fas fa-trash-alt btn btn-danger py-1 px-2 m-auto" id="${data[j]._id}"></i></td>`;
                            totalPrice += prix;
                            basketListElt.appendChild(basketLineElt);
                            let deleteElt = data[j]._id;
                            document.getElementById(deleteElt).addEventListener('click', function () {// add button to delete the product and reset basket and basket page
                                localStorage.removeItem(`${data[j]._id}`);
                                fillBasket();
                                basketListElt.innerHTML = "";
                                fillBasketPage();
                                totalPrice -= prix;
                            })
                        }
                    }
                }
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
            fillBasketPage();
        })
}

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

    fetch(apiUrl + "/order", {// post the request to api
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
            localStorage.setItem("orderId", `${data.orderId}`);// recover order id
            window.location.assign("./confirmation.html");
        })
});