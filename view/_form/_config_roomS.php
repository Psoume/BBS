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
            <?php include("./_config_roomS_select.php") ;?>
        </select>
    </th>
    <td>
        <input onchange="checkCodeRoom('Entree',this)" class='form-control' name='AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_LocauxS_Code_<?php echo $i; ?>' id='AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_LocauxS_Code_<?php echo $i; ?>' type='text'>
    </td>
</tr>