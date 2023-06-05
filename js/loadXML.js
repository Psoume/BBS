
// Se lance onload quand $_GET['AT'] !=null
// Porte d'entrée de la création du formulaire
function loadXML(at) {
    let xhr = new XMLHttpRequest();

    xhr.open("GET", "/res/XML/" + at);
    xhr.onerror = function () {
        alert("La requête a échouée");
    };
    xhr.onload = function () {
        if (xhr.responseXML != null) {
            container = document.getElementById("titleAT");
            container.innerHTML = at;
            container = document.getElementById("titleATForm");
            container.value = at;
            var xml = xhr.responseXML; // le fichier XML choisi
            // PREMIERE PAGE
            loadGeneralites(xml,'list-generalites');
        }
    };
    xhr.send();
    // Remplissage des inputs
    // addData(xml);
    
}

// DEUXIEME PAGE : ATS
function loadATS(xml) {
    var i = 0;
    // tant qu'il y a des AT dans le XML
    while (typeof xml.getElementsByTagName("AT")[i] !== "undefined" &&xml.getElementsByTagName("AT")[i] !== null) 
    {
        var AT = xml.getElementsByTagName("AT")[i];
        loadAT(xml,AT,i);
        i++;
    } //end while
}

function loadAT(xml,AT,i)
{
    const containerNav = document.getElementById("nav_ats"); //navbar des ats
    const referenceNavButton = document.getElementById("addAT"); // bouton + at
    const containerContent = document.getElementById("at_content"); //contenu des ats
    
    var indexAT = parseInt(i + 1);
    var buttonHTML = AT.getElementsByTagName("REF_AT")[0].textContent;
    addNav(containerNav,referenceNavButton,containerContent,buttonHTML,indexAT);
    // crée divAT dont l'id est "at_" + indexAT + "-tab-pane"
    
    var data = new FormData();
    data.append('indexAT', indexAT);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', "/view/_form/"+"_AT.php", true); 

    xhr.onload = function () 
    {
        var divAT = document.getElementById("at_" + indexAT + "-tab-pane"); 
        divAT.innerHTML = xhr.responseText;
        // CONFIGS
        // NAV CONFIG
        var containerNavConfig = document.createElement("ul");
        containerNavConfig.id = "navConfigs_AT" + indexAT;
        containerNavConfig.setAttribute("class", "nav nav-pills");
        divAT.appendChild(containerNavConfig);
        // CONTENT CONFIG
        divConfigContent = document.createElement("div");
        divConfigContent.setAttribute("class", "tab-content");
        divConfigContent.id = "AT" + indexAT + "configs-content";
        divAT.appendChild(divConfigContent);
        loadConfigs(xml,AT,indexAT);
    };
    xhr.send(data);
}

function loadConfigs(xml,AT,indexAT){
    var j = 0; //on itere sur les configs.
    while (typeof AT.getElementsByTagName("CONFIG")[j] !== "undefined" && AT.getElementsByTagName("CONFIG")[j] !== null) 
    {   
        var configXML = AT.getElementsByTagName("CONFIG")[j];
        loadConfig(xml,configXML,indexAT,j);
        j++;
    }
}

function loadConfig(xml,configXML,indexAT,j){
    
    var indexConfig = parseInt(j + 1);
    const itemNavConfig = document.createElement("li");
    // NavConfig
    itemNavConfig.setAttribute("class", "nav-item");
    itemNavConfig.id = "AT" + indexAT + "Config" + indexConfig;
    var buttonNavConfig = document.createElement("button");
    buttonNavConfig.setAttribute("class", "nav-link");
    buttonNavConfig.setAttribute("data-bs-toggle", "tab");
    buttonNavConfig.setAttribute("data-bs-target","#AT" + indexAT + "Config" + indexConfig + "-tab-pane");
    buttonNavConfig.setAttribute("aria-controls","AT" + indexAT + "Config" + indexConfig + "-tab-pane");
    buttonNavConfig.setAttribute("aria-selected", "false");
    buttonNavConfig.type = "button";
    buttonNavConfig.id = "AT" + indexAT + "Config" + indexConfig + "-tab";
    buttonNavConfig.innerHTML = "Config" + indexConfig;
    itemNavConfig.appendChild(buttonNavConfig);
    containerNavConfig = document.getElementById("navConfigs_AT"+indexAT);
    containerNavConfig.appendChild(itemNavConfig);
    //ContentConfig
    config = document.createElement("div"); //formulaire de la config At1Config1
    config.id = "AT" + indexAT + "Config" + indexConfig + "-tab-pane";
    config.setAttribute("class", "tab-pane fade");
    config.setAttribute("aria-labelledby","AT" + indexAT + "Config" + indexConfig + "-tab");
    config.setAttribute("tabindex", "0");
    divConfigContent = document.getElementById("AT"+indexAT+"configs-content");
    divConfigContent.appendChild(config);

    loadPieces(xml,configXML,indexAT,indexConfig);
    }


