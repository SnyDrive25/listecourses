<?php

    header("Access-Control-Allow-Origin: *");
    header('Content-type: application/json; charset=utf-8');

    $id = json_decode($_POST["id"], true);
    $chg = json_decode($_POST["chg"], true);

    // Getting the last element of the data.json file to get the sequence to give
    $json = file_get_contents('./data.json');
    $array = json_decode($json);
    $last = $array[count($json)];

    // foreach($chg as $change){
    //     $found = false;
    //     foreach($last["courses"] as &$liste){
    //         if($liste["produit"] == $change["produit"]) {
    //             $last["courses"][] = array("produit" => $liste["produit"], "qte" =>  intval($liste["qte"]) + intval($change["qte"]));
    //             $found = true;
    //             break;
    //         }
    //     }
    //     if(!$found){
    //         $last["courses"][] = $change;
    //     }
    // }

    $last->id = $id . "";
    $last->sequence = (count($json) + 1) . "";

    // $file = fopen('./data.json', 'w');
    // $json[] = $data;//array('id' => $id . "", 'courses' => $new_data["courses"] , 'sequence' => (((int) $last["sequence"]) + 1) . "" );
    // $jsonData = json_encode($json);
    
    // fwrite($file, $jsonData);

    // fclose($file);

    print($chg);

    // $obj = new stdClass(); $obj=>toto="";
    // function addlog($txt)
    // file_put_contents($fichier,file_get_contents($fichier)+"/n"+$txt);
