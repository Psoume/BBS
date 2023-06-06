<?php
$fromFile = $_GET['fromFile'];
$fileName = $_GET['fileName'];
$is_blank = $_GET['is_blank'];

if ($is_blank=='true') {
    $xml = simplexml_load_file('model/'.$fromFile);
    $xml->asXML("model/XML/".$fileName);
}

else if ($is_blank=='false'){
    $xml = simplexml_load_file("model/XML/".$fromFile);
    $xml->asXML("model/XML/".$fileName);
}



?>