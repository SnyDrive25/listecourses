import '../../App.css';
import './Connexion.css';

const Connexion = () => {

    function connect() {
        if (sessionStorage.getItem("id") === null) {
            fetch('https://esilv.olfsoftware.fr/td5/register')
                .then(response => response.json())
                .then(res => {
                    sessionStorage.setItem("id", res.id);
                    var mylist = [];
                    for (let i = 0; i < res.courses.length; i++) {
                        mylist.push([res.courses[i].produit, res.courses[i].qte]);
                    }
                    localStorage.setItem("liste", JSON.stringify(mylist));
                })
        }
        else {
            console.log(sessionStorage.getItem("id"));
        }
        setTimeout(() => {
            window.location.href = "../";
        }, 500);
    }

    return (
        <div id='connexion'>
            <div>
                <p>
                    <label>Pseudo</label>
                    <input type="text" id="pseudo" name="pseudo"></input>
                </p>
                <p>
                    <label>Mot de passe</label>
                    <input type="password" id="mdp" name="mdp"></input>
                </p>
            </div>
            <div>
                <button className="button" onClick={connect}>Connexion</button>
            </div>
            <div>
                <p className='infos'>Pas encore inscrit ? <a href="../inscription">Inscription</a></p>
            </div>
        </div>
    );
}

export default Connexion;