import './Home.css';
import '../../App.css';
import { useState } from 'react';

function Home() {

  var [liste, setListe] = useState([]);

  var [message, setMessage] = useState("");


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
          if (textArray.includes(retrievedArray[i]) === false && retrievedArray[i][1] > 0) {
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

      setListe(textArray);
      localStorage.setItem("liste", JSON.stringify(textArray));

    }

  }, 1000);

  function deleteAll() {

    let div = document.getElementById("card");
    let ptags = div.getElementsByTagName("p");

    while (ptags.length > 0) {
      ptags[0].parentNode.removeChild(ptags[0]);
    }

  }

  // Cette fonction permet de supprimer les éléments par leur nom (utile pour éviter les doublons de nom dans la liste)
  function deleteElement(element) {

    let div = document.getElementById("card");
    let ptags = div.getElementsByTagName("p");

    var liste_a_supprimer = [];

    for (let i = 0; i < ptags.length; i++) {
      if (ptags[i].firstChild.textContent === element) {
        liste_a_supprimer.push(i);
      }
    }

    for (let i = 0; i < liste_a_supprimer.length; i++) {
      ptags[0].parentNode.removeChild(ptags[liste_a_supprimer[i] - i]);
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

      element = element.toLowerCase();    // Pour avoir l'élement écrit en minuscules

      for (let i = 0; i < liste.length; i++) {
        if (liste[i][0].toLowerCase() === element.toLowerCase()) {
          deleteElement(element);   // si l'élément existait déjà dans la table, on retire l'ancienne verison pour avoir la nouvelle quantité
          liste.pop(liste[i]);
        }
      }

      liste.push([element.toLowerCase(), quantite]);

      setListe(liste);

      localStorage.setItem("liste", JSON.stringify(liste));

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

    document.getElementById("focus").focus();

  }

  function sync() {

    var url = document.getElementById("url").value;

    fetch(url + '/register')
      .then(res => res.json())
      .then(data => {
        if (localStorage.getItem('id') === null) {
          localStorage.setItem('id', JSON.stringify(data.id));
        }
        localStorage.setItem("server_id", JSON.stringify(data.id));
        localStorage.setItem("server_liste", JSON.stringify(Object.values(data.courses)));

        var maliste = JSON.parse(localStorage.getItem('liste'));
        var severliste = JSON.parse(localStorage.getItem('server_liste'));

        var differences = [];
        var pair = {};

        for (let i = 0; i < maliste.length; i++) {
          var dejala = false;
          for (let j = 0; j < severliste.length; j++) {
            if (severliste[j].produit === maliste[i][0]) {
              pair = {};
              pair.produit = severliste[j].produit;
              pair.qte = JSON.stringify(maliste[i][1] - JSON.parse(severliste[j].qte));
              differences.push(pair);
              dejala = true;
            }
          }
          if (dejala === false) {
            pair = {};
            pair.produit = maliste[i][0];
            pair.qte = maliste[i][1];
            differences.push(pair);
          }
        }

        var id = localStorage.getItem('id').replaceAll('"', '');

        console.log("Sending succeed !\nid=" + id + "&chg=" + JSON.stringify(differences));

        fetch(url + '/courses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: 'id=' + id + '&chg=' + JSON.stringify(differences)
        });

      });

    document.getElementById("alertmessage").style.display = "block";

    document.getElementById("new_element").focus();

    setMessage("Liste envoyée !");

    setTimeout(() => {
      document.getElementById("alertmessage").style.display = "none";
      setMessage("");
    }, 4000);

  }

  function getListe() {

    var url = document.getElementById("url").value;

    fetch(url + '/register')
      .then(res => res.json())
      .then(data => {
        localStorage.setItem("id", JSON.stringify(data.id));
        var mylist = [];
        for (let i = 0; i < data.courses.length; i++) {
          mylist.push([data.courses[i].produit, data.courses[i].qte]);
        }
        console.log(JSON.stringify(mylist));
        setListe(mylist);
        localStorage.setItem("liste", JSON.stringify(mylist));
      });

    document.getElementById("alertmessage").style.display = "block";

    document.getElementById("focus").focus();

    setMessage("Liste récupérée !");

    setTimeout(() => {
      document.getElementById("alertmessage").style.display = "none";
    }, 4000);

  }

  return (

    <div className="App">

      <h1 id="focus">Ma liste de courses personnalisée !</h1>

      <p>

        <span className='info'>URL du serveur (modifiable) :</span>
        <input type="text" defaultValue="https://esilv.olfsoftware.fr/td5" id="url"></input>

        <button className="special btn" onClick={() => getListe()}>Récupérer la liste au serveur</button>

        <button className="special btn" onClick={() => sync()}>Envoyer la liste au serveur</button>

      </p>

      <div className='card'>

        <input type="text" placeholder='Oignons, Poulet, Jus, ...' id="new_element"></input>
        <input type="number" placeholder='Ex : 4' id="quantite"></input>

        <button className="btn blue" id="button" onClick={() => search()}>Ajouter <strong>+</strong></button>
        <button className="btn red" onClick={() => deleteAll()}>Delete All <strong>🗑</strong></button>

        <div className='separator'></div>

      </div>

      <div className='card big' id="card"></div>

      <div className='minion'></div>

      <div id="alertmessage">{message}</div>

    </div >

  );
}

export default Home;