import "./Navbar.css";

function Navbar() {

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

    return (
        <div id="Navbar">
            <div className="titles">
                <a href="../" id="home">Accueil</a>
                <a href="../about" id="about">A propos</a>
            </div>
        </div>
    );
}

export default Navbar;