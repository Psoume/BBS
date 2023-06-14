<div class="mx-2 my-5">
<h4>Fichiers XML disponibles :</h4>

<?php

//Lister tout
$scandir = scandir("./data/XML");
foreach($scandir as $fichier){
    if($fichier!='.'&& $fichier!='..')
    {   echo "<div class='ms-5'>";
        echo '<button id="deleteXML" onclick=deleteXML("'.$fichier.'") type="button" class="btn btn-danger btn-sm me-3 rounded-pill">Effacer</button>';
        echo '<button id="chooseXML" onclick=chooseXML("'.$fichier.'") type="button" class="btn btn-link">'.$fichier.'</button><br/>';
        echo '</div>';
    }
}
?>
</div>


<div class="row mx-2 my-5">

    <div class="col">
        <h4>Créer un nouveau fichier :</h4>       

        <div class="row">
            <div class="col-10 col-sm-8 col-xl-6">        
                <input class='form-control' type="text" id='XML_name' name="XML_name" placeholder="exemple.xml">
            </div>
            <div class="col-6 col-sm-2">
                <button id="createXML_Blank" onclick='createXML(true)' type="button" class="btn btn-success">Créer</button>
            </div>
        </div>
    </div>

    <div class="col">
    <h4>Créer à partir d'un fichier existant :</h4>
        <div class="row">
            <div class="col-10 col-sm-8 col-xl-6">
                <select class=' form-select' id='createXMLFromFile'>
                <option selected>Choisir un fichier</option>
                <?php
                foreach($scandir as $fichier){
                if($fichier!='.'&& $fichier!='..')
                {
                    echo '<option value='.$fichier.'>'.$fichier.'</option>';
                }
                }
                ?>
            </select>
        </div>
            <div class="col-6 col-sm-2">
                <button id="createXML_File" onclick='createXML(false)' type="button" class="btn btn-success ">Créer</button>
            </div>
        </div>

        

        <form class="mt-5" method="post" enctype="multipart/form-data" action = './controller/importXML.php'>
        <label class="form-label" for="importXML">Ou importer un fichier :</label>
            <div class="row">
                <div class="col-10 col-sm-8 col-xl-6">
                    <input required class="form-control" type="file" id="importXML" name="importXML" accept="application/xml">
                </div>
                <div class="col-6 col-sm-2">
                    <input class='btn btn-success border-0 float-start' type='submit' value='Importer'>
                </div>
            </div>
        </form>
    </div>
</div>


