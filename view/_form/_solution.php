<?php
$nbr_rows = $_POST['indexAT'];
?>

<table class="table table-sm table-bordered" id="table_Solution">
    <thead class="table-dark sticky-top top-0">
        <tr>
            <th>Code_Solution</th>
            <th>Config 1</th>
            <th>Config 2</th>
            <th>Config 3</th>
            <th><button type="button" onclick="solutionsNewConfig()">Ajouter</button></th>
        </tr>
    </thead>
    <tbody class="border-dark">
    <?php
        for($i=1;$i<=$nbr_rows;$i++)
        {
            include './_solution_row.php';
        }
    ?>
    </tbody>
</table>
<button type="button" class="btn btn-dark" onclick="newEquipement('Solution')">Ajouter</button>

