<?php
$indexAT = $_POST['indexAT'];
?>

<div class="border border-dark my-3 py-3">
    <div class='px-4 mb-5'>
        <label for="AT<?php echo $indexAT; ?>_REF_AT" class="form-label">Référence :</label>
        <input onchange="updateATName(<?php echo $indexAT; ?>)" type="text" name="AT<?php echo $indexAT; ?>_REF_AT" id="AT<?php echo $indexAT; ?>_REF_AT" class="form-control">
        <label for="AT<?php echo $indexAT; ?>_LIBELLE" class="form-label">Libellé :</label>
        <input type="text" name="AT<?php echo $indexAT; ?>_LIBELLE" id="AT<?php echo $indexAT; ?>_LIBELLE" class="form-control">
    </div>

    <div class="row mx-auto">
        <div class='col-12 col-sm-6 px-4'>
            <label for="AT<?php echo $indexAT; ?>_Type_Avis_Technique">Type d'avis technique :</label>
            <select name="AT<?php echo $indexAT; ?>_Type_Avis_Technique" id="AT<?php echo $indexAT; ?>_Type_Avis_Technique" class="form-select">
                <option value="" selected>Choisir un type d'avis technique</option>
                <option value="Hygro_A">HYGRO A</option>
                <option value="Hygro_B">HYGRO B</option>
                <option value="Hygro_B1">HYGRO B1</option>
                <option value="Hygro_B2">HYGRO B2</option>
                <option value="Autoreglable">Autoréglable</option>
                <option value="Autoreglable_Gaz">Autoréglable GAZ</option>
                <option value="Sans_precision">Sans Précision</option>
            </select>

        </div>

        <div class='col-12 col-sm-6 px-4'>

        <fieldset>
            <legend>
                <i class="bi bi-info-circle" data-bs-toggle="tooltip" data-bs-title="Ne remplir la partie 'Type d'entrées d'air' que si au moins une configuration a des entrées d'air de type fixe."></i>
                Type d'entrées d'air :
            </legend>

            <label for="AT<?php echo $indexAT; ?>_Dp1" class="form-label">Dp1 :</label>
            <div class="input-group pe-5">
                <input type="number" name="AT<?php echo $indexAT; ?>_Dp1" id="AT<?php echo $indexAT; ?>_Dp1" class="form-control " step="any">
                <span class="input-group-text">Pa</span>
            </div>
            <label for="AT<?php echo $indexAT; ?>_Dp2" class="form-label">Dp2 :</label>
            <div class="input-group pe-5">
                <input type="number" name="AT<?php echo $indexAT; ?>_Dp2" id="AT<?php echo $indexAT; ?>_Dp2" class="form-control" step="any">
                <span class="input-group-text">Pa</span>
            </div>
            <div class='pe-5'>
                <label for="AT<?php echo $indexAT; ?>_R_f" class="form-label">R_f :</label>
                <input type="number" name="AT<?php echo $indexAT; ?>_R_f" id="AT<?php echo $indexAT; ?>_R_f" class="form-control " step="any">
            </div>
        </fieldset>
        </div>
    </div>
</div>


