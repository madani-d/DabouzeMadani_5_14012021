import {
    fillBasket,
    apiUrl
} from "./utils.js";


fillBasket();

if (document.getElementById("teddiesContainer") !== null) {
    let teddiesContainer = document.getElementById("teddiesContainer");

    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            console.log(data);

            for (let i = 0; i < data.length; i++) {
                var prix = data[i].price / 100;
                teddiesContainer.innerHTML += `
            <div class="col-12 col-lg-5 m-4">
                <div class="card shadow-lg border-dark">
                    <img src="${data[i].imageUrl}" alt="peluche ${data[i].name}" class="card-img-top coverIndex">
                    <div class="card-body  bg-pink">
                        <h2 class="card-title h5">${data[i].name}</h2>
                        <p class="card-text fw-bold">${prix} €</p>
                        <a href="html/peluche.html?id=${data[i]._id}" class="btn btn-primary btn-purple p-2">Voir le produit</a>
                    </div>
                </div>
            </div>`

            }
        });
}