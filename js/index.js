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

// Gestion de récupération des article dans l'API

const url = 'http://127.0.0.1:3000/api/cameras/'; //Définition de l'URL de l'API

function reqArticle() {    
    fetch(url)  
    .then(function(res) {       // Condition pour vérifier l'API
        if(res.ok) {
           return res.json()
        }
        else{
            document.getElementById('itemDescrpition')
                    .innerHTML = 'Une erreur reseau est survenu merci de reesayer plus tard <br> Si le problème persiste merci de contacter le service client';
        };
    })
    .then (article => {     // Boucle de récupération pour l'affichage des articles
        for (const item of article) {
            document.getElementById('templateArticle').innerHTML += 
            `<div class="col-12 col-md-6 col-lg-4 mb-3">
                <div class="card">
                    <img src="${item.imageUrl}" alt="Produit caméra" class="card-img" height="350" >
                    <div class="card-body">
                        <h1 class="card-title text-center h4">${item.name}</h1>
                        <h2 class="card-subtitle h6 text-muted text-right">${item.price / 100  + ",00 €"}</h2>
                        <p class="card-text text-center">${item.description}</p>
                            <div class="text-center">
                                <a href="article.html?_id=${item._id}" class="btn stretched-link">En savoir plus</a>
                            </div>
                    </div>
                </div>
            </div>`

        }
    })

    .catch(function(err) {
        document.getElementById('erreurReseau').innerHTML = ("Une erreur est survenu.");
                
    });
}   

reqArticle();


