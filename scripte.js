


document.addEventListener("DOMContentLoaded", function() {
    const ajouterLivreBtn = document.getElementById("ajouterLivreBtn");
    const modal = document.getElementById("modal");
    const closeBtn = document.querySelector(".close");
    const ajouterBtn = document.getElementById("ajouterBtn");
    const titreInput = document.getElementById("titreInput");
    const auteurInput = document.getElementById("auteurInput");
    const listeLivres = document.getElementById("listeLivres");

    ajouterLivreBtn.addEventListener("click", function() {
        modal.style.display = "flex";
    });

    closeBtn.addEventListener("click", function() {
        modal.style.display = "none";
    });

    ajouterBtn.addEventListener("click", function() {
        const titre = titreInput.value;
        const auteur = auteurInput.value;
        if (titre.trim() !== '' && auteur.trim() !== '') {
            ajouterLivreDansListe(titre, auteur);
            modal.style.display = "none";
            titreInput.value = '';
            auteurInput.value = '';
        } else {
            alert("Veuillez remplir tous les champs!");
        }
    });

  

   

    

    afficherLivres();
});

function supprimerLivre(id) {
    let livres = recupererLivresDepuisLocalStorage();
    livres = livres.filter(livre => livre.id !== parseInt(id));
    localStorage.setItem("livres", JSON.stringify(livres));
    afficherLivres();
}

// function basculerStatutLecture(id) {
//     let livres = recupererLivresDepuisLocalStorage();
//     livres = livres.map(livre => {
//         if (livre.id === parseInt(id)) {
//             livre.lu = !livre.lu;
//             const auteur = document.querySelector(`#${livre.auteur}-${livre.id}`)
//             const titre = document.querySelector(`#${livre.titre}-${livre.id}`)
//             const btn = document.querySelector(`[data-id="${livre.id}"]`)
//             console.log({ html: btn.innerHTML, auteur, titre})
//             if (btn.innerHTML === 'Lu') {
//                  auteur.style.textDecoration = 'line-through'
//                  titre.style.textDecoration = 'line-through'
//                 auteur.classList.add('test')
//                 titre.classList.add('test')
//             }
//         }
//         return livre;
//     });
//     localStorage.setItem("livres", JSON.stringify(livres));
//     afficherLivres();
// }




function basculerStatutLecture(id) {
    let livres = recupererLivresDepuisLocalStorage();
    livres = livres.map(livre => {
        if (livre.id === parseInt(id)) {
            livre.lu = !livre.lu;
           
        }
        return livre;
    });
    localStorage.setItem("livres", JSON.stringify(livres));
    afficherLivres();

    const livre = livres.find(livre=>livre.id===parseInt(id))
    if(livre){
        const auteur = document.querySelector(`#${livre.auteur}-${livre.id}`)
        const titre = document.querySelector(`#${livre.titre}-${livre.id}`)
        
        if (livre.lu) {
            auteur.style.textDecoration = 'line-through';
            titre.style.textDecoration = 'line-through';
        } else {
            auteur.style.textDecoration = 'none';
            titre.style.textDecoration = 'none';
        }
    }


}



function ajouterLivreDansListe(titre, auteur) {
    const livres = recupererLivresDepuisLocalStorage();
    const nouveauLivre = {
        id: Date.now(),
        titre: titre,
        auteur: auteur,
        lu: false
    };
    livres.push(nouveauLivre);
    localStorage.setItem("livres", JSON.stringify(livres));
    afficherLivres();
}


function recupererLivresDepuisLocalStorage() {
    return JSON.parse(localStorage.getItem("livres")) || [];
}

function afficherLivres() {
    const livres = recupererLivresDepuisLocalStorage();
    listeLivres.innerHTML = '';
    livres.forEach(livre => {
        const li = document.createElement("li");
        li.innerHTML = `
            <p class="titre-livre" id="${livre.titre}-${livre.id}">${livre.titre}</p>
            <p class="auteur-livre" id="${livre.auteur}-${livre.id}">${livre.auteur}</p>
            <div class="options-livre">
                <button class="supprimer"  onclick="supprimerLivre(${livre.id})">Supprimer</button>
                <button class="marquer" onclick=" basculerStatutLecture(${livre.id})" data-id="${livre.id}">${livre.lu ? 'Non Lu' : 'Lu'}</button>
            </div>
        `;
        listeLivres.appendChild(li);2
    });
}