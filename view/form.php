<h2 id='titleAT'></h2>
<form method='post' action='./controller/writeXML.php'>
    <input type='hidden' id='titleATForm' name='fileName'></input>

    <div class="container-md row border border-dark mx-auto px-1 py-1 bg-secondary-subtle">
        <aside class="col-12 col-md-3 col-xl-2 px-0">
            <div class="list-group" id="list-tab">
                <a class="list-group-item list-group-item-action active border-bottom border-right border-dark text-center" id="list-generalites-list" data-bs-toggle="list" href="#list-generalites" aria-controls="list-generalites">Généralités</a>
                <a class="list-group-item list-group-item-action border-bottom border-right border-dark text-center" id="list-ats-list" data-bs-toggle="list" href="#list-ats" aria-controls="list-ats">Avis Techniques</a>
                <a class="list-group-item list-group-item-action border-bottom border-right border-dark text-center" id="list-equipements-list" data-bs-toggle="list" href="#list-equipements" aria-controls="list-equipements">Équipements</a>
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
                            <button type='button' id='bouches-tab' class='nav-link active' data-bs-toggle='tab' data-bs-target='#bouches-tab-pane'>Bouches</button>
                        </li>
                        <li class='nav-item'>
                            <button type='button' id='entrees-tab' class='nav-link' data-bs-toggle='tab' data-bs-target='#entrees-tab-pane'>Entrées</button>
                        </li>
                        <li class='nav-item'>
                            <button type='button' id='solutions-tab' class='nav-link' data-bs-toggle='tab' data-bs-target='#solutions-tab-pane'>Solutions</button>
                        </li>
                        <li class='nav-item'>
                            <button type='button' id='extracteurs-tab' class='nav-link' data-bs-toggle='tab' data-bs-target='#extracteurs-tab-pane'>Extracteurs</button>
                        </li>
                    </ul> 
                    <!-- EQUIPEMENTS CONTENT -->
                    <div class="tab-content" id="eqpmt_content">
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
            <button class='btn btn-primary float-end' type="submit">Télécharger le XML</button>
            <button class='btn btn-secondary float-end me-2' type="button">Sauvegarder</button>
        </section>
    </div>
    
</form>