function loadPieces(xml,configXML,indexAT,indexConfig){
    var pieces =configXML.getElementsByTagName("LOCAUX")[0].children;
    var piecesHumides = [];
    var piecesSeches = [];

    for (var k = 0; k < pieces.length; k++)
    {
        if (typeof(pieces[k].getElementsByTagName('Entree_Solution')[0]) !== 'undefined')
        {
            piecesSeches.push(pieces[k].tagName);
        }
        else
        {
            piecesHumides.push(pieces[k].tagName);
        }
    }

    var data = new FormData();
    data.append('indexAT', indexAT);
    data.append('indexConfig', indexConfig);
    data.append('nbrPiecesHumides', piecesHumides.length);
    data.append('nbrPiecesSeches', piecesSeches.length);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', "/view/_form/"+"_config.php", true); 
    xhr.onload = function () 
    {
        var config = document.getElementById("AT"+indexAT+"Config"+indexConfig+"-tab-pane");
        config.innerHTML = xhr.responseText;
        loadEquipements(xml);
    };
    xhr.send(data);
}


// TROISIEME PAGE : EQUIPEMENTS
function loadEquipements(xml) {
    const eqpmts = xml.getElementsByTagName("Equipements")[0];
    const bouches = eqpmts.getElementsByTagName("Bouches")[0];
    const entrees = eqpmts.getElementsByTagName("Entrees")[0];
    const solutions = eqpmts.getElementsByTagName("Solutions")[0];
    const extracteurs = eqpmts.getElementsByTagName("Extracteurs")[0];

    // BOUCHES
    loadEquipement("_bouche.php","bouches-tab-pane",bouches);
    // ENTREES
    loadEquipement("_entree.php", "entrees-tab-pane", entrees);
    // SOLUTIONS
    loadEquipement("_solution.php", "solutions-tab-pane", solutions);
    // EXTRACTEURS
    loadEquipement("_extracteur.php", "extracteurs-tab-pane", extracteurs);
}

function loadEquipement(fileName,idContainer,xml)
{
    var divEqpmt = document.getElementById(idContainer);
    var data = new FormData();
    data.append('nbrEqpmt', xml.children.length);
    
    var xhr = new XMLHttpRequest();
    xhr.open('POST', "/view/_form/"+fileName, true); // false car on veut le faire de façon synchrone
    xhr.onload = function () {
        divEqpmt.innerHTML = xhr.responseText;
    };
    xhr.send(data);
}



////////////////////////////////////////////////////////////////////////////////////////

function loadGeneralites(xml,IdParent) {
var parent = document.getElementById(IdParent);

var xhr = new XMLHttpRequest();
xhr.open('POST', "/view/_form/_generalites.php", true); 
xhr.onload = function () {
    parent.innerHTML = xhr.responseText;
    loadATS(xml);
};
xhr.send();
}


function fillArrayField(xml, nameXML, idHTML, type)
{
    for(var i=0; i<xml.getElementsByTagName(nameXML).length; i++) 
    {
        
        var newIdHTML = idHTML +'_'+ parseInt(i+1);
        var idReference = idHTML +'_'+ i;
        if(i!=0)
        {
            var reference = document.getElementById(idReference);
            var input = document.createElement('input');
            input.type = type;
            input.name = newIdHTML;
            input.id =newIdHTML;
            reference.after(input);
        }
        
        
        fillField(xml,nameXML,newIdHTML,type,i);
    }
}


function fillField(xml, nameXML, idHTML, type,position=0)
{
    if (typeof(xml.getElementsByTagName(nameXML)[position]) !== 'undefined')
    {
        var value = xml.getElementsByTagName(nameXML)[position].textContent;
    }
    else{ value="";}
    
    var input = document.getElementById(idHTML);
    if(type=='checkbox' || type=='radio')
    {
        switch (value) 
            {
                case "true":
                    input.checked = true;
                    break;
                case "false":
                    input.checked = false;
                    break;
                default:
                    input.checked = false;
                    break;
            }
    }
    else
    {
        input.value = value;
    }
}

