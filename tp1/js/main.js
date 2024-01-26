const refInput = document.querySelector("#refInput");
const intituleInput = document.querySelector("#intituleInput");
const prixInput = document.querySelector("#prixInput");
const effacerBtn = document.querySelector("#effacerBtn");
const ajouterBtn = document.querySelector("#ajouterBtn");
const tbody = document.querySelector("#tbody");
const updateButton = document.querySelector("#updateBtn");
const spanMoyen = document.querySelector("#spanMoyen");
let xhrGet = new XMLHttpRequest(); 
let xhrPost = new XMLHttpRequest();
let xhrDelete = new XMLHttpRequest(); // Utilisation d'une nouvelle instance pour la requête GET
// Utilisation d'une nouvelle instance pour la requête GET



// Fonction pour ajouter un produit dans le tableau
const addProduit = (produit) => {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    const buttonDelete = document.createElement("button");

    tbody.appendChild(tr);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    td4.appendChild(buttonDelete);

    const { id, intitule, prix } = produit;

    td1.innerText = id;
    td2.innerText = intitule;
    td3.innerText = prix;
    buttonDelete.innerText = "X";

    buttonDelete.setAttribute("data-ref", produit.id);
    buttonDelete.setAttribute("data-intitule", produit.intitule);
    buttonDelete.setAttribute("data-prix", produit.prix);

    buttonDelete.addEventListener("click", () => {
        
        const deletedRef = buttonDelete.getAttribute("data-ref");
        console.log(deletedRef)
        xhrDelete.open("DELETE", `http://localhost:3000/produits/${deletedRef}`, true);
        
    
        // Set up event listener for when the DELETE request completes
        xhrDelete.onload = function () {
            if (xhrDelete.status === 200) {
                // Successful deletion, you can handle the response or take additional actions
                console.log("Element deleted successfully");
                tr.remove(); // Remove the tr element after successful deletion
            } else {
                // Handle errors here if needed
                console.error("Error deleting element:", xhrDelete.statusText);
            }
        };
    
        // Set up event listener for network errors
        xhrDelete.onerror = function () {
            console.error("Network error occurred");
        };
    
        // Send the DELETE request
        xhrDelete.send();
    });
    
};

// Fonction pour envoyer un produit au serveur
const sendProduit = (produit) => {
    xhrPost.open("POST", "http://localhost:3000/produits", true);
    xhrPost.setRequestHeader("Content-Type", "application/json");
    
    const postData = {
        id: produit.id,
        intitule: produit.intitule,
        prix: produit.prix,
    };
    
    xhrPost.send(JSON.stringify(postData));
};

// Fonction pour vider les champs du formulaire
const effacer = () => {
    
    refInput.value = "";
    intituleInput.value = "";
    prixInput.value = "";
};

effacerBtn.addEventListener("click", () => {
    xhrDelete.open("DELETE", `http://localhost:3000/produits?id=${refInput.value}`, true);
    xhrDelete.send();
    effacer();
});

ajouterBtn.addEventListener("click", (event) => {
    event.preventDefault();
    let id = refInput.value;
    let intitule = intituleInput.value;
    let prix = prixInput.value;

    if (!id || !intitule || !prix) {
        return alert("Veuillez remplir tous les champs");
    }

    let newProduit = { id, intitule, prix };
    sendProduit(newProduit);
    
    effacer();
});

xhrGet.open("GET","http://localhost:3000/produits" ,true)
xhrGet.addEventListener('load',()=>{
    const response = JSON.parse(xhrGet.responseText);
    response.forEach(produit => {
       
        addProduit(produit);
    });

})
xhrGet.send();


updateButton.addEventListener("click", () => {
    let somme = 0;
    let moyen = 0;
    let tbodyRows = document.getElementById('tbody').children;
    let nombreProduit = tbodyRows.length;

    if (nombreProduit > 0) {
        for (let i = 0; i < nombreProduit; i++) {
            let va = tbodyRows[i].children[2].innerText;
            let intValue = parseInt(va, 10);
            somme += intValue;
        }

        moyen = somme / nombreProduit;
        spanMoyen.innerText = moyen.toFixed(2); // Ajout de toFixed pour afficher deux décimales
    } else {
        alert('Aucun produit saisi. Saisissez au moins un produit pour calculer la moyenne.');
    }
});
