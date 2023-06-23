<?php
if(isset($_POST['index']))
{
    $i = $_POST['index'];
}
?>

<tr>
    <td id="Extracteur<?php echo $i;?>_Reference">
        <div id="Extracteur<?php echo $i ;?>_ReferenceField">
            <input class='form-control' id="Extracteur<?php echo $i;?>_Reference_1" name="Extracteur<?php echo $i;?>_Reference_1" type="text">
            <p hidden></p>
        </div>
        <button class="w-25 mt-1 btn btn-sm btn-primary border border-dark" type="button" onclick="addField('Extracteur<?php echo $i ;?>_Reference','text','Extracteur<?php echo $i ;?>_ReferenceField')">+</button>
        <button class="w-25 mt-1 btn btn-sm btn-light border border-dark" type="button" onclick="deleteInput('Extracteur<?php echo $i ;?>_ReferenceField',2)">-</button>

    </td>
    <td>
        <input class='form-control' id="Extracteur<?php echo $i;?>_N_Cdep" name="Extracteur<?php echo $i;?>_N_Cdep" type="number">
    </td>
    <td>
        <input class='form-control' id="Extracteur<?php echo $i;?>_Libelle_Cdep" name="Extracteur<?php echo $i;?>_Libelle_Cdep" type="text">
    </td>
</tr>