<!DOCTYPE html>
<html>

<head>
    <title>Saisie d'avis techniques de ventilation</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="./style.css">
</head>

<body>

    <h1>Saisie d'avis techniques de ventilation</h1>

    <form id='XML_Form' method='post' action='#' enctype="multipart/form-data">
        <label for="Xml_File">Si vous souhaitez compléter un fichier XML déjà existant, entrez-le ici :</label>
        <input id="Xml_File" type="file" name="Xml_File" accept=".xml">
        <input type="submit" value="Pré-remplir">
    </form>

    <form method='post' action='./writeXML.php'>
        <div class="container">
            <div class="nav">
                <div class="list-group" id="list-tab" role="tablist">
                    <a class="list-group-item list-group-item-action active" id="list-home-list" data-bs-toggle="list" href="#list-home" role="tab" aria-controls="list-home">Généralités</a>
                    <a class="list-group-item list-group-item-action" id="list-profile-list" data-bs-toggle="list" href="#list-profile" role="tab" aria-controls="list-profile">ATS</a>
                    <a class="list-group-item list-group-item-action" id="list-messages-list" data-bs-toggle="list" href="#list-messages" role="tab" aria-controls="list-messages">Équipements</a>
                    <a class="list-group-item list-group-item-action" id="list-settings-list" data-bs-toggle="list" href="#list-settings" role="tab" aria-controls="list-settings">Puissances des extracteurs</a>
                </div>
            </div>

            <div class="content">
                <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">
                        
                        <label for="Titre_AT">Titre_AT:</label></br>
                        <input type='text' name="Titre_AT" id="Titre_AT" /></br>
                        <label for="Titulaire">Titulaire:</label></br>
                        <input type='text' name="Titulaire" id="Titulaire" /></br>
                        <label for="Code_Titulaire">Code_Titulaire:</label></br>
                        <input type='text' name="Code_Titulaire" id="Code_Titulaire" /></br>
                        <label for="Industriel">Industriel:</label></br>
                        <input type='text' name="Industriel" id="Industriel" /></br>
                        <label for="Code_Industriel">Code_Industriel:</label></br>
                        <input type='text' name="Code_Industriel" id="Code_Industriel" /></br>
                        <label for="Num_AT">Num_AT:</label></br>
                        <input type='text' name="Num_AT" id="Num_AT" /></br>

                        <label for="Num_AT_Ancien">Num_AT_Anciens :</label><br/>    
                        <input type='text' name="Num_AT_Ancien[]" id="Num_AT_Ancien" /></br>
                        <div id='NumATAncienField'></div>
                        <button type='button' href='#'  onclick="addField('Num_AT_Ancien[]')">+</button></br>

                        <label for="Date_Application">Date_Application:</label></br>
                        <input type='text' name="Date_Application" id="Date_Application" /></br>
                        <label for="Date_Fin_Application">Date_Fin_Application:</label></br>
                        <input type='text' name="Date_Fin_Application" id="Date_Fin_Application" /></br>
                        <label for="Usage_EA">Usage_EA:</label></br>
                        <input type='text' name="Usage_EA" id="Usage_EA" /></br>
                        <span>Usages :</span>
                        <input class="form-check-input" type="checkbox" value="Individuel" name="Individuel">
                        <label class="form-check-label" for="Individuel">Individuel</label>
                        <input class="form-check-input" type="checkbox" valueCollectif name="Collectif">
                        <label class="form-check-label" for="Collectif">Collectif</label>
                        <input class="form-check-input" type="checkbox" value="Hotel" name="Hotel">
                        <label class="form-check-label" for="Hotel">Hotel</label><br/>
                        <span>Caractéristiques :</span>
                        <input class="form-check-input" type="checkbox" value="Double_Flux" name="Double_Flux">
                        <label class="form-check-label" for="Double_Flux">Double_Flux</label>
                        <input class="form-check-input" type="checkbox" value="Autoreglable" name="Autoreglable">
                        <label class="form-check-label" for="Autoreglable">Autoréglable</label>
                        <input class="form-check-input" type="checkbox" value="Hygroreglable" name="Hygroreglable">
                        <label class="form-check-label" for="Hygroreglable">Hygroréglable</label>
                        <input class="form-check-input" type="checkbox" value="Basse_Pression" name="Basse_Pression">
                        <label class="form-check-label" for="Basse_Pression">Basse_Pression</label><br/>
                        <label for="Type_extraction">Type_extraction:</label></br>
                        <input type='text' name="Type_extraction" /></br>
                        <label for="NB_AT">NB_AT:</label></br>
                        <input type='number' name="NB_AT" /></br>
                    </div>
                    <div class="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">
                        <div id='ATS'>

                        </div>
                    </div>
                    <div class="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">...</div>
                    <div class="tab-pane fade" id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">...</div>
                </div>
            </div>
        </div>
        <input value='Enregistrer' type="submit">
    </form>



    <script type="text/javascript" src="script.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js"></script>

</body>

</html>