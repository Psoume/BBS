<?php

function resolveCheckbox($name,$is_bool)
{
    if(isset($_POST[$name]))
    {
        if($is_bool)
        {
            return 'true';
        }
        else
        {
            return $_POST[$name];
        }
    }
    else
    {
        return 'false';
    }
}

function addTag($parent,$namePOST,$nameXML,$type,$is_bool){

    switch ($type)
    {
        case 'text':
            $value = $_POST[$namePOST] ;
            $parent->addChild($nameXML, $value);
            break;
        case 'number':
            $value = $_POST[$namePOST] ;
            $parent->addChild($nameXML, $value);
            break;
        case 'bool':
            $value = resolveCheckbox($namePOST,$is_bool);
            $parent->addChild($nameXML, $value);
            break;
        case 'array':
            $i = 1;
            while(isset($_POST[$namePOST.'_'.$i]))
            {
                $value = $_POST[$namePOST.'_'.$i];
                $parent->addChild($nameXML, $value);
                $i++;
            }
            break;
    }
    
}


function addTags($parent,$namesPOST,$namesXML,$type,$is_bool){
    for($i=0;$i<count($namesPOST);$i++)
    {
        addTag($parent,$namesPOST[$i],$namesXML[$i],$type,$is_bool);
    }
    
}

function NB_AT()
{
    $NB_AT = 0;
    $i = 1;
    while (isset($_POST['AT'.$i.'_REF_AT']))
    {
        $NB_AT += 1;
        $i++;
    }
    return $NB_AT;
}

function NB_CONFIG($AT_i)
{
    $NB_CONFIG = 0;
    $i = 1;
    while (isset($_POST['AT'.$AT_i.'Config'.$i.'_Type_Logement']))
    {
        $NB_CONFIG += 1;
        $i++;
    }
    return $NB_CONFIG;
}

function FormatFieldsAT($fields,$i)
{
foreach ($fields as &$f)
{
    $f = 'AT'.$i.'_'.$f;
}
return $fields;
}

function FormatFieldsConfig($fields,$i,$j)
{
foreach ($fields as &$f)
{
    $f = 'AT'.$i.'Config'.$j.'_'.$f;
}
return $fields;
}

function FormatFieldsEqpmts($fields,$eqpmt,$i)
{
    foreach ($fields as &$f)
    {
        $f = $eqpmt.$i.'_'.$f;
    }
    return $fields;
}

//GENERALITES
$xml = new SimpleXMLElement('<?xml version="1.0" encoding="utf-8"?><Avis_Technique_Ventilation/>');
$xml->addAttribute('encoding', 'UTF-8');
$fields= ['Titre_AT' , 'Titulaire' , 'Code_Titulaire' , 'Industriel' , 'Code_Industriel' , 'Num_AT'];
addTags($xml,$fields,$fields,'text',false);
$Liste_AT_Anciens = $xml->addChild('Liste_AT_Ancien');
addTag($Liste_AT_Anciens,'Num_AT_Ancien','Num_AT_Ancien','array',false);
$fields= ['Date_Application' , 'Date_Fin_Application' , 'Usage_EA'];
addTags($xml,$fields,$fields,'text',false);
$Usages = $xml->addChild('Usages');
$fields = ['Collectif','Individuel','Hotel'];
addTags($Usages,$fields,$fields,'bool',true);
$Caracteristiques = $xml->addChild('Caracteristiques');
$fields =['Double_Flux','Autoréglable','Hygroreglable','Basse_Pression'];
addTags($Caracteristiques,$fields,$fields,'bool',true);
addTag($Caracteristiques,'Type_Extraction','Type_Extraction','text',false);
$xml->addChild('NB_AT', NB_AT());
$ATS = $xml->addChild('ATS');
$i = 1;

