<a href="./index.php" class="btn btn-outline-dark float-end me-5">Revenir à l'accueil</a>
<form method='post' action='./controller/writeXML.php'>
    <h2 class="mx-5" id='titleAT'><i class="bi bi-pencil-square" onclick='editTitleAT()'></i></h2>
    <div class='row w-50' hidden='true' id='titleATInputDiv'>
        <div class="col"><input id='titleATInput' class=' form-control' name='fileName'></input></div>
        <div class="col">
            <button onclick='saveTitleAT()' type='button' class='btn btn-success'>ok</button>
            <button onclick='resetTitleAT()' type='button' class='btn btn-danger'>X</button>
        </div>
    </div>

    <div class="container-md row border border-dark mx-auto my-5 px-1 py-1 bg-secondary-subtle">
        <aside class="col-12 col-md-3 col-xl-2 px-0">
            <div class="list-group" id="list-tab">
                <a class="list-group-item list-group-item-action active border-bottom border-right border-dark text-center" id="list-generalites-list" data-bs-toggle="list" href="#list-generalites" aria-controls="list-generalites">Généralités</a>
                <a class="list-group-item list-group-item-action border-bottom border-right border-dark text-center" id="list-equipements-list" data-bs-toggle="list" href="#list-equipements" aria-controls="list-equipements">Équipements</a>
                <a class="list-group-item list-group-item-action border-bottom border-right border-dark text-center" id="list-ats-list" data-bs-toggle="list" href="#list-ats" aria-controls="list-ats">Avis Techniques</a>

            </div>
        </aside>

        <section class="col col-12 col-md-9 col-xl-10 ps-5{sm}">
            <div class="tab-content" id="nav-tabContent">

                <!-- GENERALITES -->
                <div class="tab-pane fade show active mx-2 my-5" id="list-generalites" aria-labelledby="list-generalites-list"></div>
                <!-- ATS -->
                <div class="tab-pane fade" id="list-ats" aria-labelledby="list-ats-list">
                    <!-- ATS NAV -->
                    <ul class="nav nav-pills my-3" id="ATS_nav">
                    <li class="nav-item" id="addAT">
                        <button class="nav-link border border-dark btn" id="addAT-button" type="button" onclick="addAT('ATS_nav','addAT','ATS_content','AT')">+</button>
                    </li>
                    </ul>  
                    <!-- ATS CONTENT -->
                    <div class="tab-content" id="ATS_content">

                    </div>
                </div>
                <!-- EQUIPEMENTS -->
                <div class="tab-pane fade" id="list-equipements" aria-labelledby="list-equipements-list">
                    <!--EQUIPEMENTS NAV -->
                    <ul class="nav nav-pills" id="nav_eqpmt">
                        <li class='nav-item '>
                            <button type='button' id='bouches-tab' class='nav-link active border border-dark mx-2' data-bs-toggle='tab' data-bs-target='#bouches-tab-pane'>Bouches</button>
                        </li>
                        <li class='nav-item'>
                            <button type='button' id='entrees-tab' class='nav-link border border-dark mx-2' data-bs-toggle='tab' data-bs-target='#entrees-tab-pane'>Entrées</button>
                        </li>
                        <li class='nav-item'>
                            <button type='button' id='solutions-tab' class='nav-link border border-dark mx-2' data-bs-toggle='tab' data-bs-target='#solutions-tab-pane'>Solutions</button>
                        </li>
                        <li class='nav-item'>
                            <button type='button' id='extracteurs-tab' class='nav-link border border-dark mx-2' data-bs-toggle='tab' data-bs-target='#extracteurs-tab-pane'>Extracteurs</button>
                        </li>
                    </ul> 
                    <!-- EQUIPEMENTS CONTENT -->
                    <div class="tab-content my-2" id="eqpmt_content">
                        <div id='bouches-tab-pane' class='tab-pane fade active show '>
                        </div>
                        <div id='entrees-tab-pane' class='tab-pane fade'>
                        </div>
                        <div id='solutions-tab-pane' class='tab-pane fade'>
                        </div>
                        <div id='extracteurs-tab-pane' class='tab-pane fade'>
                        </div>
                    </div>
                </div>    
            </div>
            <input formaction='./controller/writeXML.php?return=false' class='btn btn-primary float-end' type="submit" value="Télécharger le XML"></input>
            <input formaction='./controller/writeXML.php?return=true' class='btn btn-secondary float-end me-2' type="submit" value="Sauvegarder"></input>
        </section>
    </div>
    
</form>