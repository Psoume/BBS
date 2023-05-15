<?php

if (isset($_POST['XML_Name'])) {
    $XML_Name = $_POST['XML_Name'];
}

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

if (isset($XML_Name)) {
    $xml->asXML($XML_Name);
    echo "<a href='".$XML_Name."' download='".$XML_Name."'>Télécharger le fichier XML</a>";
}

elseif (isset($Titre_AT)) {
    $xml->asXML($Titre_AT.".xml");
    echo "<a href='".$Titre_AT."' download='".$Titre_AT."'>Télécharger le fichier XML</a>";
}

else{
    $xml->asXML("Avis_test.xml");
    echo "<a href='Avis_test.xml' download='Avis_test.xml'>Télécharger le fichier XML</a>";
}
?>




