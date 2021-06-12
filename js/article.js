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

// Gestion de récupération des article dans l'URL

function requireId() { // Récupération de l'ID via URL
    const requireURL = window.location.search;
    const getData = new URLSearchParams(requireURL);
    const id = getData.get('_id');

    fetch(`http://127.0.0.1:3000/api/cameras/${id}`)
    .then(function (res) {
        if(res.ok){
            return res.json();
        }
    })
    .then (article => {

        // Récupération du nom de l'article => insertion dans le titre de page
        const titlePage = article.name;
        document.title = titlePage + " - Orinoco";

        //Ajout du HTML

        document.getElementById('templateArticle').innerHTML = 
        `
        <div class="col-md-4 ">
                    <div class="card">
                        <img src="${article.imageUrl}" alt="" class="card-img" id="produitImage" >
                        <h5 class="card-header" id="produitName">${article.name}</h5>
                            <div class="card-body">
                                <h5 class="card-title" id="produitPrice">${article.price / 100 + ".00€"}</h5>
                                <p class="card-text" id="produitDescription">${article.description}</p>
                                    <select class="form-control" for="lenses" id="articleLenses">
                                        <option value="">--Choisir une lentilles</option>
                                    </select>
                                    <br>
                                <div class="text-center">
                                    <a href="#" id="addToCart" class="btn btn-primary ">Ajouter au panier</a>
                                </div>
                            </div>
                    </div>
                </div>
        `
        //Création d'une boucle => Récupération des Lentilles => Affichage HTML sur la page


        const lenses = article.lenses;
    
        for (const lense of lenses) {
            document.getElementById('articleLenses').innerHTML += 
                        `
                            <option value="${lense}">${lense}</option>
                        `
        };

        // Gestion d'ajout au panier

        function alreadyExist () {
            //let getDataStorage = JSON.parse(localStorage.getItem('products'));
            //for (const articleAlready of getDataStorage) {
            //    console.log(articleAlready._id)
            //    ArticleInCart = articleAlready._id;
            //    console.log(id)
            //    if(localStorage.getItem('id') === 1){
            //        console.log('Article déjà dans le panier')
            //    }
            //    
            //}
        }

        function addToCart() {
            let getDataStorage = JSON.parse(localStorage.getItem('products'))||[];
            for (const articleAlready of getDataStorage) {
                ArticleInCart = articleAlready._id;
                console.log(id)
                if(localStorage.getItem('id') === 1){
                    console.log('Article déjà dans le panier')
                }
                
            }

            getDataStorage.push(article);
            const addToStorage = localStorage.setItem(['products'], JSON.stringify(getDataStorage));
    
        }
             const btnAdd = document.getElementById('addToCart')
                                    .addEventListener('click', function(event){
                                    document.getElementById('addSuccess').style.visibility = 'visible'
                                    addToCart();
                                    alreadyExist();
                                    location.reload();
                                });

        console.log(localStorage);

    })
    
    .catch(function (err) {
        console.log(err);
    });

}

requireId();

