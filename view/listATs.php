<h4>liste des fichiers XML disponibles :</h4>


<?php

//Lister tout
$scandir = scandir("./model/XML");
foreach($scandir as $fichier){
    if($fichier!='.'&& $fichier!='..')
    {
        echo '<button id="deleteXML" onclick=deleteXML("'.$fichier.'") type="button" class="btn btn-danger btn-sm me-3 rounded-pill">Effacer</button>';
        echo '<button id="chooseXML" onclick=chooseXML("'.$fichier.'") type="button" class="btn btn-link">'.$fichier.'</button><br/>';
    }
}
?>

<h4>Créer un nouveau fichier :</h4>

<label for='XML_name'>Nom du nouveau fichier :</label>
<input style='display:inline;' type="text" id='XML_name' name="XML_name" placeholder="exemple.xml"><br/>
<button id="createXML_Blank" onclick='createXML(true)' type="button" class="btn btn-success ">Créer</button>

<h4>Ou créer à partir d'un fichier existant :</h4>

<select id='createXMLFromFile'>
    <?php
    foreach($scandir as $fichier){
    if($fichier!='.'&& $fichier!='..')
    {
        echo '<option value='.$fichier.'>'.$fichier.'</option>';
    }
    }
?>
</select>
<button id="createXML_File" onclick='createXML(false)' type="button" class="btn btn-success ">Créer</button>

