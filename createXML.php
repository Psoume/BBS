<?php

$name = $_GET['name'];

if (file_exists('base.xml')) {
    $xml = simplexml_load_file('base.xml');
}

$xml->asXML("TEMP/".$name);

?>