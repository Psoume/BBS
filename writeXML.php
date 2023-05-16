<?php


$Titre_AT = $_POST['Titre_AT'];
$Titulaire = $_POST['Titulaire'];
$Code_Titulaire = $_POST['Code_Titulaire'];
$Industriel = $_POST['Industriel'];
$Code_Industriel = $_POST['Code_Industriel'];
$Num_AT = $_POST['Num_AT'];
$Num_AT_Ancien = $_POST['Num_AT_Ancien']; //!\ Multiple
$Date_Application = $_POST['Date_Application'];
$Usage_EA = $_POST['Usage_EA'];
$Date_Fin_Application = $_POST['Date_Fin_Application'];
$checkboxesNames=['Collectif', 'Individuel', 'Hotel', 'Double_Flux', 'Autoreglable', 'Hygroreglable', 'Basse_Pression'];
$checkboxesValues=[];
foreach($checkboxesNames as $cbn)
{
    if(isset($_POST[$cbn]))
    {$checkboxesValues[$cbn]= 'true';}
    else{$checkboxesValues[$cbn]='false';}
}

$Type_extraction = $_POST['Type_extraction'];
$NB_AT = $_POST['NB_AT'];



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
$xml->addChild('Usage_EA', $Usage_EA);

$Usages = $xml->addChild('Usages');
$Usages->addChild('Collectif',$checkboxesValues['Collectif']);
$Usages->addChild('Individuel',$checkboxesValues['Individuel']);
$Usages->addChild('Hotel',$checkboxesValues['Hotel']);

$Caracteristiques = $xml->addChild('Caracteristiques');
$Caracteristiques->addChild('Double_Flux',$checkboxesValues['Double_Flux']);
$Caracteristiques->addChild('Autoreglable',$checkboxesValues['Autoreglable']);
$Caracteristiques->addChild('Hygroreglable',$checkboxesValues['Hygroreglable']);
$Caracteristiques->addChild('Basse_Pression',$checkboxesValues['Basse_Pression']);
$Caracteristiques->addChild('Type_extraction',$Type_extraction);

$xml->addChild('NB_AT', $NB_AT);


if (isset($Titre_AT)) {
    $xml->asXML("TEMP/".$Titre_AT.".xml");
    echo "<a href='/TEMP/".$Titre_AT.".xml' download='".$Titre_AT.".xml'>Télécharger le fichier XML</a>";
}

else{
    $xml->asXML("TEMP/Avis.xml");
    echo "<a href='/TEMP/Avis.xml' download='Avis.xml'>Télécharger le fichier XML</a>";
}

// RAJOUTER UN COMPORTEMENT SI LE FICHIER EXISTE DEJA DANS TEMP
?>

<a href='./index.php'>Revenir à l'accueil</a>

