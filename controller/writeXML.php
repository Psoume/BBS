<?php


$return = $_GET['return'];

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

function TypeEA($parent,$indexAT)
{
    $j = 1;
    $fixe = $auto = false;
    while (isset($_POST['AT'.$indexAT.'Config'.$j.'_Type_Logement']))
    {
        if(isset($_POST['AT'.$indexAT.'Config'.$j.'_EA_Fixes']))
        {
            $fixe=true;
        }
        elseif(isset($_POST['AT'.$indexAT.'Config'.$j.'_EA_Autoréglables']))
        {
            $auto=true;
        }
        $j++;
    }

    if ($fixe && $auto)
    {
        $parent->addChild('Presence_EA','Mixte');
        $parent->addChild('Presence_EA_Fixes','true');
        $parent->addChild('Presence_EA_Autoreglables','true');
    }
    elseif($fixe)
    {
        $parent->addChild('Presence_EA','Fixe');
        $parent->addChild('Presence_EA_Fixes','true');
        $parent->addChild('Presence_EA_Autoreglables','false');
    }
    elseif($auto)
    {
        $parent->addChild('Presence_EA','Autoréglable');
        $parent->addChild('Presence_EA_Fixes','false');
        $parent->addChild('Presence_EA_Autoreglables','true');
    }
    else 
    {
        $parent->addChild('Presence_EA','Sans');
        $parent->addChild('Presence_EA_Fixes','false');
        $parent->addChild('Presence_EA_Autoreglables','false');
    }

    $fields = ['Dp1','Dp2','R_f'];
    addTags($parent,FormatFieldsAT($fields,$indexAT),$fields,'number',false);
}

function Optimisation($indexAT)
{
    $j = 1;
    while (isset($_POST['AT'.$indexAT.'Config'.$j.'_Type_Logement']))
    {
        if(isset($_POST['AT'.$indexAT.'Config'.$j.'_Config_Optimisee']))
        {
            return 'true';
            break;
        }
        $j++;
    }
    return 'false';
}

//GENERALITES
$xml = new SimpleXMLElement('<?xml version="1.0" encoding="utf-8"?><Avis_Technique_Ventilation/>');
$xml->addAttribute('encoding', 'UTF-8');
$fields= ['Titre_AT' , 'Titulaire' , 'Code_Titulaire' , 'Industriel' , 'Code_Industriel' , 'Num_AT'];
addTags($xml,$fields,$fields,'text',false);
$Liste_AT_Anciens = $xml->addChild('Liste_AT_Ancien');
addTag($Liste_AT_Anciens,'Num_AT_Ancien','Num_AT_Ancien','array',false);
$fields= ['Date_Application' , 'Date_Fin_Application','Usage_EA'];
addTags($xml,$fields,$fields,'text',false);
// Usages
$Usages = $xml->addChild('Usages');
$fields = ['Collectif','Individuel','Hotel'];
addTags($Usages,$fields,$fields,'bool',true);
// Caracteristiques
$Caracteristiques = $xml->addChild('Caracteristiques');
$fields =['Double_Flux','Autoréglable','Hygroreglable','Basse_Pression'];
addTags($Caracteristiques,$fields,$fields,'bool',true);
addTag($Caracteristiques,'Type_Extraction','Type_Extraction','text',false);
// ATS
$xml->addChild('NB_AT', NB_AT());
$ATS = $xml->addChild('ATS');
$i = 1;