// ATS
while (isset($_POST['AT'.$i.'_REF_AT'])) 
{
    $AT = $ATS->addChild('AT');
    $fields = ['REF_AT','LIBELLE','Type_Avis_Technique'];
    addTags($AT,FormatFieldsAT($fields,$i),$fields,'text',false);
    $fields = ['HYGRO_A','HYGRO_B1','HYGRO_B2','GAZ'];
    addTags($AT,FormatFieldsAT($fields,$i),$fields,'bool',true);
    $Type_EA = $AT->addChild('Type-EA');
    addTag($Type_EA,'AT'.$i.'_Presence_EA','Presence_EA','text',false);
    $fields = ['Presence_EA_Fixes','Presence_EA_Autoreglables'];
    addTags($Type_EA,FormatFieldsAT($fields,$i),$fields,'bool',true);
    $fields = ['Dp1','Dp2','R_f'];
    addTags($Type_EA,FormatFieldsAT($fields,$i),$fields,'number',false);
    addTag($AT,'AT'.$i.'_Optimisation','Optimisation','bool',true);
    $AT->addChild('NB_CONFIG', NB_CONFIG($i));
    $CONFIGS = $AT->addChild('CONFIGS');
    // ON ITERE SUR LES CONFIGS
    $j = 1;
    while (isset($_POST['AT'.$i.'Config'.$j.'_Type_Logement']))
    {
        $CONFIG = $CONFIGS->addChild('CONFIG');
        addTag($CONFIG,'AT'.$i.'Config'.$j.'_Type_Logement','Type_Logement','number',false);
        $Singularites = $CONFIG->addChild('Singularités');
        $fields = ['Config_Optimisee','Changement_Bouche'];
        addTags($Singularites,FormatFieldsConfig($fields,$i,$j),$fields,'bool',true);
        addTag($Singularites,'AT'.$i.'Config'.$j.'_Singularite_EA','Singularite_EA','text',false);
        $fields = ['EA_Fixes','EA_Autoréglables'];
        addTags($Singularites,FormatFieldsConfig($fields,$i,$j),$fields,'bool',true);
        $fields = ['Nb_Sdb_WC','Nb_Sdb','Nb_WC','Nb_Sde'];
        addTags($CONFIG,FormatFieldsConfig($fields,$i,$j),$fields,'number',false);
        $DEBIT_RT = $CONFIG->addChild('DEBIT_RT');
        $Cdeps = $DEBIT_RT->addChild('Cdeps');
        addTag($Cdeps,'AT'.$i.'Config'.$j.'_Cdep','Cdep','array',false);
        $fields = ['Qv_Rep','Smea_Existant','Module_1','Module_2','Qsupp_Sdb','Qsupp_WC','Qsupp_Sdb_WC','Qsupp_Cellier'];
        addTags($DEBIT_RT,FormatFieldsConfig($fields,$i,$j),$fields,'number',false);
        // LES LOCAUX
        $LOCAUX = $CONFIG->addChild('LOCAUX');
        $k = 1;
        while(isset($_POST['AT'.$i.'Config'.$j.'_LocauxH_Name_'.$k]))
        {
            $name = $_POST['AT'.$i.'Config'.$j.'_LocauxH_Name_'.$k];
            $piece =  $LOCAUX->addChild($name);
            addTag($piece,'AT'.$i.'Config'.$j.'_LocauxH_Code_'.$k,'Code','text',false);
            addTag($piece,'AT'.$i.'Config'.$j.'_LocauxH_Qvrep_'.$k,'Qvrep','text',false);
            $k++;
        }
        while(isset($_POST['AT'.$i.'Config'.$j.'_LocauxS_Name_'.$k]))
        {
            $name = $_POST['AT'.$i.'Config'.$j.'_LocauxS_Name_'.$k];
            $piece =  $LOCAUX->addChild($name);
            $Entree_Solution = $piece->addChild('Entree_Solution');
            addTag($Entree_Solution,'AT'.$i.'Config'.$j.'_LocauxS_Code_'.$k,'Code','text',false);
            $k++;
        }
        $j++;
    }

    $i++;
}

// EQUIPEMENTS 
$Equipements = $xml->addChild('Equipements');
//Bouches
$Bouches = $Equipements->addChild('Bouches');
$i = 1;
while(isset($_POST['Bouche'.$i.'_Code']))
{
    $Type_Bouche = $Bouches->addChild('Type_Bouche');
    addTag($Type_Bouche,'Bouche'.$i.'_Code','Code','text',false);
    $References = $Type_Bouche->addChild('References');
    addTag($References,'Bouche'.$i.'_Reference','Reference','array',false);
    $fields = ['Qmin','QminF','QminLimite','QmaxF','QmaxLimite'];
    addTags($Type_Bouche,FormatFieldsEqpmts($fields,'Bouche',$i),$fields,'number',false);
    $i++;
}
//Entrees
$Entrees = $Equipements->addChild('Entrees');
$i = 1;
while(isset($_POST['Entree'.$i.'_Code']))
{
    $Type_Entree = $Entrees->addChild('Type_Entree');
    addTag($Type_Entree,'Entree'.$i.'_Code','Code','text',false);
    $References = $Type_Entree->addChild('References');
    addTag($References,'Entree'.$i.'_Reference','Reference','array',false);
    $fields = ['EA_min','EA_max'];
    addTags($Type_Entree,FormatFieldsEqpmts($fields,'Entree',$i),$fields,'number',false);
    $i++;
}
// SOLUTIONS : TO DO
$Solutions = $Equipements->addChild('Solutions');
$i = 1;
while(isset($_POST['Solution'.$i.'_Code_Solution'])) // Solution i
{
    $Type_Solution = $Solutions->addChild('Type_Solution');
    addTag($Type_Solution,'Solution'.$i.'_Code_Solution','Code_Solution','text',false);
    $j=1;
    while(isset($_POST['Solution'.$i.'_Config'.$j.'_Solution_Libelle'])) //Config j
    {
        $Config_Solution = $Type_Solution->addChild('Config_Solution');
        addTag($Config_Solution,'Solution'.$i.'_Config'.$j.'_Solution_Libelle','Solution_Libelle','text',false);
        $Entree = $Config_Solution->addChild('Entree');
        addTag($Entree,'Solution'.$i.'_Config'.$j.'_Code','Code','text',false);
        addTag($Entree,'Solution'.$i.'_Config'.$j.'_Nombre','Nombre','number',false);
        $j++;
    }
    $i++;
}
// Extracteurs
$Extracteurs = $Equipements->addChild('Extracteurs');
$i = 1;
while(isset($_POST['Extracteur'.$i.'_Libelle_Cdep']))
{
    $Type_Extracteur = $Extracteurs->addChild('Type_Extracteur');
    $References = $Type_Extracteur->addChild('References');
    addTag($References,'Extracteur'.$i.'_Reference','Reference','array',false);
    $fields = ['EA_min','EA_max'];
    addTag($Type_Extracteur,'Extracteur'.$i.'_N_Cdep','N_Cdep','number',false);
    addTag($Type_Extracteur,'Extracteur'.$i.'_Libelle_Cdep','Libelle_Cdep','text',false);
    $i++;
}

$File_Name = $_POST['fileName'];
echo $File_Name;
$xml->asXML("TEMP/test.xml");
//     $xml->asXML("TEMP/".$File_Name);
//     echo "<a href='/TEMP/".$File_Name."' download='".$File_Name."'>Télécharger le fichier XML</a>";


?>

<a href='./index.php'>Revenir à l'accueil</a>

