<?php
$fromFile = $_GET['fromFile'];

$fileName = str_replace(" ","",htmlspecialchars($_GET['fileName']));

if ($fromFile=='base.xml') {
    $xml = simplexml_load_file('../data/base.xml');
    $xml->asXML("../data/XML/".$fileName);
}

else{
    $xml = simplexml_load_file("../data/XML/".$fromFile);
    $xml->asXML("../data/XML/".$fileName);
}

echo $fileName;



?>