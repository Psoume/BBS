<?php
$fromFile = $_GET['fromFile'];
$fileName = $_GET['fileName'];
$is_blank = $_GET['is_blank'];

if ($is_blank=='true') {
    $xml = simplexml_load_file('res/'.$fromFile);
    $xml->asXML("res/XML/".$fileName);
}

else if ($is_blank=='false'){
    $xml = simplexml_load_file("res/XML/".$fromFile);
    $xml->asXML("res/XML/".$fileName);
}



?>