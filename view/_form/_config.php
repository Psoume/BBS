<?php
$nbrPiecesHumides = $_POST['nbrPiecesHumides'];
$nbrPiecesSeches = $_POST['nbrPiecesSeches'];
$indexAT = $_POST['indexAT'];
$indexConfig = $_POST['indexConfig'];
?>


<div class="row mx-auto">
    <div class='col-12 col-sm-6 px-4'>
        <label for="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Type_Logement" class="form-label">Type de logement :</label>
        <div class="input-group pe-5">
            <span class="input-group-text">T</span>
            <input onchange="updateConfigName(<?php echo $indexAT.','.$indexConfig; ?>)" type="text" name="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Type_Logement" id="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Type_Logement" class="form-control">
        </div>

        <fieldset class='mt-4'>
            <legend>Singularités :</legend>
            <div class="form-check">
                <label for="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Config_Optimisee" class="form-check-label">Configuration optimisée</label>
                <input onchange="updateConfigName(<?php echo $indexAT.','.$indexConfig; ?>)" type="checkbox" name="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Config_Optimisee" id="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Config_Optimisee" class="form-check-input" value="Config_Optimisee">
            </div>
            <div class="form-check">
                <label for="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Changement_Bouche" class="form-check-label">Changement de Bouche</label>
                <input type="checkbox" name="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Changement_Bouche" id="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Changement_Bouche" class="form-check-input" value="Changement_Bouche">
            </div>
        </fieldset>
    </div>

    <div class='col-12 col-sm-6 px-4'>
        <div id="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_CdepField">
            <label for="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Cdep_1">Cdeps :</label>
            <input class='form-control' type="text" id="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Cdep_1" name="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Cdep_1" >
        </div>
        <button type='button' class="btn btn-light border border-dark mt-1 btn-sm" onclick="deleteInput('AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_CdepField',2)" >Supprimer le dernier</button>
        <button type='button' class=" d-block btn btn-primary border border-dark my-1 float-end" onclick="addField('AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Cdep','number','AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_CdepField')">+</button>
    </div>

    <div class='col-12 col-sm-6 px-4 mt-4'>
        <legend for="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Singularite_EA">Singularités Entrées d'Air :</legend>
        <select name="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Singularite_EA" id="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Singularite_EA" class="form-select">
            <option value="" selected>Choisir un type d'entrées d'air</option>
            <option value="Sing_EA_Fixe">Fixes</option>
            <option value="Sing_EA_Autoréglable">Autoréglables</option>
            <option value="Sing_EA_Mixte">Mixtes</option>
            <option value="Sing_EA_Sans">Sans</option>
        </select>
    </div>

    <div class='col-12 col-sm-6 px-4 mt-4'>
        <div class='row'>
            <div class="col-12 col-lg-12">
                <label for="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Qv_Rep" class="form-label">Qv Rep :</label>
                <div class="input-group">
                    <input type="number" step="0.01" name="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Qv_Rep" id="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Qv_Rep" class="form-control" step="any">
                    <span class="input-group-text">m<sup>3</sup>/h</span>
                </div>
            </div>
            <div class="col-12 col-lg-6">
                <label for="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Smea_Existant" class="form-label">Smea Existant :</label>
                <div class="input-group">
                    <input type="number" step="0.01" name="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Smea_Existant" id="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Smea_Existant" class="form-control" step="any">
                    <span class="input-group-text">m<sup>3</sup>/h</span>
                </div>
            </div>
            <div class="col-12 col-lg-6">
                <label for="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Smea_RT2012" class="form-label">Smea RT2012 :</label>
                <div class="input-group">
                    <input type="number" step="0.01" name="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Smea_RT2012" id="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Smea_RT2012" class="form-control" step="any">
                    <span class="input-group-text">m<sup>3</sup>/h</span>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-lg-6">
                <label for="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Module_1" class="form-label">Module 1 :</label>
                <div class="input-group">
                    <input type="number" step="0.01" name="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Module_1" id="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Module_1" class="form-control" step="any">
                    <span class="input-group-text">m<sup>3</sup>/h</span>
                </div>
            </div>
            <div class="col-12 col-lg-6">
                <label for="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Module_2" class="form-label">Module 2 :</label>
                <div class="input-group">
                    <input type="number" step="0.01" name="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Module_2" id="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Module_2" class="form-control" step="any">
                    <span class="input-group-text">m<sup>3</sup>/h</span>
                </div>
            </div>
        </div>        
    </div>


    <div class='col-12 col-sm-5 px-2 mt-4'>
        <table class='table table-sm table-bordered border-dark'>
            <thead class='table-dark'>
                <tr>
                    <th></th>
                    <th scope='col'>Nombre de pièces humides</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <label for="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Nb_Sdb_WC" class="form-label">Salles de bain avec WC</label>
                    </td>
                    <td>
                        <input type="number" name="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Nb_Sdb_WC" id="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Nb_Sdb_WC" class="form-control" step="any">
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Nb_Sdb" class="form-label">Salles de bain sans WC</label>
                    </td>
                    <td>
                        <input type="number" name="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Nb_Sdb" id="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Nb_Sdb" class="form-control" step="any">
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Nb_WC" class="form-label">WC</label>
                    </td>
                    <td>
                        <input type="number" name="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Nb_WC" id="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Nb_WC" class="form-control" step="any">
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Nb_Sde" class="form-label">Salle d'eau</label>
                    </td>
                    <td>
                        <input type="number" name="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Nb_Sde" id="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Nb_Sde" class="form-control" step="any">
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
        
    <div class='col-12 col-sm-7 px-2 mt-4'>
        <table class='table table-sm table-bordered border-dark'>
            <thead class='table-dark'>
                <tr>
                    <th></th>
                    <th scope='col'>Bouches supplémentaires (m<sup>3</sup>/h)</th>
                    <th scope='col'>Entrées d'air (m<sup>3</sup>/h)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <label for="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Qsupp_Sdb_WC" class="form-label">Salle de bain avec WC</label>
                    </td>
                    <td>
                        <input type="number" step="0.01" name="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Qsupp_Sdb_WC" id="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Qsupp_Sdb_WC" class="form-control" step="any">
                    </td>
                    <td>
                        <input type="number" step="0.01" name="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_SmeaMoins_Sdb_WC" id="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_SmeaMoins_Sdb_WC" class="form-control" step="any">
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Qsupp_Sdb" class="form-label">Salle de bain sans WC</label>
                    </td>
                    <td>
                        <input type="number" step="0.01" name="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Qsupp_Sdb" id="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Qsupp_Sdb" class="form-control" step="any">
                    </td>
                    <td>
                        <input type="number" step="0.01" name="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_SmeaMoins_Sdb" id="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_SmeaMoins_Sdb" class="form-control" step="any">
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Qsupp_WC" class="form-label">WC</label>
                    </td>
                    <td>
                        <input type="number" step="0.01" name="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Qsupp_WC" id="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Qsupp_WC" class="form-control" step="any">
                    </td>
                    <td>
                        <input type="number" step="0.01" name="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_SmeaMoins_WC" id="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_SmeaMoins_WC" class="form-control" step="any">
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Qsupp_Cellier" class="form-label">Cellier</label>
                    </td>
                    <td>
                        <input type="number" step="0.01" name="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Qsupp_Cellier" id="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Qsupp_Cellier" class="form-control" step="any">
                    </td>
                    <td>
                        <input type="number" step="0.01" name="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_SmeaMoins_Cellier" id="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_SmeaMoins_Cellier" class="form-control" step="any">
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>