while (isset($_POST['AT'.$i.'_REF_AT'])) 
{
    $AT = $ATS->addChild('AT');
    $fields = ['REF_AT','LIBELLE'];
    addTags($AT,FormatFieldsAT($fields,$i),$fields,'text',false);

    addTag($AT,'AT'.$i.'_Type_Avis_Technique','Type_Avis_Technique','text',false);

    $hygroA = $hygroB1 = $hygroB2 = $gaz = 'false';
    if(isset($_POST['AT'.$i.'_Type_Avis_Technique']))
    {
        if($_POST['AT'.$i.'_Type_Avis_Technique'] == 'Hygro_A'){$hygroA='true';}
        if($_POST['AT'.$i.'_Type_Avis_Technique'] == 'Hygro_B1'){$hygroB1='true';}
        if($_POST['AT'.$i.'_Type_Avis_Technique'] == 'Hygro_B2'){$hygroB2='true';}
        if($_POST['AT'.$i.'_Type_Avis_Technique'] == 'Gaz'){$gaz='true';}
    }
    $AT->addChild('HYGRO_A', $hygroA);
    $AT->addChild('HYGRO_B1', $hygroB1);
    $AT->addChild('HYGRO_B2', $hygroB2);
    $AT->addChild('GAZ', $gaz);

    // TYPE-EA
    $Type_EA = $AT->addChild('Type-EA');
    TypeEA($Type_EA,$i);
    $AT->addChild('Optimisation', Optimisation($i));

    // CONFIGS
    $AT->addChild('NB_CONFIG', NB_CONFIG($i));
    $CONFIGS = $AT->addChild('CONFIGS');
    $j = 1;
    while (isset($_POST['AT'.$i.'Config'.$j.'_Type_Logement']))
    {
        $CONFIG = $CONFIGS->addChild('CONFIG');
        addTag($CONFIG,'AT'.$i.'Config'.$j.'_Type_Logement','Type_Logement','number',false);
        //SINGULARITES
        $Singularites = $CONFIG->addChild('Singularités');
        $fields = ['Config_Optimisee','Changement_Bouche'];
        addTags($Singularites,FormatFieldsConfig($fields,$i,$j),$fields,'bool',true);
        // SINGULARITE EA
        if(isset($_POST['AT'.$i.'Config'.$j.'_EA_Fixes']) && isset ($_POST['AT'.$i.'Config'.$j.'_EA_Autoréglables']))
        { $Singularites->addChild('Singularite_EA', 'Sing_EA_Mixte'); }
        elseif(isset ($_POST['AT'.$i.'Config'.$j.'_EA_Fixes']))
        { $Singularites->addChild('Singularite_EA', 'Sing_EA_Fixe'); }
        elseif(isset ($_POST['AT'.$i.'Config'.$j.'_EA_Autoréglables']))
        { $Singularites->addChild('Singularite_EA', 'Sing_EA_Autoréglable'); }
        else 
        { $Singularites->addChild('Singularite_EA', 'Sing_EA_Sans'); }

        $fields = ['EA_Fixes','EA_Autoréglables'];
        addTags($Singularites,FormatFieldsConfig($fields,$i,$j),$fields,'bool',true);

        $fields = ['Nb_Sdb_WC','Nb_Sdb','Nb_WC','Nb_Cellier','Nb_Sde'];
        addTags($CONFIG,FormatFieldsConfig($fields,$i,$j),$fields,'number',false);
        $DEBIT_RT = $CONFIG->addChild('DEBIT_RT');
        $Cdeps = $DEBIT_RT->addChild('Cdeps');
        addTag($Cdeps,'AT'.$i.'Config'.$j.'_Cdep','Cdep','array',false);
        $fields = ['Qv_Rep','Smea_Existant','Module_1','Module_2','Qsupp_Sdb','Qsupp_WC','Qsupp_Sdb_WC','Qsupp_Cellier','Qsupp_Sde'];
        addTags($DEBIT_RT,FormatFieldsConfig($fields,$i,$j),$fields,'number',false);
        // LOCAUX
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
        $k = 1;
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
// SOLUTIONS
$Solutions = $Equipements->addChild('Solutions');
$i = 1;
while(isset($_POST['Solution'.$i.'_Code_Solution'])) // Solution i
{
    $Type_Solution = $Solutions->addChild('Type_Solution');
    addTag($Type_Solution,'Solution'.$i.'_Code_Solution','Code_Solution','text',false);
    $j=1;
    while(isset($_POST['Solution'.$i.'_Config'.$j.'_Solution_Libelle']) && $_POST['Solution'.$i.'_Config'.$j.'_Solution_Libelle']!="") //Config j
    {
        $Config_Solution = $Type_Solution->addChild('Config_Solution');
        addTag($Config_Solution,'Solution'.$i.'_Config'.$j.'_Solution_Libelle','Solution_Libelle','text',false);
        $k = 1;
        while(isset($_POST['Solution'.$i.'_Config'.$j.'_Code_'.$k]))
        {
            $Entree = $Config_Solution->addChild('Entree');
            addTag($Entree,'Solution'.$i.'_Config'.$j.'_Code_'.$k,'Code','text',false);
            addTag($Entree,'Solution'.$i.'_Config'.$j.'_Nombre_'.$k,'Nombre','number',false);
            $k++;
        }
        
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

$xml->asXML("../data/XML/".$File_Name);
    

switch ($return)
{
    case 'false':
        echo "<a href='../index.php?'>Revenir à l'accueil</a>";
        echo "<a href='/data/XML/".$File_Name."' download='".$File_Name."'>Télécharger le fichier XML</a>";
        break;
    case 'true':
        header("Location: ../index.php?AT=".$File_Name);
        die();
        break;
}

?>



