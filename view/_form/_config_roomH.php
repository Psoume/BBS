
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
        <select class='form-select' name='AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_LocauxH_Name_<?php echo $i; ?>' id='AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_LocauxH_Name_<?php echo $i; ?>'>
            <option selected>Nom de la pièce</option>
            <option value="Cuisine">Cuisine</option>
            <option value="Salle_de_bain">Salle de bain</option>
            <option value="Salle_de_bain2">Salle de bain 2</option>
            <option value="Salle_de_bain_supp">Salle de bain supp</option>
            <option value="Salle_de_bain_WC">Salle de bain WC</option>
            <option value="Salle_de_bain_WC2">Salle de bain WC 2</option>
            <option value="Salle_de_bain_WC_supp">Salle de bain WC supp</option>
            <option value="WC_Unique">WC Unique</option>
            <option value="WC_Multiple">WC Multiple</option>
            <option value="WC_supp">WC supp</option>
            <option value="Salle_eau_cellier">Salle d'eau cellier</option>
            <option value="Salle_eau_cellier_supp">Salle d'eau cellier supp</option>
        </select>
    </th>
    <td>
        <input onchange = "checkCodeRoom('Bouche',this)" onclick="datalist('Bouche','datalistCodeBouches')" list="datalistCodeBouches" class='form-control' name='AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_LocauxH_Code_<?php echo $i; ?>' id='AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_LocauxH_Code_<?php echo $i; ?>' type='text'>
        <datalist id = 'datalistCodeBouches'>
        </datalist>
    </td>
    <td>
        <input class='form-control' name='AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_LocauxH_Qvrep_<?php echo $i; ?>' id='AT<?php echo $indexAT; ?>Config<?php echo $indexConfig; ?>_LocauxH_Qvrep_<?php echo $i; ?>' type='number' step="0.01">
    </td>
</tr>