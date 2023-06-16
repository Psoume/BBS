<div class="mx-2 my-2">
<h4>Fichiers XML disponibles :</h4>
<p>Sélectionner le fichier puis l'action à effectuer.</p>
</div>




<div class="row">
    <div class="col">
        <div id="arborescence"></div>
    </div>
    <div class="col">
        <form class="mt-5" method="post" enctype="multipart/form-data" action = './controller/importXML.php'>
            <label class="form-label" for="importXML">Importer un fichier :</label>
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

<button class="btn btn-sm btn-primary mx-2" id="chooseXML" type="button">Modifier</button>
<button class="btn btn-sm btn-success ms-2" id="createXMLFromFile" type="button">Créer à partir de </button> ou <button class="btn btn-sm btn-success me-2" id="createXMLFromBlank" type="button" onclick="createXML()">Créer un fichier </button>
<button class="btn btn-sm btn-danger mx-2" id="deleteXML" type="button">Effacer</button>




