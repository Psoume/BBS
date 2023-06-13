<?php
$nbr_rows = $_POST['nbrEqpmt'];
?>

<table class="table table-sm table-bordered border-dark" id="table_Entree">
    <thead class="table-dark sticky-top top-0">
        <tr>
            <th>Code</th>
            <th>Références</th>
            <th>EA_min (m<sup>3</sup>/h)</th>
            <th>EA_max (m<sup>3</sup>/h)</th>
        </tr>
    </thead>
    <tbody id="table_Entree_tbody">

    <?php
            for($i=1;$i<=$nbr_rows;$i++)
            {
                include './_entree_row.php';
            }
    ?>
    </tbody>
</table>
<button type="button" class="btn btn-dark" onclick="newEquipement('Entree')">Ajouter</button>
<button type='button' class="" onclick="deleteInput('table_Entree_tbody',0)" >Supprimer le dernier équipement</button>
