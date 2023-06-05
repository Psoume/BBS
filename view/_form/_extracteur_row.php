<?php
if(isset($_POST['index']))
{
    $i = $_POST['index'];
}
?>

<tr>
    <td id="Extracteur<?php echo $i;?>_Reference">
        <div id="Extracteur<?php echo $i ;?>_ReferenceField">
            <input id="Extracteur<?php echo $i;?>_Reference_1" name="Extracteur<?php echo $i;?>_Reference_1" type="text">
            <p hidden></p>
        </div>
        <button type="button" onclick="addField('Extracteur<?php echo $i ;?>_Reference','text','Extracteur<?php echo $i ;?>_ReferenceField')">+</button></td>
    </td>
    <td>
        <input id="Extracteur<?php echo $i;?>_N_Cdep" name="Extracteur<?php echo $i;?>_N_Cdep" type="number">
    </td>
    <td>
        <input id="Extracteur<?php echo $i;?>_Libelle_Cdep" name="Extracteur<?php echo $i;?>_Libelle_Cdep" type="text">
    </td>
</tr>