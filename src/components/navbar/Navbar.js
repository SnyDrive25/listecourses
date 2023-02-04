import { useState } from "react";
import "./Navbar.css";

function Navbar() {

    const [nav, setNav] = useState(false);

    var path = window.location.pathname.split("/").pop();

    setTimeout(() => {
        switch (path) {
            case (''):
                document.getElementById("home").style.borderTop = ".4em solid var(--dark)";
                break;
            case ('about'):
                document.getElementById("about").style.borderTop = ".4em solid var(--dark)";
                break;
            default:
                break;
        }
    }, 50);

    function biggerNav() {
        if (nav) {
            setNav(false);
            document.getElementById("scrolled").style.display = "none";
            document.getElementById("cross").style.display = "none";
            document.getElementById("hamburger").style.display = "block";
            document.getElementById("Navbar").style.height = "10vh";
        }
        else {
            setNav(true);
            document.getElementById("Navbar").style.height = "60vh";
            document.getElementById("hamburger").style.display = "none";
            document.getElementById("cross").style.display = "block";
            setTimeout(() => {
                document.getElementById("scrolled").style.display = "grid";
            }, 400);
        }
    }

    return (
        <div id="Navbar">
            <div className="titles">
                <a href="../" id="home">Accueil</a>
                <a href="../about" id="about">A propos</a>
                <span id="hamburger" onClick={() => biggerNav()}></span>
                <span id="cross" onClick={() => biggerNav()}></span>
                <p className="co">
                    <a href="../connexion" id="login">Connexion</a>
                    <a href="../deconnexion" className="light" id="disconnect">Deconnexion</a>
                </p>
            </div>
            <div id="scrolled">
                <a href="../" id="home">Accueil</a>
                <a href="../about" id="about">A propos</a>
                <a href="../connexion" id="login" className="notel">Connexion</a>
                <a href="../deconnexion" className="light" id="disconnect">Deconnexion</a>
            </div>
        </div>
    );
}

export default Navbar;