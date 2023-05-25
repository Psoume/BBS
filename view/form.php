<h2 id='titleAT'></h2>
<form method='post' action='./writeXML.php'>
    <input type='hidden' id='titleATForm' name='fileName'></input>
    <div class="container">
        <div class="nav">
            <div class="list-group" id="list-tab">
                <a class="list-group-item list-group-item-action active" id="list-generalites-list" data-bs-toggle="list" href="#list-generalites" aria-controls="list-generalites">Généralités</a>
                <a class="list-group-item list-group-item-action" id="list-ats-list" data-bs-toggle="list" href="#list-ats" aria-controls="list-ats">ATS</a>
                <a class="list-group-item list-group-item-action" id="list-equipements-list" data-bs-toggle="list" href="#list-equipements" aria-controls="list-equipements">Équipements</a>
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
                        <li class='nav-item'>
                            <button type='button' id='bouches-tab' class='nav-link' data-bs-toggle='tab' data-bs-target='#bouches-tab-pane'>Bouches</button>
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
                        <div id='bouches-tab-pane' class='tab-pane fade'>
                        </div>
                        <div id='entrees-tab-pane' class='tab-pane fade'>
                        </div>
                        <div id='solutions-tab-pane' class='tab-pane fade'>
                            <table class='table table-sm table-bordered' id='table_Solution'>
                                <thead class='table-dark sticky-top top-0'>
                                    <tr>
                                        <th>Code_Solution</th>
                                        <th>Config 1</th>
                                        <th>Config 2</th>
                                        <th>Config 3</th>
                                    </tr>
                                </thead>
                                <tbody class='border-dark'>
                                    <tr>
                                        
                                        <td><input type='text' value='SOL EA45' name='Solution1_Code_Solution' id='Solution1_Code_Solution'></input></td>
                                        <td>
                                            <label for="Solution1_Config1_Libelle">Solution_Libelle</label>
                                            <input placeholder = 'Solution_Libelle' type='text' value='1 EA 45' name='Solution1_Config1_Libelle' id='Solution1_Config1_Libelle'></input>
                                            <label for="Solution1_Config1_Code">Code</label>
                                            <input type='text' value='EA45' name='Solution1_Config1_Code' id='Solution1_Config1_Code'></input>
                                            <label for="Solution1_Config1_Nombre">Nombre</label>
                                            <input type='number' value='1' name='Solution1_Config1_Nombre' id='Solution1_Config1_Nombre'></input>
                                        </td>
                                        <td>
                                            <label for="Solution1_Config1_Libelle">Solution_Libelle</label>
                                            <input placeholder = 'Solution_Libelle' type='text' value='1 EA 45' name='Solution1_Config1_Libelle' id='Solution1_Config1_Libelle'></input>
                                            <label for="Solution1_Config1_Code">Code</label>
                                            <input type='text' value='EA45' name='Solution1_Config1_Code' id='Solution1_Config1_Code'></input>
                                            <label for="Solution1_Config1_Nombre">Nombre</label>
                                            <input type='number' value='1' name='Solution1_Config1_Nombre' id='Solution1_Config1_Nombre'></input>
                                        </td>
                                        <td>
                                            <label for="Solution1_Config1_Libelle">Solution_Libelle</label>
                                            <input placeholder = 'Solution_Libelle' type='text' value='1 EA 45' name='Solution1_Config1_Libelle' id='Solution1_Config1_Libelle'></input>
                                            <label for="Solution1_Config1_Code">Code</label>
                                            <input type='text' value='EA45' name='Solution1_Config1_Code' id='Solution1_Config1_Code'></input>
                                            <label for="Solution1_Config1_Nombre">Nombre</label>
                                            <input type='number' value='1' name='Solution1_Config1_Nombre' id='Solution1_Config1_Nombre'></input>
                                        </td>
                                    </tr>
                                    <tr>
                                        
                                        <td><input type='text' value='SOL EA45' name='Solution1_Code_Solution' id='Solution1_Code_Solution'></input></td>
                                        <td>
                                            <label for="Solution1_Config1_Libelle">Solution_Libelle</label>
                                            <input placeholder = 'Solution_Libelle' type='text' value='1 EA 45' name='Solution1_Config1_Libelle' id='Solution1_Config1_Libelle'></input>
                                            <label for="Solution1_Config1_Code">Code</label>
                                            <input type='text' value='EA45' name='Solution1_Config1_Code' id='Solution1_Config1_Code'></input>
                                            <label for="Solution1_Config1_Nombre">Nombre</label>
                                            <input type='number' value='1' name='Solution1_Config1_Nombre' id='Solution1_Config1_Nombre'></input>
                                        </td>
                                        <td>
                                            <label for="Solution1_Config1_Libelle">Solution_Libelle</label>
                                            <input placeholder = 'Solution_Libelle' type='text' value='1 EA 45' name='Solution1_Config1_Libelle' id='Solution1_Config1_Libelle'></input>
                                            <label for="Solution1_Config1_Code">Code</label>
                                            <input type='text' value='EA45' name='Solution1_Config1_Code' id='Solution1_Config1_Code'></input>
                                            <label for="Solution1_Config1_Nombre">Nombre</label>
                                            <input type='number' value='1' name='Solution1_Config1_Nombre' id='Solution1_Config1_Nombre'></input>
                                        </td>
                                        <td>
                                            <label for="Solution1_Config1_Libelle">Solution_Libelle</label>
                                            <input placeholder = 'Solution_Libelle' type='text' value='1 EA 45' name='Solution1_Config1_Libelle' id='Solution1_Config1_Libelle'></input>
                                            <label for="Solution1_Config1_Code">Code</label>
                                            <input type='text' value='EA45' name='Solution1_Config1_Code' id='Solution1_Config1_Code'></input>
                                            <label for="Solution1_Config1_Nombre">Nombre</label>
                                            <input type='number' value='1' name='Solution1_Config1_Nombre' id='Solution1_Config1_Nombre'></input>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
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