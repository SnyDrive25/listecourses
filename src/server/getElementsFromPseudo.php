<?php

    require "./server.php";

    header('Content-type: application/json; charset=utf-8');

    $user = $_POST["user"];

    $getElements = $pdo->query("SELECT produit, qte FROM elements WHERE id = '" . $user . "'");
    
    $elements = $getElements->fetchAll(PDO::FETCH_ASSOC);
    
    print(json_encode($elements));

?>