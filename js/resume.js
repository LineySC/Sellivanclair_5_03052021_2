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

let dataLocalOrder = localStorage.getItem('Order');
//let dataParseOrder = JSON.parse(dataLocalOrder);

console.log(dataLocalOrder);
//console.log(dataParseOrder);

function affichOrder() {
    let orderId = dataParseOrder.orderId;
    let orderProduct = dataParseOrder.products;
    let orderContact = dataParseOrder.contact;

    document.getElementById('orderId').innerHTML = `<h2 id="orderId">Bon de commande: ${orderId}</h2>`

    for (const product of orderProduct) {
        document.getElementById('orderProduct').innerHTML += 
        `<div class="col-12 col-md-6 col-lg-6 mb-3">
        <div class="card">
            <img src="${product.imageUrl}" alt="Produit caméra" class="card-img" >
            <div class="card-body">
                <h1 class="card-title text-center h4">${product.name}</h1>
            </div>
        </div>
    </div>`
    }

    function montant(article){
        return article.price;
    }
    
    function sum(prev, next){
        return prev + next;
    }

    let orderTotal = getDataArray.map(article => article.price).reduce((prev, next) => prev + next);


    document.getElementById('orderTotal').innerHTML = 
    `<p>Voici le montant total de votre commande: ${orderTotal}€`

}

affichOrder();