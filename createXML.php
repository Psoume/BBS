<?php
$fromFile = $_GET['fromFile'];
$fileName = $_GET['fileName'];
$is_blank = $_GET['is_blank'];

if ($is_blank=='true') {
    $xml = simplexml_load_file($fromFile);
    $xml->asXML("TEMP/".$fileName);
}

else if ($is_blank=='false'){
    $xml = simplexml_load_file("TEMP/".$fromFile);
    $xml->asXML("TEMP/".$fileName);
}



?>