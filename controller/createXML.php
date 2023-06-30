<?php
$fromFile = $_GET['fromFile'];

$fileName = "XML/".str_replace(" ","",htmlspecialchars($_GET['fileName']));

if (explode('.', $fileName)[1]!=='xml')
{
    $fileName =  $fileName.".xml";
}

if ($fromFile=='base.xml') {
    $xml = simplexml_load_file(__DIR__.'/../data/base.xml');
}
else{
    $xml = simplexml_load_file(__DIR__."/../data/".$fromFile);
}
if(!is_file(__DIR__."/../data/".$fileName))
{
    $xml->asXML(__DIR__."/../data/".$fileName);
}

echo $fileName;