<h4>liste des fichiers XML disponibles :</h4>


<?php

//Lister tout
$scandir = scandir("./TEMP");
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
<button id="createXML" onclick=createXML() type="button" class="btn btn-success ">Créer</button>



</ul>
