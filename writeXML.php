<?php

$Titre_AT = $_POST['Titre_AT'];
$Titulaire = $_POST['Titulaire'];
$Code_Titulaire = $_POST['Code_Titulaire'];
$Industriel = $_POST['Industriel'];
$Code_Industriel = $_POST['Code_Industriel'];
$Num_AT = $_POST['Num_AT'];


$xml = new SimpleXMLElement('<Avis_Technique_Ventilation/>');
$xml->addChild('Titre_AT', $Titre_AT);
$xml->addChild('Titulaire', $Titulaire);
$xml->addChild('Code_Titulaire', $Code_Titulaire);
$xml->addChild('Industriel', $Industriel);
$xml->addChild('Code_Industriel', $Code_Industriel);
$xml->addChild('Num_AT', $Num_AT);


$xml->asXML('Avis_test.xml');
?>