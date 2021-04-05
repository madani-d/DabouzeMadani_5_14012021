import {
    fillBasket,
    apiUrl,
    searchProductStorage
} from "./utils.js";

fillBasket();

let params = new URLSearchParams(window.location.search);
let articleId = params.get("id"); // recover id of the product page
let h1Elt = document.getElementById("h1-teddie");
let produitContainer = document.getElementById("produitContainer");

fetch(apiUrl + `/${articleId}`) // fetch product data with url api + id product
    .then(res => res.json())
    .then(data => {
        let price = data.price / 100;
        h1Elt.textContent = data.name;
        produitContainer.innerHTML = `
            <div class="card mb-4 shadow-lg border-dark">
                <div class="row">
                    <div class="col-0 col-md-6 px-0">
                        <img src="${data.imageUrl}" alt="photo de l'ourson ${data.name}" class="coverProduit">
                    </div>
                    <div class="col-md-6 bg-pink">
                        <div class="card-body">
                            <h2 class="card-title mb-3">${data.name}</h2>
                            <p class="card-text mb-3">${data.description}</p>
                            <p class="card-text mb-3">${price} €</p>
                            <select class="form-select mb-3" aria-label="Default select example" id="selectColor">
                            </select>
                            <form>
                                <label for="quantityProduct">Quantité</label>
                                <div class="input-group mb-3 col-2 d-flex justify-content-between" id="formQuantity">
                                    <button type="submit" class="btn btn-primary btn-purple p-2" id="basketAdd">Ajouter au panier</button>
                                    <div id="plusMoins">
                                        <button class="btn btn-primary btn-purple" type="button" id="moins">-</button>
                                        <input type="text" class="form-control" aria-label="Quantité de produit" value="1"  minlength="1" maxlength="2" id="quantityProduct">
                                        <button class="btn btn-primary btn-purple" type="button" id="plus">+</button>
                                    <div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>` //create product card with all informations, button basketAdd and button plus and moins

        for (let i = 0; i < data.colors.length; i++) { //create element option with colors for value for each colors
            let selectElt = document.getElementById("selectColor");
            let optionElt = document.createElement("option");
            optionElt.setAttribute("value", `${data.colors[i]}`);
            optionElt.textContent = `${data.colors[i]}`;
            selectElt.appendChild(optionElt);
        }

        let quantityProductElt = document.getElementById("quantityProduct");


        let boutonPlusElt = document.getElementById("plus");
        boutonPlusElt.addEventListener('click', function () {
            if (quantityProductElt.value < 99) {
                quantityProductElt.value++;
            }
        });

        let boutonMoinsElt = document.getElementById("moins");
        boutonMoinsElt.addEventListener('click', function () {
            if (quantityProductElt.value > 1) {
                quantityProductElt.value--;
            }
        });

        let basketAddElt = document.getElementById("basketAdd");
        basketAddElt.addEventListener('click', function (e) {
            e.preventDefault();
            let nbProduit = searchProductStorage(articleId);
            nbProduit += parseInt(quantityProductElt.value);
            localStorage.setItem(`${articleId}`, nbProduit);
            quantityProductElt.value = 1;

            fillBasket();
        });
    })