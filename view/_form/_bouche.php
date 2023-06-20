<?php
$nbr_rows = $_POST['nbrEqpmt'];
?>

<div class="table-responsive">
<table class="table table-sm table-bordered border-dark" id="table_Bouche">
        <thead class="table-dark sticky-top top-0">
            <tr>
                <th scope='col' >Code<br/><br/></th>
                <th scope='col' class='w-25'>Références<br/><br/></th>
                <th scope='col'>Qmin (m<sup>3</sup>/h)</th>
                <th scope='col'>QminF (m<sup>3</sup>/h)</th>
                <th scope='col'>QminLimite (m<sup>3</sup>/h)</th>
                <th scope='col'>QmaxF (m<sup>3</sup>/h)</th>
                <th scope='col'>QmaxLimite (m<sup>3</sup>/h)</th>
            </tr>
        </thead>
        <tbody id="table_Bouche_tbody">
            <?php
            for($i=1;$i<=$nbr_rows;$i++)
            {
                include './_bouche_row.php';
            }
            ?>
        </tbody>
    </table>
    </div>
<button type="button" class="btn btn-primary border border-dark me-2" onclick="newEquipement('Bouche')">Ajouter un équipement</button>
<button type='button' class="btn btn-light border border-dark" onclick="deleteInput('table_Bouche_tbody',0)" >Supprimer</button>
