import '../../App.css';
import './Connexion.css';

function Connexion() {


    return (
        <div id='connexion'>
            <div>
                <p>
                    <label>Pseudo</label>
                    <input id="email" name="email"></input>
                </p>
                <p>
                    <label>Mot de passe</label>
                    <input id="mdp" name="mdp"></input>
                </p>
            </div>
            <div>
                <button className="button">Connexion</button>
            </div>
            <div>
                <p className='infos'>Pas encore inscrit ? <a href="../inscription">Inscription</a></p>
            </div>
        </div>
    );
}

export default Connexion;