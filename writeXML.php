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
// ON ITERE SUR LES AT
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
        $fieldsPOST = ['AT'.$i.'Config'.$j.'_EA_Fixes','AT'.$i.'Config'.$j.'_EA_Autoréglables'];
        $fieldsXML = ['EA_Fixes','EA_Autoréglables'];
        addTags($Singularites,$fieldsPOST,$fieldsXML,'bool',true);
        $fieldsPOST = ['AT'.$i.'Config'.$j.'_Nb_Sdb_WC','AT'.$i.'Config'.$j.'_Nb_Sdb','AT'.$i.'Config'.$j.'_Nb_WC','AT'.$i.'Config'.$j.'_Nb_Sde'];
        $fieldsXML = ['Nb_Sdb_WC','Nb_Sdb','Nb_WC','Nb_Sde'];
        addTags($CONFIG,$fieldsPOST,$fieldsXML,'number',false);
        $DEBIT_RT = $CONFIG->addChild('DEBIT_RT');

        $j++;
    }

    $i++;
}

//ATS



// $Caracteristiques = $xml->addChild('Caracteristiques');
// $Caracteristiques->addChild('Double_Flux',$checkboxesValues['Double_Flux']);
// $Caracteristiques->addChild('Autoreglable',$checkboxesValues['Autoreglable']);
// $Caracteristiques->addChild('Hygroreglable',$checkboxesValues['Hygroreglable']);
// $Caracteristiques->addChild('Basse_Pression',$checkboxesValues['Basse_Pression']);
// $Caracteristiques->addChild('Type_extraction',$Type_extraction);

// $xml->addChild('NB_AT', $NB_AT);




$File_Name = $_POST['fileName'];
echo $File_Name;
$xml->asXML("TEMP/test.xml");
//     $xml->asXML("TEMP/".$File_Name);
//     echo "<a href='/TEMP/".$File_Name."' download='".$File_Name."'>Télécharger le fichier XML</a>";


?>

<a href='./index.php'>Revenir à l'accueil</a>

