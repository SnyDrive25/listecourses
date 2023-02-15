<?php

    header("Access-Control-Allow-Origin: *");
    header('Content-type: application/json; charset=utf-8');

    // Getting the last element of the data.json file to get the sequence to give
    $json = file_get_contents('./data.json');
    $data = json_decode($json, true);
    $last = end($data);

    // Setting the 3 elements to add to the json and to give to client side
    $random_id = bin2hex(random_bytes(25));
    $courses = $last["courses"];
    $seq = $last["seq"];

    $output = array(
        "id" => $random_id,
        "courses" => $courses,
        "seq" => $seq
    );

    print(json_encode($output));

?>