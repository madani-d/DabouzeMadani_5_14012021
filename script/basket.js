import {
    fillBasket,
    regexId,
    apiUrl,
    emptyStorage
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
                if (localStorage.length > 0) {
                    basketEmptyElt.classList.add("visually-hidden");
                    basketContainerElt.classList.remove("visually-hidden");
                }
                if (localStorage.length < 1 || !regexId.test(localStorage.key(0))) {
                    console.log("alors ????");
                    basketEmptyElt.classList.remove("visually-hidden");
                    basketContainerElt.classList.add("visually-hidden");
                }
                for (let i = 0; i < localStorage.length; i++) {
                    let productId = localStorage.key(i);
                    let productQuantity = localStorage.getItem(productId);
                    console.log(productId);
                    console.log(productQuantity);

                    for (let j = 0; j < data.length; j++) {
                        if (productId === data[j]._id) {
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
                            console.log(data[j].name);
                            let deleteElt = data[j]._id;
                            document.getElementById(deleteElt).addEventListener('click', function () {
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

    console.log(contact);

    let products = []
    for (let i = 0; i < localStorage.length; i++) {
        if (regexId.test(localStorage.key(i))) {
            products.push(localStorage.key(i));
            console.log("regex localstorage ok!!");
        }
    }
    console.log(products);

    fetch(apiUrl + "/order", {
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
            localStorage.setItem("orderId", `${data.orderId}`);
            window.location.assign("./confirmation.html");
        })
});