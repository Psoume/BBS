liste des fichiers XML disponibles 

<ul>
<?php

//Lister tout
$scandir = scandir("./TEMP");
foreach($scandir as $fichier){
    if($fichier!='.'&& $fichier!='..')
    {
        echo '<button onclick=chooseXML("'.$fichier.'")>'.$fichier.'</button><br/>';
    }

}
?>
</ul>
