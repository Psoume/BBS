
    <form method='post' action='./writeXML.php'>
        <div class="container">
            <div class="nav">
                <div class="list-group" id="list-tab">
                    <a class="list-group-item list-group-item-action active" id="list-generalites-list" data-bs-toggle="list" href="#list-generalites" aria-controls="list-generalites">Généralités</a>
                    <a class="list-group-item list-group-item-action" id="list-ats-list" data-bs-toggle="list" href="#list-ats" aria-controls="list-ats">ATS</a>
                    <a class="list-group-item list-group-item-action" id="list-equipements-list" data-bs-toggle="list" href="#list-equipements" aria-controls="list-equipements">Équipements</a>
                    <a class="list-group-item list-group-item-action" id="list-puissance-extracteurs-list" data-bs-toggle="list" href="#list-puissance-extracteurs" aria-controls="list-puissance-extracteurs">Puissances des extracteurs</a>
                </div>
            </div>

            <div class="content">
                <div class="tab-content" id="nav-tabContent">
                    <!-- GENERALITES -->
                    <div class="tab-pane fade show active" id="list-generalites" aria-labelledby="list-generalites-list">
                    </div>
                    <!-- ATS -->
                    <div class="tab-pane fade" id="list-ats" aria-labelledby="list-ats-list">
                      <!-- ATS NAV -->
                      <ul class="nav nav-pills">
                      <li class="nav-item">
                        <button class="nav-link active" id="at_1-tab" data-bs-toggle="tab" data-bs-target="#at_1-tab-pane" type="button" aria-controls="at_1-tab-pane" aria-selected="true">At_1</button>
                      </li>
                      <li class="nav-item">
                        <button class="nav-link" id="addAT-tab" data-bs-toggle="tab" data-bs-target="#addAT-tab-pane" type="button" aria-controls="addAT-tab-pane" aria-selected="false">+</button>
                      </li>
                      </ul>  
                      <!-- ATS CONTENT -->
                      <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="at_1-tab-pane" aria-labelledby="at_1-tab" tabindex="0">...</div>
                        <div class="tab-pane fade" id="addAT-tab-pane" aria-labelledby="addAT-tab" tabindex="0">...</div>
                      </div>
                    </div>
                    <!-- EQUIPEMENTS -->
                    <div class="tab-pane fade" id="list-equipements" aria-labelledby="list-equipements-list">...</div>
                    <!-- PUISSANCES EXTRACTEURS -->
                    <div class="tab-pane fade" id="list-puissance-extracteurs" aria-labelledby="list-puissance-extracteurs-list">...</div>
                </div>
            </div>
        </div>
        <input value='Enregistrer' type="submit">
    </form>