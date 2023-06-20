<?php
$fromFile = $_GET['fromFile'];

$fileName = "XML/".str_replace(" ","",htmlspecialchars($_GET['fileName']));


    if ($fromFile=='base.xml') {
        $xml = simplexml_load_file('../data/base.xml');
        $xml->asXML("../data/".$fileName);
    }
    
    else{
        $xml = simplexml_load_file("../data/".$fromFile);
        $xml->asXML("../data/".$fileName);
    }
    echo $fileName;





?>