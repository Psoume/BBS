<?php
$nbr_rows = $_POST['nbrEqpmt'];
?>

<table class="table table-sm table-bordered" id="table_Entree">
    <thead class="table-dark sticky-top top-0">
        <tr>
            <th>Code</th>
            <th>Références</th>
            <th>EA_min</th>
            <th>EA_max</th>
        </tr>
    </thead>
    <tbody class="border-dark">

    <?php
            for($i=1;$i<=$nbr_rows;$i++)
            {
                include './_entree_row.php';
            }
    ?>
    </tbody>
</table>
<button type="button" class="btn btn-dark" onclick="newEquipement('Entree')">Ajouter</button>