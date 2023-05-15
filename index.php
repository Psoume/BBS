<!DOCTYPE html>
<html>
<head>
<title>Saisie d'avis techniques de ventilation</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
</head>
<body>

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
<form id='XML_Form' method='post' action='#' enctype="multipart/form-data">
<label for="Xml_File">Si vous souhaitez compléter un fichier XML déjà existant, entrez-le ici :</label>
<input id="Xml_File" type="file" name="Xml_File" accept=".xml">
<input type="submit">
</form>


<form method='post' action='./writeXML.php'>
    <input hidden type="text" id="XML_Name" name="XML_name"/>
    <label for="Titre_AT">Titre_AT:</label></br>
    <input type='text' name="Titre_AT" id="Titre_AT"/></br>
    <label for="Titulaire">Titulaire:</label></br>
    <input type='text' name="Titulaire" id="Titulaire"/></br>
    <label for="Code_Titulaire">Code_Titulaire:</label></br>
    <input type='text' name="Code_Titulaire" id="Code_Titulaire"/></br>
    <label for="Industriel">Industriel:</label></br>
    <input type='text' name="Industriel" id="Industriel"/></br>
    <label for="Code_Industriel">Code_Industriel:</label></br>
    <input type='text' name="Code_Industriel" id="Code_Industriel"/></br>
    <label for="Num_AT">Num_AT:</label></br>
    <input type='text' name="Num_AT" id="Num_AT"/></br>
    <input type="submit">
</form>




<script type="text/javascript" src="script.js" ></script>
</body>
</html>


