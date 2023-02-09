<?php

    header("Access-Control-Allow-Origin: *");
    header('Content-type: application/json; charset=utf-8');

    $id = $_POST["id"];
    $chg = $_POST["chg"];

    // Getting the last element of the data.json file to get the sequence to give
    $json = file_get_contents('data.json');
    $data = json_decode($json, true);
    $last = end($data);

    $file = fopen('data.json', 'w');
    $data += array('id' => $id, 'courses' => ((int) $last["courses"] - (int) $chg) . "" , 'sequence' => ((int) $last["seq"] + 1) . "" );
    $jsonData = json_encode($data);
    
    fwrite($file, $jsonData);

    fclose($file);

    print(json_encode($jsonData));

?>