<?php

    header("Access-Control-Allow-Origin: *");
    header('Content-type: application/json; charset=utf-8');

    $random_id = bin2hex(random_bytes(32));
    $courses = array(
        array("produit"=>"Produit", "qte"=>"0")
    );

    $output = array(
        "id" => $random_id,
        "courses" => $courses,
        "seq" => 1
    );

    print(json_encode($output));

?>