<form method='post' action='./writeXML.php'>
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
                            <table class='table table-sm table-bordered' id='table_bouches'>
                                <thead class='table-dark sticky-top top-0'>
                                    <tr>
                                        <th>Code</th>
                                        <th>Références</th>
                                        <th>Qmin</th>
                                        <th>QminF</th>
                                        <th>QminLimite</th>
                                        <th>QmaxF</th>
                                        <th>QmaxLimite</th>
                                    </tr>
                                </thead>
                                <tbody class='border-dark'>
                                    <tr>
                                        <th scope='row'><input type='text' value='HC02' name='Bouche1_Code' id='Bouche1_Code'></input></th>
                                        <td>
                                            <input type='text' value='BHC1' name='Bouche1_Reference_1' id='Bouche1_Reference_1'></input>
                                            <input type='text' value='BHC2' name='Bouche1_Reference_2' id='Bouche1_Reference_2'></input>
                                            <button type='button'>+</button>
                                            
                                        </td>
                                        <td><input type='number' value='10' name='Bouche1_Qmin' id='Bouche1_Qmin'></input></td>
                                        <td><input type='number' value='10' name='Bouche1_QminF' id='Bouche1_QminF'></input></td>
                                        <td><input type='number' value='10' name='Bouche1_QminLimite' id='Bouche1_QminLimite'></input></td>
                                        <td><input type='number' value='10' name='Bouche1_QmaxF' id='Bouche1_QmaxF'></input></td>
                                        <td><input type='number' value='10' name='Bouche1_QmaxLimite' id='Bouche1_QmaxLimite'></input></td>
                                    </tr>
                                </tbody>
                            </table>
                            <button type='button' class='btn btn-dark' onclick="newEquipement('Bouche')">Ajouter</button>
                        </div>
                        <div id='entrees-tab-pane' class='tab-pane fade'>
                            <table class='table table-sm table-bordered' id='table_entrees'>
                                <thead class='table-dark sticky-top top-0'>
                                    <tr>
                                        <th>Code</th>
                                        <th>Références</th>
                                        <th>EA_min</th>
                                        <th>EA_max</th>
                                    </tr>
                                </thead>
                                <tbody class='border-dark'>
                                    <tr>
                                        <th scope='row'><input type='text' value='EA15' name='Entree1_Code' id='Entree1_Code'></input></th>
                                        <td>
                                            <input type='text' value='BHC1' name='Entree1_Reference_1' id='Entree1_Reference_1'></input>
                                            <input type='text' value='BHC2' name='Entree1_Reference_2' id='Entree1_Reference_2'></input>
                                            <input type='text' value='BHC2' name='Entree1_Reference_3' id='Entree1_Reference_3'></input>
                                            <input type='text' value='BHC2' name='Entree1_Reference_4' id='Entree1_Reference_4'></input>
                                            <input type='text' value='BHC2' name='Entree1_Reference_5' id='Entree1_Reference_5'></input>
                                            <input type='text' value='BHC2' name='Entree1_Reference_6' id='Entree1_Reference_6'></input>
                                            <button type='button'>+</button>
                                            
                                        </td>
                                        <td><input type='number' value='HC02' name='Entree1_EA_min' id='Entree1_EA_min'></input></td>
                                        <td><input type='number' value='HC02' name='Entree1_EA_max' id='Entree1_EA_max'></input></td>

                                    </tr>
                                </tbody>
                            </table>
                            <button type='button' class='btn btn-dark' onclick="newEquipement('Entree')">Ajouter</button>
                        </div>
                        <div id='solutions-tab-pane' class='tab-pane fade'>
                            <table class='table table-sm table-bordered' id='table_solutions'>
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
                            <button type='button' class='btn btn-dark' onclick="newEquipement('Solution')">Ajouter</button>
                        </div>
                        <div id='extracteurs-tab-pane' class='tab-pane fade'>
                            <table class='table table-sm table-bordered' id='table_extracteurs'>
                                <thead class='table-dark sticky-top top-0'>
                                    <tr>
                                        <th>Références</th>
                                        <th>N_Cdep</th>
                                        <th>Libelle_Cdep</th>
                                    </tr>
                                </thead>
                                <tbody class='border-dark'>
                                    <tr>
                                        <td>
                                            <input type='text' value='BHC1' name='Extracteur1_Reference_1' id='Extracteur1_Reference_1'></input>
                                            <input type='text' value='BHC2' name='Extracteur1_Reference_2' id='Extracteur1_Reference_2'></input>
                                            <button type='button'>+</button>
                                        </td>
                                        <td><input type='number' value='HC02' name='Extracteur1_N_Cdep' id='Extracteur1_N_Cdep'></input></td>
                                        <td><input type='number' value='HC02' name='Extracteur1_Libelle_Cdep' id='Extracteur1_Libelle_Cdep'></input></td>
                                    </tr>
                                </tbody>
                            </table>
                            <button type='button' class='btn btn-dark' onclick="newEquipement('Extracteur')">Ajouter</button>
                        </div>
                    </div>
                </div>    
            </div>
        </div>
    </div>
    <input value='Enregistrer' type="submit">
</form>

