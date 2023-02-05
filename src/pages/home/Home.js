import './Home.css';
import '../../App.css';
import { useState } from 'react';

function Home() {

  var [liste, setListe] = useState([]);


  // Si le localStorage n'existe pas ou que sa taille est nulle, on l'initialise à un tableau nul, sinon, on y touche pas !

  if (localStorage.getItem("liste") === undefined || localStorage.getItem("liste") === null) {

    localStorage.setItem("liste", JSON.stringify([]));

  }
  else {

    if (JSON.parse(localStorage.getItem("liste").length) === 0) {

      localStorage.setItem("liste", JSON.stringify([]));

    }

  }


  // on regarde s'il y a des éléments affichés sur le HTML
  // si oui : on ne fait rien
  // si non : si la liste dans le localStorage existe, on agrémente le HTML avec les éléments du localStorage

  setTimeout(() => {

    let div = document.getElementById("card");
    let ptags = div.getElementsByTagName("p");
    let textArray = [];

    if (ptags.length === 0 && localStorage.getItem("liste") !== undefined) {

      if (JSON.parse(localStorage.getItem("liste")) !== null && JSON.parse(localStorage.getItem("liste")).length !== 0) {

        const retrievedArray = JSON.parse(localStorage.getItem('liste'));

        for (let i = 0; i < retrievedArray.length; i++) {
          if (textArray.includes(retrievedArray[i]) === false) {
            var code_element = retrievedArray[i][0].replaceAll(" ", "_").toLowerCase();
            document.getElementById("card").innerHTML += "<p id='e" + code_element + "' onclick='e" + code_element + ".parentNode.removeChild(e" + code_element + ")'>" + retrievedArray[i][0] + "<span>" + retrievedArray[i][1] + "</span></p>";
          }
        }

        localStorage.setItem("liste", JSON.stringify(retrievedArray));

      }

    }

  }, 25);


  // Toutes les secondes, le navigateur va ensuite vérifier si les données du HTML ont la même taille que celles du localStorage
  // Si non, on actualise le localStorage

  setInterval(() => {

    let div = document.getElementById("card");
    let ptags = div.getElementsByTagName("p");
    let textArray = [];

    for (let i = 0; i < ptags.length; i++) {
      textArray.push([ptags[i].firstChild.textContent, ptags[i].children[0].innerText]);
    }

    if (JSON.parse(localStorage.getItem("liste")) !== null && JSON.parse(localStorage.getItem("liste")) !== undefined) {

      if (textArray.length < JSON.parse(localStorage.getItem("liste")).length) {

        setListe(textArray);
        localStorage.setItem("liste", JSON.stringify(textArray));

      }

      else {

        setListe(textArray);
        localStorage.setItem("liste", JSON.stringify(textArray));

      }

    }

  }, 1000);

  function deleteAll() {

    let div = document.getElementById("card");
    let ptags = div.getElementsByTagName("p");

    while (ptags.length > 0) {
      ptags[0].parentNode.removeChild(ptags[0]);
    }

  }

  function search() {

    var element = document.getElementById("new_element").value.replace(/[^a-zA-Z0-9\s]/g, "");
    // On enlève tout ce qui n'est pas un caractère alphabétique (a-zA-Z), numériques (0-9) ou un espace (\s) avec une expression régulière

    var quantite = parseInt(document.getElementById("quantite").value.replace(/[^0-9]/g, ""));
    // On enlève tout ce qui n'est pas un caractère numériques (0-9) avec une expression régulière + on le convertit en entier


    if (element.length === 0) {

      alert("Veuillez remplir la zone de texte avant d'ajouter un élément");    // On empêche la liste de s'aggrémenter d'un élément vide et on avertit l'utilisateur

    }

    else {

      element = element[0].charAt(0).toUpperCase() + element.slice(1).toLowerCase();    // Pour avoir l'élement écrit avec une première lettre en majuscule et les autres en minuscule

      if (liste.includes(element)) {

        alert("Cet élément est déjà dans la liste !");      // On avertit l'utilisateur si l'élément est déjà dans la liste

      }

      else {

        if (element !== "") {

          var old_list = JSON.parse(localStorage.getItem("liste"));      // on récupère la liste actuelle

          setListe([...old_list, [element, quantite]]);                  // on ajoute le nouvel élément dans le tableau

          var code_element = element.replaceAll(" ", "_").toLowerCase(); // on génère un id à partir du nom de l'élément

          document.getElementById("card").innerHTML += "<p id='e" + code_element + "' onclick='e" + code_element + ".parentNode.removeChild(e" + code_element + ")'>" + element + "<span>" + quantite + "</span></p>";
          // Là on ajoute dans le html l'élément écrit et on lui donne une propriété onclick pour qu'il puisse être retiré en cliquant dessus
          // Remarque : j'ai ajouté un 'e' devant l'id et les références de l'id car sinon, si l'élément commence par un chiffre (ex : 2kg de riz), l'id ne sera pas valide car commençant par un chiffre !

          localStorage.setItem("liste", JSON.stringify(liste));          // on met à jour la variable du localstorage

          // on réinitialise nos deux zones de texte
          document.getElementById("new_element").value = '';
          document.getElementById("quantite").value = '';

        }

      }

    }

    document.getElementById("new_element").focus();

  }

  return (

    <div className="App">

      <h1>Ma liste de courses personnalisée !</h1>

      <div className='card'>

        <input type="text" placeholder='Oignons, Poulet, Jus, ...' id="new_element"></input>
        <input type="number" placeholder='Ex : 4' id="quantite"></input>

        <button className="btn blue" id="button" onClick={() => search()}>Ajouter <strong>+</strong></button>
        <button className="btn red" onClick={() => deleteAll()}>Delete All <strong>🗑</strong></button>

        <div className='separator'></div>

      </div>

      <div className='card big' id="card"></div>

      <div className='minion'></div>

    </div >

  );
}

export default Home;