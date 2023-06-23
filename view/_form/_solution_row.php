<?php
if(isset($_POST['index']))
{
    $i = $_POST['index'];
}
if(isset($_POST['nbr_cols']))
{
    $nbr_cols = $_POST['nbr_cols'];
}
?>

<tr>
    <td>
        <input class='form-control' id="Solution<?php echo $i; ?>_Code_Solution" name="Solution<?php echo $i; ?>_Code_Solution" type="text">
    </td>
        <?php
        for ($j=1;$j<=$nbr_cols;$j++)
        {
            echo "<td id='Solution".$i."_Config".$j."_1'><div class='row g-0'>";
            echo "<div class='col-12'>";
            echo "<label for='Solution".$i."_Config".$j."_Solution_Libelle'>Libelle:</label>";
            echo "<input class='form-control' id='Solution".$i."_Config".$j."_Solution_Libelle' type='text' name='Solution".$i."_Config".$j."_Solution_Libelle'>";
            echo "</div><div class='col'>";
            echo "<label for='Solution".$i."_Config".$j."_Code_1'>Code:</label>";
            echo "<input class='form-control' id='Solution".$i."_Config".$j."_Code_1' type='text' name='Solution".$i."_Config".$j."_Code_1'>";
            echo "</div><div class='col'>";
            echo "<label for='Solution".$i."_Config".$j."_Nombre_1'>Nombre:</label>";
            echo "<input class='form-control' id='Solution".$i."_Config".$j."_Nombre_1' type='number' name='Solution".$i."_Config".$j."_Nombre_1'>";
            echo "</div></div>";
            echo "<div class='row mt-2'><div class='col'><button type='button' class='w-100 mt-1 btn btn-sm btn-primary border border-dark' onclick='newSolution(this,".$i.",".$j.")'>Ajouter</button>
            </div><div class='col'><button class='w-100 mt-1 btn btn-sm btn-light border border-dark' type='button' onclick='removeSolution(".$i.",".$j.")' >Supprimer</button></div>";
            echo "</td>";
        }
        ?>
</tr>