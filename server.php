<?php

// Use this line if POST sent in json format
$_POST = json_decode(file_get_contents("php://input"), true);

echo var_dump($_POST);