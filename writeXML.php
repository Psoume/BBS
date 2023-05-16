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
$Num_AT_Ancien = $_POST['Num_AT_Ancien']; //!\ Multiple
$Date_Application = $_POST['Date_Application'];
$Date_Fin_Application = $_POST['Date_Fin_Application'];


$xml = new SimpleXMLElement('<Avis_Technique_Ventilation/>');
$xml->addChild('Titre_AT', $Titre_AT);
$xml->addChild('Titulaire', $Titulaire);
$xml->addChild('Code_Titulaire', $Code_Titulaire);
$xml->addChild('Industriel', $Industriel);
$xml->addChild('Code_Industriel', $Code_Industriel);
$xml->addChild('Num_AT', $Num_AT);
$Liste_AT_Anciens = $xml->addChild('Liste_AT_Ancien');

$i=0;
while (isset($Num_AT_Ancien[$i]))
{
    $Liste_AT_Anciens->addChild('Num_AT_Ancien',$Num_AT_Ancien[$i]);
    $i++;
}

$xml->addChild('Date_Application', $Date_Application);
$xml->addChild('Date_Fin_Application', $Date_Fin_Application);

if (isset($XML_Name)) {
    $xml->asXML("TEMP/".$XML_Name);
    echo "<a href='/TEMP/".$XML_Name."' download='".$XML_Name."'>Télécharger le fichier XML</a>";
}

elseif (isset($Titre_AT)) {
    $xml->asXML("TEMP/".$Titre_AT.".xml");
    echo "<a href='/TEMP/".$Titre_AT.".xml' download='".$Titre_AT.".xml'>Télécharger le fichier XML</a>";
}

else{
    $xml->asXML("TEMP/Avis.xml");
    echo "<a href='/TEMP/Avis.xml' download='Avis.xml'>Télécharger le fichier XML</a>";
}

// RAJOUTER UN COMPORTEMENT SI LE FICHIER EXISTE DEJA DANS TEMP
?>



