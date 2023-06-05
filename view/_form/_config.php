<?php
$nbrPiecesHumides = $_POST['nbrPiecesHumides'];
$nbrPiecesSeches = $_POST['nbrPiecesSeches'];
$indexAT = $_POST['indexAT'];
$indexConfig = $_POST['indexConfig'];
?>


<label for="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Type_Logement" class="form-label">Type_Logement</label>
<div class="input-group">
    <span class="input-group-text">unite</span>
    <input type="text" name="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Type_Logement" id="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Type_Logement" class="form-control">
</div>
<label for="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Config_Optimisee" class="form-check-label">Config_Optimisee</label>
<div class="input-group">
    <span class="input-group-text">unite</span>
    <input type="checkbox" name="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Config_Optimisee" id="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Config_Optimisee" class="form-check-input" value="Config_Optimisee">
</div>
<label for="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Changement_Bouche" class="form-check-label">Changement_Bouche</label>
<div class="input-group">
    <span class="input-group-text">unite</span>
    <input type="checkbox" name="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Changement_Bouche" id="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Changement_Bouche" class="form-check-input" value="Changement_Bouche">
</div>
<label for="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_EA_Fixes" class="form-check-label">EA_Fixes</label>
<div class="input-group">
    <span class="input-group-text">unite</span>
    <input type="checkbox" name="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_EA_Fixes" id="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_EA_Fixes" class="form-check-input" value="EA_Fixes">
</div>
<label for="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_EA_Autoréglables" class="form-check-label">EA_Autoréglables</label>
<div class="input-group">
    <span class="input-group-text">unite</span>
    <input type="checkbox" name="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_EA_Autoréglables" id="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_EA_Autoréglables" class="form-check-input" value="EA_Autoréglables">
</div>
<label for="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Nb_Sdb_WC" class="form-label">Nb_Sdb_WC</label>
<div class="input-group">
    <span class="input-group-text">unite</span>
    <input type="number" name="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Nb_Sdb_WC" id="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Nb_Sdb_WC" class="form-control" step="any">
</div>
<label for="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Nb_Sdb" class="form-label">Nb_Sdb</label>
<div class="input-group">
    <span class="input-group-text">unite</span>
    <input type="number" name="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Nb_Sdb" id="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Nb_Sdb" class="form-control" step="any">
</div>
<label for="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Nb_WC" class="form-label">Nb_WC</label>
<div class="input-group">
    <span class="input-group-text">unite</span>
    <input type="number" name="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Nb_WC" id="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Nb_WC" class="form-control" step="any">
</div>
<label for="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Nb_Sde" class="form-label">Nb_Sde</label>
<div class="input-group">
    <span class="input-group-text">unite</span>
    <input type="number" name="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Nb_Sde" id="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Nb_Sde" class="form-control" step="any">
</div>

<div id="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_CdepField">
<label for="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Cdep">Cdep</label>
<input type="text" id="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Cdep_1" name="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Cdep_1" >
</div>
<button type='button' onclick="addField('AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Cdep','number','AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_CdepField')">+</button>

<label for="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Qv_Rep" class="form-label">Qv_Rep</label>
<div class="input-group">
    <span class="input-group-text">unite</span>
    <input type="number" name="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Qv_Rep" id="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Qv_Rep" class="form-control" step="any">
</div>
<label for="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Smea_Existant" class="form-label">Smea_Existant</label>
<div class="input-group">
    <span class="input-group-text">unite</span>
    <input type="number" name="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Smea_Existant" id="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Smea_Existant" class="form-control" step="any">
</div>
<label for="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Module_1" class="form-label">Module_1</label>
<div class="input-group">
    <span class="input-group-text">unite</span>
    <input type="number" name="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Module_1" id="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Module_1" class="form-control" step="any">
</div>
<label for="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Module_2" class="form-label">Module_2</label>
<div class="input-group">
    <span class="input-group-text">unite</span>
    <input type="number" name="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Module_2" id="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Module_2" class="form-control" step="any">
</div>
<label for="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Qsupp_Sdb" class="form-label">Qsupp_Sdb</label>
<div class="input-group">
    <span class="input-group-text">unite</span>
    <input type="number" name="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Qsupp_Sdb" id="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Qsupp_Sdb" class="form-control" step="any">
</div>
<label for="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Qsupp_WC" class="form-label">Qsupp_WC</label>
<div class="input-group">
    <span class="input-group-text">unite</span>
    <input type="number" name="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Qsupp_WC" id="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Qsupp_WC" class="form-control" step="any">
</div>
<label for="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Qsupp_Sdb_WC" class="form-label">Qsupp_Sdb_WC</label>
<div class="input-group">
    <span class="input-group-text">unite</span>
    <input type="number" name="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Qsupp_Sdb_WC" id="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Qsupp_Sdb_WC" class="form-control" step="any">
</div>
<label for="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Qsupp_Cellier" class="form-label">Qsupp_Cellier</label>
<div class="input-group">
    <span class="input-group-text">unite</span>
    <input type="number" name="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Qsupp_Cellier" id="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Qsupp_Cellier" class="form-control" step="any">
</div>
<h3>Pièces Humides</h3>
<table class="table table-sm table-bordered" id="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Humide">
    <thead class="table-dark">
        <tr>
            <th>Pièce</th>
            <th>Code</th>
            <th>Qvrep</th>
        </tr>
    </thead>
    <tbody class="border-dark">
    <?php 

        for($i=1;$i<=$nbrPiecesHumides;$i++) 
        {
            include'./_config_roomH.php';
        }
    ?>
    </tbody>
</table>
<button type="button" class="btn btn-dark" onclick="addRoom('AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>','Humide')">Ajouter une pièce</button>

<h3>Pièces Sèches</h3>
<table class="table table-sm table-bordered" id="AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_Sec">
    <thead class="table-dark">
        <tr>
            <th>Pièce</th>
            <th>Code</th>
        </tr>
    </thead>
    <tbody class="border-dark">
        <?php 

        for($i=1;$i<=$nbrPiecesSeches;$i++) 
        {
            include'./_config_roomS.php';
        }
        ?>

    </tbody>
</table>
<button type="button" class="btn btn-dark" onclick="addRoom('AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>','Sec')">Ajouter une pièce</button>