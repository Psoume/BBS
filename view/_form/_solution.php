<?php
$nbr_rows = $_POST['nbrEqpmt'];
$nbr_cols = $_POST['nbrConfig'];
?>

<table class="table table-sm table-bordered border-dark" id="table_Solution">
    <thead class="table-dark sticky-top top-0">
        <tr>
            <th>Code_Solution</th>
            <?php
                for ($j=1;$j<=$nbr_cols;$j++)
                {
                    echo "<th>Config".$j."</th>";
                }
            ?>
            <th><button type="button" onclick="solutionsNewconfig()">Ajouter</button></th>
        </tr>
    </thead>
    <tbody id='table_Solution_tbody'>
    <?php
        for($i=1;$i<=$nbr_rows;$i++)
        {
            include './_solution_row.php';
        }
    ?>
    </tbody>
</table>
<button type="button" class="btn btn-dark" onclick="newEquipement('Solution')">Ajouter</button>
<button type='button' class="" onclick="deleteInput('table_Solution_tbody',0)" >Supprimer le dernier équipement</button>

