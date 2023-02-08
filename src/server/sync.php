<?php

    require "./server.php";

    header('Content-type: application/json; charset=utf-8');

    $id = $_POST["id"];
    $qte = $_POST["qte"];
    $seq = $_POST["seq"];
    
    $valid = $pdo->query("INSERT INTO `elements` (`id`, `produit`, `qte`) VALUES ('08765cd14d112d6900c500831265cd655776472ad356fecd751b4b22834ec625', 'tomates', '5')");

    $valid2 = $valid->fetchColumn(0);

    print(json_encode($valid2 != 0));
?>