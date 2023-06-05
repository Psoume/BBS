<?php
if(isset($_POST['index']))
{
    $i = $_POST['index'];
}
?>

<tr>
    <td>
        <input id="Solution<?php echo $i; ?>_Code_Solution" name="Solution<?php echo $i; ?>_Code_Solution" type="text"></td>
    <td>
        <label for="Solution<?php echo $i; ?>_Config1_Solution_Libelle">Solution_Libelle</label>
        <input id="Solution<?php echo $i; ?>_Config1_Solution_Libelle" type="text" name="Solution<?php echo $i; ?>_Config1_Solution_Libelle">
        <label for="Solution<?php echo $i; ?>_Config1_Code">Code</label>
        <input id="Solution<?php echo $i; ?>_Config1_Code" type="text" name="Solution<?php echo $i; ?>_Config1_Code">
        <label for="Solution<?php echo $i; ?>_Config1_Nombre">Nombre</label>
        <input id="Solution<?php echo $i; ?>_Config1_Nombre" type="number" name="Solution<?php echo $i; ?>_Config1_Nombre">
    </td>
    <td>
        <label for="Solution<?php echo $i; ?>_Config2_Solution_Libelle">Solution_Libelle</label>
        <input id="Solution<?php echo $i; ?>_Config2_Solution_Libelle" type="text" name="Solution<?php echo $i; ?>_Config2_Solution_Libelle">
        <label for="Solution<?php echo $i; ?>_Config2_Code">Code</label>
        <input id="Solution<?php echo $i; ?>_Config2_Code" type="text" name="Solution<?php echo $i; ?>_Config2_Code">
        <label for="Solution<?php echo $i; ?>_Config2_Nombre">Nombre</label>
        <input id="Solution<?php echo $i; ?>_Config2_Nombre" type="number" name="Solution<?php echo $i; ?>_Config2_Nombre">
    </td>
    <td>
        <label for="Solution<?php echo $i; ?>_Config3_Solution_Libelle">Solution_Libelle</label>
        <input id="Solution<?php echo $i; ?>_Config3_Solution_Libelle" type="text" name="Solution<?php echo $i; ?>_Config3_Solution_Libelle">
        <label for="Solution<?php echo $i; ?>_Config3_Code">Code</label>
        <input id="Solution<?php echo $i; ?>_Config3_Code" type="text" name="Solution<?php echo $i; ?>_Config3_Code">
        <label for="Solution<?php echo $i; ?>_Config3_Nombre">Nombre</label>
        <input id="Solution<?php echo $i; ?>_Config3_Nombre" type="number" name="Solution<?php echo $i; ?>_Config3_Nombre">
    </td>
</tr>