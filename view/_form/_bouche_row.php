<?php
if(isset($_POST['index']))
{
    $i = $_POST['index'];
}
?>

<tr>
    <td >
        <input class='form-control' id="Bouche<?php echo $i ;?>_Code" name="Bouche<?php echo $i ;?>_Code" type="text">
    </td>
    <td class='' id="Bouche<?php echo $i ;?>_Reference">
        <div id="Bouche<?php echo $i ;?>_ReferenceField">
            <input class='form-control' id="Bouche<?php echo $i ;?>_Reference_1" name="Bouche<?php echo $i ;?>_Reference_1" type="text">
            <p hidden></p>
        </div>
        <button class="w-25 mt-1 btn btn-sm btn-primary border border-dark" type="button" onclick="addField('Bouche<?php echo $i ;?>_Reference','text','Bouche<?php echo $i ;?>_ReferenceField')">+</button>
        <button class="w-25 mt-1 btn btn-sm btn-light border border-dark" type="button" onclick="deleteInput('Bouche<?php echo $i ;?>_ReferenceField',2)">-</button></td>

    <td>
        <input class='form-control' id="Bouche<?php echo $i ;?>_Qmin" name="Bouche<?php echo $i ;?>_Qmin" type="number">
    </td>
    <td>
        <input class='form-control' id="Bouche<?php echo $i ;?>_QminF" name="Bouche<?php echo $i ;?>_QminF" type="number">
    </td>
    <td>
        <input class='form-control' id="Bouche<?php echo $i ;?>_QminLimite" name="Bouche<?php echo $i ;?>_QminLimite" type="number">
    </td>
    <td>
        <input class='form-control' id="Bouche<?php echo $i ;?>_QmaxF" name="Bouche<?php echo $i ;?>_QmaxF" type="number">
    </td>
    <td>
        <input class='form-control' id="Bouche<?php echo $i ;?>_QmaxLimite" name="Bouche<?php echo $i ;?>_QmaxLimite" type="number">
    </td>
</tr>