<?php

    require "./server.php";

    header('Content-type: application/json; charset=utf-8');

    $User = $_POST["user"];
    $UserPW = $_POST["mdp"];

    $valid = $pdo->query("SELECT COUNT(mdp) FROM login WHERE username = " . $pdo->quote($User) . " AND mdp = " . $pdo->quote($UserPW));

    $valid2 = $valid->fetchColumn(0);

    print(json_encode($valid2 != 0));
?>