<h3>Pièces Humides</h3>
<table class="table table-sm table-bordered" id="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Humide">
    <thead class="table-dark">
        <tr>
            <th>Pièce</th>
            <th>Code</th>
            <th>Qvrep (m<sup>3</sup>/h)</th>
        </tr>
    </thead>
    <tbody class="border-dark" id="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Humide_tbody">
    <?php 

        for($i=1;$i<=$nbrPiecesHumides;$i++) 
        {
            include'./_config_roomH.php';
        }
    ?>
    </tbody>
</table>
<button type="button" class="btn btn-dark" onclick="addRoom('Humide','<?php echo $indexAT; ?>','<?php echo $indexConfig; ?>')">Ajouter une pièce humide</button>
<button type='button' class="btn btn-light border border-dark" onclick="deleteInput('AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Humide_tbody',0)" >Supprimer la dernière pièce</button>

<h3>Pièces Sèches</h3>
<table class="table table-sm table-bordered" id="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Sec">
    <thead class="table-dark">
        <tr>
            <th>Pièce</th>
            <th>Code</th>
        </tr>
    </thead>
    <tbody class="border-dark" id="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Sec_tbody">
        <?php 
        for($i=1;$i<=$nbrPiecesSeches;$i++) 
        {
            include'./_config_roomS.php';
        }
        ?>
    </tbody>
</table>
<button type="button" class="btn btn-dark" onclick="addRoom('Sec','<?php echo $indexAT; ?>','<?php echo $indexConfig; ?>')">Ajouter une pièce sèche</button>
<button type='button' class="btn btn-light border border-dark" onclick="deleteInput('AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Sec_tbody',0)" >Supprimer la dernière pièce</button>
