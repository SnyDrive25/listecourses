import './Home.css';
import '../../App.css';
import { useState } from 'react';

function Home() {

  var [liste, setListe] = useState([]);

  localStorage.setItem("liste", JSON.stringify(liste));

  setInterval(function () {
    let div = document.getElementById("card");
    let spans = div.getElementsByTagName("span");
    let textArray = [];
    for (let i = 0; i < spans.length; i++) {
      textArray.push(spans[i].textContent);
    }
    if (textArray.length >= JSON.parse(localStorage.getItem("liste")).length) {
      window.done = true;
      setListe(textArray);
    }
  }, 500);

  function search() {
    var element = document.getElementById("new_element").value.replace(/[^a-zA-Z0-9\s]/g, "");
    // On enlève tout ce qui n'est pas un caractère alphabétique (a-zA-Z), numériques (0-9) ou un espace (\s) avec une expression régulière

    if (element.length === 0) {
      alert("Veuillez remplir la zone de texte avant d'ajouter un élément");
    }
    else {
      element = element[0].charAt(0).toUpperCase() + element.slice(1).toLowerCase();
      if (liste.includes(element)) {
        alert("Cet élément est déjà dans la liste !");
      }
      else {
        if (element !== "") {
          var old_list = JSON.parse(localStorage.getItem("liste"));      // on récupère la liste actuelle
          setListe([...old_list, element]);                              // on ajoute le nouvel élément dans le tableau

          var code_element = element.replaceAll(" ", "_").toLowerCase();
          document.getElementById("card").innerHTML += "<span id='e" + code_element + "' onclick='e" + code_element + ".parentNode.removeChild(e" + code_element + ")'>" + element + "</span>";
          // Là on ajoute dans le html l'élément écrit et on lui donne une propriété onclick pour qu'il puisse être retiré en cliquant dessus
          // Remarque : j'ai ajouté un 'e' devant l'id et les références de l'id car sinon, si l'élément commence par un chiffre (ex : 2kg de riz), l'id ne sera pas valide car commençant par un chiffre !

          localStorage.setItem("liste", JSON.stringify(liste));          // on met à jour la variable du localstorage
          setTimeout(() => {
            document.getElementById("new_element").value = '';
          }, 50);
        }
      }
    }
    document.getElementById("new_element").focus();
  }

  function sync() {
    const retrievedArray = JSON.parse(localStorage.getItem('liste')) || [];
    setListe(retrievedArray);
    let div = document.getElementById("card");
    let spans = div.getElementsByTagName("span");
    let textArray = [];
    for (let i = 0; i < spans.length; i++) {
      textArray.push(spans[i].textContent);
    }
    for (let i = 0; i < retrievedArray.length; i++) {
      if (textArray.includes(retrievedArray[i]) === false) {
        var code_element = retrievedArray[i].replaceAll(" ", "_").toLowerCase();
        document.getElementById("card").innerHTML += "<span id='e" + code_element + "' onclick='e" + code_element + ".parentNode.removeChild(e" + code_element + ")'>" + retrievedArray[i] + "</span>";
      }
    }
  }

  return (
    <div className="App">
      <h1>Ma liste de courses personnalisée !</h1>
      <button className='sync'>Synchroniser avec les données du navigateur</button>
      <div className='card'>
        <input type="text" placeholder='Oignons, Poulet, Jus, ...' id="new_element"></input>
        <button id="button" onClick={() => search()}>Ajouter</button>
      </div>
      <div className='card big' id="card"></div>
    </ div >
  );
}

export default Home;