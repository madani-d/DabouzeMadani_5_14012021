window.addEventListener('storage', () =>{
    
})


if (document.getElementById("teddiesContainer") !== null) {
    let teddiesContainer = document.getElementById("teddiesContainer");

fetch("http://localhost:3000/api/teddies")
    .then(res => res.json())
    .then(data => {
        console.log(data);

        for (let i = 0; i < data.length; i++) {
            var prix = data[i].price / 100;
            teddiesContainer.innerHTML += `
            <div class="col-12 col-lg-5 m-4">
                <div class="card shadow-lg border-purple ">
                    <img src="${data[i].imageUrl}" alt="peluche ${data[i].name}" class="card-img-top coverIndex">
                    <div class="card-body  bg-pink">
                        <h2 class="card-title h5">${data[i].name}</h2>
                        <p class="card-text fw-bold">${prix} €</p>
                        <a href="html/peluche.html?id=${data[i]._id}" class="btn btn-primary bg-purple p-2 ">Voir le produit</a>
                    </div>
                </div>
            </div>`

        }
    });
}

if (document.getElementById("produitContainer") !== null) {
    let params = new URLSearchParams(window.location.search);
    let articleId = params.get("id");
    let h1Elt = document.getElementById("h1-teddie");
    let produitContainer = document.getElementById("produitContainer");

    fetch(`http://localhost:3000/api/teddies/${articleId}`)
        .then(res => res.json())
        .then(data => {
            let price = data.price / 100;
            h1Elt.textContent = data.name;
            produitContainer.innerHTML = `
            <div class="card mb-4 border-purple">
                <div class="row">
                    <div class="col-md-6 px-0">
                        <img src="${data.imageUrl}" alt="photo de l'ourson ${data.name}" class="coverProduit">
                    </div>
                    <div class="col-md-6 bg-pink">
                        <div class="card-body">
                            <h2 class="card-title">${data.name}</h2>
                            <p class="card-text">${data.description}</p>
                            <p class="card-text">${price} €</p>
                            <select class="form-select" aria-label="Default select example" id="selectColor">
                                <option selected>Couleur</option>
                            </select>
                            <button type="button" class="btn btn-primary bg-purple p-2 mt-5">Ajouter au panier</button>
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
            console.log(data);
        })

    
}