function fillFields(xml, nameXML, idHTML, type)
{
    for (var i = 0;i < nameXML.length;i++)
    {
        fillField(xml, nameXML[i], idHTML[i], type);
    }
}



function addData(xml)
{
    // Generalites
    var fields = ['Titre_AT','Titulaire','Code_Titulaire', 'Industriel', 'Code_Industriel', 'Num_AT','Type_Extraction','Date_Application','Date_Fin_Application'];
    fillFields(xml, fields, fields, 'text');
    fillArrayField(xml, 'Num_AT_Ancien', 'Num_AT_Ancien', 'text');
    var checkboxFields = ['Collectif','Individuel','Hotel','Double_Flux','Autoréglable','Hygroreglable','Basse_Pression'];
    fillFields(xml, checkboxFields, checkboxFields, 'checkbox');
    AT
    var i = 0; // tant qu'il y a des AT dans le XML
    while (typeof xml.getElementsByTagName("AT")[i] !== "undefined") 
    {
        var AT = xml.getElementsByTagName("AT")[i];
        var indexAT = parseInt(i+1);
        var fields = ['REF_AT','LIBELLE','Type_Avis_Technique','Dp1','Dp2','R_f'];
        fillFields(AT, fields, formatFieldsAT(fields,indexAT), 'text');
        var radioFields = ['HYGRO_A','HYGRO_B1','HYGRO_B2','GAZ','Presence_EA_Fixes','Presence_EA_Autoreglables','Optimisation'];
        fillFields(AT, radioFields, formatFieldsAT(radioFields,indexAT), 'radio');
        // Configs
        var j = 0;
        while (typeof AT.getElementsByTagName("CONFIG")[j] !== "undefined") 
        {
            var configXML = AT.getElementsByTagName("CONFIG")[j];
            var indexConfig = parseInt(j + 1);
            var fields = ['Type_Logement','Nb_Sdb_WC','Nb_Sdb','Nb_WC','Nb_Sde','Qv_Rep','Smea_Existant','Module_1','Module_2','Qsupp_Sdb','Qsupp_WC','Qsupp_Sdb_WC','Qsupp_Cellier'];
            fillFields(configXML, fields, formatFieldsConfig(fields,indexAT,indexConfig), 'text');
            var checkboxFields = ['Config_Optimisee','Changement_Bouche','EA_Fixes','EA_Autoréglables'];
            fillFields(configXML, checkboxFields, formatFieldsConfig(checkboxFields,indexAT,indexConfig), 'checkbox');
            fillArrayField(configXML, 'Cdep', "AT"+indexAT+"Config"+indexConfig+"_Cdep", 'text');
            j++;
        }
        i++;
    }
}

function formatFieldsAT(fields,indexAT)
{
    var newFields = [];
    for (var i=0; i<fields.length; i++) 
    {
        newFields.push("AT"+indexAT+"_"+fields[i]);
    }
    return newFields;
}

function formatFieldsConfig(fields,indexAT,indexConfig)
{
    var newFields = [];
    for (var i=0; i<fields.length; i++) 
    {
        newFields.push("AT"+indexAT+"Config"+indexConfig+"_"+fields[i]);
    }
    return newFields;
}

function addNav(containerNav,referenceNavButton,containerContent,buttonHTML,indexAT,indexConfig=null)
{
    var navItem = document.createElement("li");
    var button = document.createElement("button");
    var divAT = document.createElement("div");
    // Nav AT
    navItem.setAttribute("class", "nav-item");
    button.id = "at_" + indexAT + "-tab";
    button.type = "button";
    button.innerHTML = buttonHTML;
    if (indexAT == 1) {
        button.setAttribute("class", "active nav-link");
    } else {
        button.setAttribute("class", "nav-link");
    }
    button.setAttribute("data-bs-toggle", "tab");
    button.setAttribute("data-bs-target", "#at_" + indexAT + "-tab-pane");
    button.setAttribute("aria-controls", "at_" + indexAT + "-tab-pane");
    button.setAttribute("aria-selected", "true");
    navItem.appendChild(button);
    containerNav.insertBefore(navItem, referenceNavButton);
    // Content AT
    divAT.id = "at_" + indexAT + "-tab-pane";
    if (indexAT == 1) {
        divAT.setAttribute("class", "show active tab-pane fade");
    } else {
        divAT.setAttribute("class", "tab-pane fade");
    }
    divAT.setAttribute("aria-labelledby", "at_" + indexAT + "-tab");
    divAT.setAttribute("tabindex", "0");
    containerContent.appendChild(divAT);
}