<?php
if(isset($_POST['index']))
{
    $i = $_POST['index'];
}
?>

<tr>
    <td>
        <input class='form-control' id="Entree<?php echo $i ;?>_Code" name="Entree<?php echo $i ;?>_Code" type="text">
    </td>
    <td id="Entree<?php echo $i ;?>_Reference">
        <div id="Entree<?php echo $i ;?>_ReferenceField">
            <input class='form-control' id="Entree<?php echo $i ;?>_Reference_1" name="Entree<?php echo $i ;?>_Reference_1" type="text">
            <p hidden></p>        
        </div>
        <button class="w-25 mt-1 btn btn-sm btn-primary border border-dark" type="button" onclick="addField('Entree<?php echo $i ;?>_Reference','text','Entree<?php echo $i ;?>_ReferenceField')">+</button>
        <button class="w-25 mt-1 btn btn-sm btn-light border border-dark" type="button" onclick="deleteInput('Entree<?php echo $i ;?>_ReferenceField',2)">-</button></td>    
    </td>
    <td>
        <input class='form-control' id="Entree<?php echo $i ;?>_EA_min" name="Entree<?php echo $i ;?>_EA_min" type="number">
    </td>
    <td>
        <input class='form-control' id="Entree<?php echo $i ;?>_EA_max" name="Entree<?php echo $i ;?>_EA_max" type="number">
    </td>
</tr>