<?php
$nbr_rows = $_POST['nbrEqpmt'];
?>


<table class="table table-sm table-bordered border-dark" id="table_Extracteur">
    <thead class="table-dark sticky-top top-0">
        <tr>
            <th>Références</th>
            <th>N_Cdep</th>
            <th>Libelle_Cdep</th>
        </tr>
    </thead>
    <tbody>
    <?php
        for($i=1;$i<=$nbr_rows;$i++)
        {
            include './_extracteur_row.php';
        }
    ?>
    </tbody>
</table>
<button type="button" class="btn btn-dark" onclick="newEquipement('Extracteur')">Ajouter</button>
