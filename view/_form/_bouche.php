<?php
$nbr_rows = $_POST['nbrEqpmt'];
?>

<div class="table-responsive">
<table class="table table-sm table-bordered" id="table_Bouche">
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
        <tbody class="border-dark">
            <?php
            for($i=1;$i<=$nbr_rows;$i++)
            {
                include './_bouche_row.php';
            }
            ?>
        </tbody>
    </table>
    </div>
<button type="button" class="btn btn-dark" onclick="newEquipement('Bouche')">Ajouter</button>
