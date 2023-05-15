<?php
// EXEMPLE AVEC SIMPLE XML
// $xml=simplexml_load_file("./XML/03 - AT_14-5_17-2279.xml") or die("Error: Cannot create object");
// echo $xml->Avis_Technique_Ventilation . "</br>";
// echo $xml->Titre_AT . "</br>";
// echo $xml->Titulaire . "</br>";
// echo $xml->Liste_AT_Ancien->Num_AT_Ancien;
// echo "coucou";

// AVEX XML READER
// $xml = new XMLReader();
// $xml->open("./XML/03 - AT_14-5_17-2279.xml");

// while ($xml->read()) {
//     if ($xml->name == "Titulaire") {
//         print $xml->readInnerXML() ;
//         $xml->next();
//     }
// }
?> 
<form method='post' action='handlerXML.php'>
    <label for="Titre_AT">Titre_AT:</label></br>
    <input type='text' name="Titre_AT"/></br>
    <input type="submit">
</form>


<form method='post' action='writeXML.php'>
    <label for="Titre_AT">Titre_AT:</label></br>
    <input type='text' name="Titre_AT"/></br>
    <label for="Titulaire">Titulaire:</label></br>
    <input type='text' name="Titulaire"/></br>
    <label for="Code_Titulaire">Code_Titulaire:</label></br>
    <input type='text' name="Code_Titulaire"/></br>
    <label for="Industriel">Industriel:</label></br>
    <input type='text' name="Industriel"/></br>
    <label for="Code_Industriel">Code_Industriel:</label></br>
    <input type='text' name="Code_Industriel"/></br>
    <label for="Num_AT">Num_AT:</label></br>
    <input type='text' name="Num_AT"/></br>
    <input type="submit">
</form>