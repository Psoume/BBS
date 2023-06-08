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
            echo "<td>";
            echo "<label for='Solution".$i."_Config".$j."_Solution_Libelle'>Solution_Libelle</label>";
            echo "<input class='form-control' id='Solution".$i."_Config".$j."_Solution_Libelle' type='text' name='Solution".$i."_Config".$j."_Solution_Libelle'>";
            echo "<label for='Solution".$i."_Config".$j."_Code'>Code</label>";
            echo "<input class='form-control' id='Solution".$i."_Config".$j."_Code' type='text' name='Solution".$i."_Config".$j."_Code'>";
            echo "<label for='Solution".$i."_Config".$j."_Nombre'>Nombre</label>";
            echo "<input class='form-control' id='Solution".$i."_Config".$j."_Nombre' type='number' name='Solution".$i."_Config".$j."_Nombre'>";
            echo "</td>";
        }
        ?>
</tr>