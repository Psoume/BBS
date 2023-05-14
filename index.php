<?php
$xml=simplexml_load_file("./XML/03 - AT_14-5_17-2279.xml") or die("Error: Cannot create object");
echo $xml->Avis_Technique_Ventilation . "<br>";
echo $xml->Titre_AT . "<br>";
echo $xml->Titulaire . "<br>";
echo $xml->Code_Titulaire;
echo "coucou";
?> 