<?php
$indexAT = $_POST['indexAT'];
?>

<div class="border border-dark my-3 py-3">
    <div class='px-4 mb-5'>
        <label for="AT<?php echo $indexAT; ?>_REF_AT" class="form-label">Référence :</label>
        <input type="text" name="AT<?php echo $indexAT; ?>_REF_AT" id="AT<?php echo $indexAT; ?>_REF_AT" class="form-control">
        <label for="AT<?php echo $indexAT; ?>_LIBELLE" class="form-label">Libellé :</label>
        <input type="text" name="AT<?php echo $indexAT; ?>_LIBELLE" id="AT<?php echo $indexAT; ?>_LIBELLE" class="form-control">
    </div>

    <div class="row mx-auto">
        <div class='col-12 col-sm-6 px-4'>
            <fieldset>
                <legend>Type d'avis technique :</legend>
                <div class="form-check">
                    <label for="AT<?php echo $indexAT; ?>_HYGRO_A" class="form-check-label">HYGRO A </label>
                    <input type="radio" name="AT<?php echo $indexAT; ?>_Type_Avis_Technique" id="AT<?php echo $indexAT; ?>_HYGRO_A" class="form-check-input" value="HYGRO_A">
                </div>
                <div class="form-check">
                    <label for="AT<?php echo $indexAT; ?>_HYGRO_B1" class="form-check-label">HYGRO B1</label>
                    <input type="radio" name="AT<?php echo $indexAT; ?>_Type_Avis_Technique" id="AT<?php echo $indexAT; ?>_HYGRO_B1" class="form-check-input" value="HYGRO_B1">
                </div>
                <div class="form-check">
                    <label for="AT<?php echo $indexAT; ?>_HYGRO_B2" class="form-check-label">HYGRO B2</label>
                    <input type="radio" name="AT<?php echo $indexAT; ?>_Type_Avis_Technique" id="AT<?php echo $indexAT; ?>_HYGRO_B2" class="form-check-input" value="HYGRO_B2">
                </div>
                <div class="form-check">
                    <label for="AT<?php echo $indexAT; ?>_GAZ" class="form-check-label">GAZ</label>
                    <input type="radio" name="AT<?php echo $indexAT; ?>_Type_Avis_Technique" id="AT<?php echo $indexAT; ?>_GAZ" class="form-check-input" value="GAZ">
                </div>
            </fieldset>
            <div class="form-check mt-5">
                <label for="AT<?php echo $indexAT; ?>_Optimisation" class="form-check-label">Optimisation</label>
                <input type="checkbox" name="AT<?php echo $indexAT; ?>_Optimisation" id="AT<?php echo $indexAT; ?>_Optimisation" class="form-check-input" value="Optimisation">
            </div>
        </div>

        <div class='col-12 col-sm-6 px-4'>
        <fieldset>
            <legend>Type d'Entrées d'Air :</legend>
            <div class="form-check">
            <label for="AT<?php echo $indexAT; ?>_Presence_EA_Fixes" class="form-check-label">Fixes</label>
                <input type="radio" name="AT<?php echo $indexAT; ?>_Presence_EA" id="AT<?php echo $indexAT; ?>_Presence_EA_Fixes" class="form-check-input" value="Presence_EA_Fixes">
            </div>
            <div class="form-check">
            <label for="AT<?php echo $indexAT; ?>_Presence_EA_Autoreglables" class="form-check-label">Autoréglables</label>
                <input type="radio" name="AT<?php echo $indexAT; ?>_Presence_EA" id="AT<?php echo $indexAT; ?>_Presence_EA_Autoreglables" class="form-check-input" value="Presence_EA_Autoreglables">
            </div>
            <label for="AT<?php echo $indexAT; ?>_Dp1" class="form-label">Dp1 :</label>
            <div class="input-group">
                <input type="number" name="AT<?php echo $indexAT; ?>_Dp1" id="AT<?php echo $indexAT; ?>_Dp1" class="form-control" step="any">
                <span class="input-group-text">Pa</span>
            </div>
            <label for="AT<?php echo $indexAT; ?>_Dp2" class="form-label">Dp2 :</label>
            <div class="input-group">
                <input type="number" name="AT<?php echo $indexAT; ?>_Dp2" id="AT<?php echo $indexAT; ?>_Dp2" class="form-control" step="any">
                <span class="input-group-text">Pa</span>
            </div>
            <label for="AT<?php echo $indexAT; ?>_R_f" class="form-label">R_f :</label>
            <input type="number" name="AT<?php echo $indexAT; ?>_R_f" id="AT<?php echo $indexAT; ?>_R_f" class="form-control" step="any">
        </fieldset>
        </div>
    </div>
</div>


