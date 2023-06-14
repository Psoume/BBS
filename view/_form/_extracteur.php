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
    <tbody id="table_Extracteur_tbody">
    <?php
        for($i=1;$i<=$nbr_rows;$i++)
        {
            include './_extracteur_row.php';
        }
    ?>
    </tbody>
</table>
<button type="button" class="btn btn-success me-2" onclick="newEquipement('Extracteur')">Ajouter un équipement</button>
<button type='button' class="" onclick="deleteInput('table_Extracteur_tbody',0)" >Supprimer</button>
