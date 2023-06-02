<?php
$nbr_rows = $_POST['indexAT'];
?>

<table class="table table-sm table-bordered" id="table_Bouche">
        <thead class="table-dark sticky-top top-0">
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
        <tbody class="border-dark">
            <?php
            for($i=1;$i<=$nbr_rows;$i++)
            {
                include './_bouche_row.php';
            }
            ?>
        </tbody>
    </table>
    <button type="button" class="btn btn-dark" onclick="newEquipement('Bouche')">Ajouter</button>

