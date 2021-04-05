import {
    fillBasket,
    apiUrl,
    searchProductStorage
} from "./utils.js";


fillBasket();

let teddiesContainer = document.getElementById("teddiesContainer");

fetch(apiUrl)
    .then(res => res.json())
    .then(data => {

        for (let i = 0; i < data.length; i++) {
            var prix = data[i].price / 100;

            let cardTeddies = document.createElement("div");
            cardTeddies.classList.add("col-12", "col-lg-5", "my-4", "m-lg-4");
            cardTeddies.innerHTML += `
                    <div class="card shadow-lg border-dark">
                        <img src="${data[i].imageUrl}" alt="peluche ${data[i].name}" class="card-img-top coverIndex">
                        <div class="card-body  bg-pink">
                            <h2 class="card-title h5">${data[i].name}</h2>
                            <p class="card-text fw-bold">${prix} €</p>
                            <div class="d-flex justify-content-between" id="test">
                                <a href="html/peluche.html?id=${data[i]._id}" class="btn btn-primary btn-purple p-2">Voir le produit</a>
                                <button class="btn btn-primary btn-purple p-2" id="${data[i]._id}">Achat rapide</button>
                            </div>
                        </div>
                    </div>`; // create card for each products with name, price, picture and link to page product and id for parameter

            teddiesContainer.appendChild(cardTeddies);

            document.getElementById(data[i]._id).addEventListener('click', function () {
                let nbProduit = searchProductStorage(data[i]._id);
                nbProduit++;
                localStorage.setItem(data[i]._id, nbProduit);
                fillBasket();
            });
        }
    });