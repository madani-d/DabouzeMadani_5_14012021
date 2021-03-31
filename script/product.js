import { fillBasket , apiUrl } from "./utils.js";

fillBasket();

if (document.getElementById("produitContainer") !== null) {
    let params = new URLSearchParams(window.location.search);
    let articleId = params.get("id");
    let h1Elt = document.getElementById("h1-teddie");
    let produitContainer = document.getElementById("produitContainer");

    fetch(apiUrl + `/${articleId}`)
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
                            <button type="button" class="btn btn-primary btn-purple p-2 mt-5" id="bouton">Ajouter au panier</button>
                        </div>
                    </div>
                </div>
            </div>`

            for (let i = 0; i < data.colors.length; i++) {
                let selectElt = document.getElementById("selectColor");
                let optionElt = document.createElement("option");
                optionElt.setAttribute("value", `${data.colors[i]}`);
                optionElt.textContent = `${data.colors[i]}`;
                selectElt.appendChild(optionElt);
                console.log(data.colors[i]);
            }

            let boutonElt = document.getElementById("bouton");
            boutonElt.addEventListener('click', function() {
                let nbProduit = localStorage.getItem(`${articleId}`);
                nbProduit++;
                localStorage.setItem(`${articleId}`, nbProduit);
                console.log(localStorage);

                fillBasket();
            })
            console.log(data);
        })
}