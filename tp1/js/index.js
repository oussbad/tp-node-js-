
const refInput = document.querySelector("#refInput")
const intituleInput=document.querySelector("#intituleInput")
const prixInput=document.querySelector("#prixInput")
const effacerBtn=document.querySelector("#effacerBtn")
const ajouterBtn=document.querySelector("#ajouterBtn")
const tbody=document.querySelector("#tbody")
const divbtn=document.querySelector("#divbtn")
const updateBtn =document.querySelector("#updateBtn")
const spanMoyen=document.querySelector("#spanMoyen")



const addProduit=(produit)=>{
    const tr =document.createElement("tr")
    const td1=document.createElement("td")
    const td2=document.createElement("td")
    const td3=document.createElement("td")
    const td4=document.createElement("td")
    const buttonDelete = document.createElement("button")

    tbody.appendChild(tr);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    td4.appendChild(buttonDelete)
    const {id , intitule ,prix} =produit
    td1.innerText=id
    td2.innerText=intitule
    td3.innerText=prix
    buttonDelete.innerText="X"

    buttonDelete.addEventListener("click",()=>{
        tr.remove()
    })
}

const effacer =()=>{
    refInput.value=""
    intituleInput.value=""
    prixInput.value=""
}

ajouterBtn.addEventListener("click",()=>{
    let id =refInput.value
    let intitule= intituleInput.value
    let prix = prixInput.value 
    if(!id || !intitule || !prix){
        return alert("Veuillez remplir tous les champs")
    }
    let NewProduit ={id,intitule,prix}
    addProduit(NewProduit)


})

effacerBtn.addEventListener("click", ()=>{
    effacer()

})

updateBtn.addEventListener("click",()=>{
    let moyen =0
    let somme=0
    let tbodyRows =document.getElementById('tbody').children
    let nombreProduit=tbodyRows.length
    if(nombreProduit>0){
        for(let i=0;i<nombreProduit;i++){
            let va =tbodyRows[i].children[2].innerText;
            let intValue=parseInt(va,10);
            somme+=intValue;
        }
        moyen=somme/nombreProduit;
        spanMoyen.innerText=moyen.toFixed(2)
    } else {

        alert('Aucun produit saisi. Saisissez au moins un produit pour calculer la moyenne.');

    }
    

})


