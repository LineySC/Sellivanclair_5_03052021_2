//Gestion d'affichage des article dans le panier

//Récupération des données du Local Storage
const arrayLocalStorage = localStorage.getItem('products');
const getDataArray = JSON.parse(arrayLocalStorage);

//Condition d'affichage si le localStorage est vide ou non
if(arrayLocalStorage === null) {
    document.getElementById('cartStorageNb').innerHTML = `Panier (0)`;
}
else{
    let cartStorageNb = getDataArray.length;
   
   if(cartStorageNb >= 1){ // Vérification supplémentaire du panier 
       document.getElementById('cartStorageNb').innerHTML = `Panier (${+ cartStorageNb})`;
   }
   else{
       document.getElementById('cartStorageNb').innerHTML = `Panier (0)`;
   }
}

//Gestion des affichage si => Panier Vide => Panier plein

function cartEmpty() {
    const cartEmptyIcon = document.getElementById('cartContentIcon');
    const cartEmptyText = document.getElementById('cartContentText');


    cartEmptyText.innerHTML = "<p>Votre panier est vide !<p>";
    cartEmptyIcon.innerHTML =  '<i class="bi bi-x-lg"></i>';
    document.getElementById('cartContact').style.display="none";
    document.getElementById('affichPanier').style.display="none";
    }

function cartFull() {
    const cartfullIcon = document.getElementById('cartContentIcon');
    const cartFullText = document.getElementById('cartContentText');

    cartfullIcon.innerHTML = '<i class="bi bi-cart"></i>';
    cartFullText.innerHTML = "<p>Voici votre panier<p>";
    document.getElementById('cartContact').style.display="block";
    }


//Affichage des donée dans le tableau

function affichCell() {


    for (const articles of getDataArray) {
        document.getElementById('templateCell').innerHTML += 
        `<tr>
            <th scope="row"></th>
            <td>${articles.name}</td>
            <td></td>
            <td></td>
            <td>${articles.price / 100 + ".00 €"}</td>
            <td><i class="bi bi-trash" id="btnDelete"</td>
        </tr>`;

    }

}

// Gestion du prix total dans le panier

function montant(article){
    return article.price;
}

function sum(prev, next){
    return prev + next;
}

// Condition d'affichage du panier

if (localStorage.getItem('products') === null) {
    cartEmpty();
}
else{
    affichCell();
    cartFull();
    let totalCarts = getDataArray.map(article => article.price).reduce((prev, next) => prev + next);
    document.getElementById('totalPriceCart').innerHTML = `<td class="h4" id="totalPriceCart">${totalCarts / 100 + ".00€"}</td>`;

    function delToCart() { // Gestion du suppression d'article
        const suppToStorage = localStorage.removeItem('products', JSON.stringify(getDataArray));

        console.log(getDataArray)
    }


    const btnDelete = document.getElementById('btnDelete')
                    .addEventListener('click', function(event){
                    delToCart();
                    location.reload();
                            });
  
}
// Gestion du formulaire d'envoie de commande

//Verification des données du formulaire

function formVerif (){
    let inputFirstName = document.getElementById('formFirstName').value;
    let inputLastName = document.getElementById('formLastName').value;
    let inputAddress = document.getElementById('formAddress').value;
    let inputCity = document.getElementById('formCity').value;
    let inputMail = document.getElementById('formMail').value;

    if(typeof inputFirstName || inputLastName || inputAddress || inputCity || inputMail === "string"){

        function sendToLocalStorage (){

            let contact = { // Objet avec les différent input
                'firstName': inputFirstName,
                'lastName': inputLastName,
                'address': inputAddress,
                'city': inputCity,
                'email': inputMail,
            };
            let products = [];  //Tableau avec les ID des produits
            for (const article of getDataArray) {
                products.push(article._id);
            }

            let sendRequest = {contact, products};

            let urlOrder = 'http://localhost:3000/api/cameras/order';

            const postRequest = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(sendRequest)
            };

            fetch(urlOrder, postRequest) // Requête d'envoie des données
            .then((response) => response.json())
            .then((response) => { // On stock les données 
                console.log(response);
                localStorage.removeItem("products");localStorage.setItem("Order",response.orderId);
            }) 
            .catch((err) => {console.warn('Erreur dans le fetch:' + err.stack);});

        }
        sendToLocalStorage();
    }
    else{
        alert("Il y a une erreur dans la vérification du formulaire");
    }
}

function formSend(){ // Exécution de la fonction au click du bouton
    document.getElementById('btnSend')
    .addEventListener('click', function(event) {
        formVerif();
    });    
}
formSend();
