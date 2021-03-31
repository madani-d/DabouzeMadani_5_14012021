let confirmationElt = document.getElementById("confirmationContainer");
if (localStorage.getItem("orderId")) {
    confirmationElt.innerHTML = `
        <h2>Votre Commande est bien validé</h2>
        <h3>Identifiant de commande : ${localStorage.getItem("orderId")}</h3>`;
} else {
    document.getElementById("validationH1").textContent = ":("
    confirmationElt.innerHTML = "<h2>Vous n'avez rien commandé</h2>"
}
