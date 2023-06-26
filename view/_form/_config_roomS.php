<?php


if(isset($_POST['indexPiece']))
{
    $i = $_POST['indexPiece'];
    $indexAT = $_POST['indexAT'];
    $indexConfig = $_POST['indexConfig'];
}
?>

<tr>
    <th scope='row'>
        <select class='form-select' name='AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_LocauxS_Name_<?php echo $i; ?>' id='AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_LocauxS_Name_<?php echo $i; ?>' type='text'>
            <option selected>Nom de la pièce</option>
            <option value="Salon">Salon</option>
            <option value="Chambre">Chambre</option>
        </select>
    </th>
    <td>
        <input onchange="checkCodeRoom('Solution',this)" onclick="datalist('Solution','datalistCodeSolutions')" list="datalistCodeSolutions" class='form-control' name='AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_LocauxS_Code_<?php echo $i; ?>' id='AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_LocauxS_Code_<?php echo $i; ?>' type='text'>
        <datalist id = 'datalistCodeSolutions'>
        </datalist>
    </td>
</tr>