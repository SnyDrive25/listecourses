<?php

    header("Access-Control-Allow-Origin: *");

    $servername="fdb30.awardspace.net";
    $database="3535352_courses";
    $port=3306;
    $username="3535352_courses";
    $password="courses2";
    $charset="utf8mb4";

    try {
        $dsn="mysql:host=$servername;port=$port;dbname=$database;charset=$charset";
        $pdo=new PDO($dsn, $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        header("Access-Control-Allow-Origin: *");
    } catch(PDOException $e) {
        echo "Connection failed: ". $e->getMessage();
    }

?>