
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
        <input name='AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_LocauxH_Name_<?php echo $i; ?>' id='AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_LocauxH_Name_<?php echo $i; ?>' type='text'>
    </th>
    <td>
        <input name='AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_LocauxH_Code_<?php echo $i; ?>' id='AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_LocauxH_Code_<?php echo $i; ?>' type='text'>
    </td>
    <td>
        <input name='AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_LocauxH_Qvrep_<?php echo $i; ?>' id='AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_LocauxH_Qvrep_<?php echo $i; ?>' type='text'>
    </td>
</tr>