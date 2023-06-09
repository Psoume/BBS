<?php
$fromFile = $_GET['fromFile'];

$fileName = str_replace(" ","",htmlspecialchars($_GET['fileName']));
$is_blank = $_GET['is_blank'];

if ($is_blank=='true') {
    $xml = simplexml_load_file('../data/base.xml');
    $xml->asXML("../data/XML/".$fileName);
}

else if ($is_blank=='false'){
    $xml = simplexml_load_file("../data/XML/".$fromFile);
    $xml->asXML("../data/XML/".$fileName);
}

echo $fileName;



?>