<h2 id='titleAT'></h2>
<form method='post' action='./controller/writeXML.php'>
    <input type='hidden' id='titleATForm' name='fileName'></input>
    <div class="container-fluid row">
        <div class="nav col-2">
            <div class="list-group" id="list-tab">
                <a class="list-group-item list-group-item-action active" id="list-generalites-list" data-bs-toggle="list" href="#list-generalites" aria-controls="list-generalites">Généralités</a>
                <a class="list-group-item list-group-item-action" id="list-ats-list" data-bs-toggle="list" href="#list-ats" aria-controls="list-ats">ATS</a>
                <a class="list-group-item list-group-item-action" id="list-equipements-list" data-bs-toggle="list" href="#list-equipements" aria-controls="list-equipements">Équipements</a>
            </div>
        </div>

        <div class="content col-10">
            <div class="tab-content" id="nav-tabContent">
                <!-- GENERALITES -->
                <div class="tab-pane fade show active" id="list-generalites" aria-labelledby="list-generalites-list">
                </div>
                <!-- ATS -->
                <div class="tab-pane fade" id="list-ats" aria-labelledby="list-ats-list">
                    <!-- ATS NAV -->
                    <ul class="nav nav-pills" id="nav_ats">
                    <li class="nav-item" id="addAT">
                        <button class="nav-link" id="addAT-tab" data-bs-toggle="tab" data-bs-target="#addAT-tab-pane" type="button" aria-controls="addAT-tab-pane" aria-selected="false">+</button>
                    </li>
                    </ul>  
                    <!-- ATS CONTENT -->
                    <div class="tab-content" id="at_content">
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
                        <div id='bouches-tab-pane' class='tab-pane fade active show'>
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
        </div>
    </div>
    <button class='btn btn-primary' type="submit">Enregistrer</button>
</form>