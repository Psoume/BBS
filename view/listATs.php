<div class="row justify-content-evenly">

    <div class="col-12 col-sm-6 col-lg-4 my-2">
        <div class="my-2">
        <h4>Fichiers XML disponibles :</h4>
        <p>Sélectionner un fichier puis l'action à effectuer.</p>
        </div>
        <div id="arborescence"></div>
        <div class="my-3">
            <button class="btn btn-sm btn-success mx-2" id="chooseXML" type="button">Traiter</button>
            <button class="btn btn-sm btn-secondary mx-2" id="createXMLFromFile" type="button">Créer à partir de </button> 
            <button class="btn btn-sm btn-secondary mx-2" id="renameXML" type="button">Renommer</button>
            <button class="btn btn-sm btn-danger mx-2" id="deleteXML" type="button">Effacer</button>
        </div>
        
    </div>

    <div class="col-12 col-sm-6 col-lg-4 my-2">
        <div class="my-5">
            <div class="row g-0">
                <div class="col-10 col-sm-8 col-xl-6">
                    <h4>Créer un nouveau fichier :</h4>
                </div>
                <div class="col-6 col-sm-2">
                    <button class="btn btn-success me-2" id="createXMLFromBlank" type="button" onclick="createXML()">Nouveau </button>
                </div>
            </div>
        </div>
        
        <div class="my-5">
            <h4>Ou importer un fichier :</h4>
            <form class="my-2" method="post" enctype="multipart/form-data" action = './controller/importXML.php'>
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


</div>