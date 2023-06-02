
// Se lance onload quand $_GET['AT'] !=null
// crée le formulaire + pré-remplit
function loadXML(at) {
    let xhr = new XMLHttpRequest();

    xhr.open("GET", "/res/XML/" + at);
    xhr.send();

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
            loadFormPart("_generalites.php",'list-generalites',null);
            // DEUXIEME PAGE
            loadATS(xml);
            // TROISIEME PAGE
            loadEquipements(xml);
            // Remplissage des inputs
            addData(xml);
        }
    };
}

// DEUXIEME PAGE : ATS
function loadATS(xml) {
    const containerNav = document.getElementById("nav_ats"); //navbar des ats
    const referenceNavButton = document.getElementById("addAT"); // bouton + at
    const containerContent = document.getElementById("at_content"); //contenu des ats
    var i = 0;
    // tant qu'il y a des AT dans le XML
    while (typeof xml.getElementsByTagName("AT")[i] !== "undefined" &&xml.getElementsByTagName("AT")[i] !== null) 
    {
        var AT = xml.getElementsByTagName("AT")[i];
        var indexAT = parseInt(i + 1);
        var navItem = document.createElement("li");
        var button = document.createElement("button");
        var div = document.createElement("div");
        // Nav AT
        navItem.setAttribute("class", "nav-item");
        button.id = "at_" + indexAT + "-tab";
        button.type = "button";
        button.innerHTML = AT.getElementsByTagName("REF_AT")[0].textContent;
        if (i == 0) {
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
        div.id = "at_" + indexAT + "-tab-pane";
        if (i == 0) {
            div.setAttribute("class", "show active tab-pane fade");
        } else {
            div.setAttribute("class", "tab-pane fade");
        }
        div.setAttribute("aria-labelledby", "at_" + indexAT + "-tab");
        div.setAttribute("tabindex", "0");
        containerContent.appendChild(div);
        loadFormPart("_AT.php",div.id,indexAT);

        // CONFIGS
        var ATcontainer = document.getElementById(div.id); //ok
        // NAV CONFIG
        var containerNavConfig = document.createElement("ul");
        containerNavConfig.id = "navConfigs_AT" + indexAT;
        containerNavConfig.setAttribute("class", "nav nav-pills");
        ATcontainer.appendChild(containerNavConfig);
        // CONTENT CONFIG
        divConfigContent = document.createElement("div");
        divConfigContent.setAttribute("class", "tab-content");
        divConfigContent.id = "AT" + indexAT + "configs-content";
        ATcontainer.appendChild(divConfigContent);

        var j = 0; //on itere sur les configs.
        while (typeof AT.getElementsByTagName("CONFIG")[j] !== "undefined" &&AT.getElementsByTagName("CONFIG")[j] !== null) 
        {
            var configXML = AT.getElementsByTagName("CONFIG")[j];
            // NavConfig
            var indexConfig = parseInt(j + 1);
            var itemNavConfig = document.createElement("li");
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
            containerNavConfig = document.getElementById(containerNavConfig.id);
            containerNavConfig.appendChild(itemNavConfig);
            //ContentConfig
            config = document.createElement("div"); //formulaire de la config At1Config1
            config.id = "AT" + indexAT + "Config" + indexConfig + "-tab-pane";
            config.setAttribute("class", "tab-pane fade");
            config.setAttribute("aria-labelledby","AT" + indexAT + "Config" + indexConfig + "-tab");
            config.setAttribute("tabindex", "0");
            divConfigContent = document.getElementById(divConfigContent.id);
            divConfigContent.appendChild(config);
            var pieces =configXML.getElementsByTagName("LOCAUX")[0].children 
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
            loadFormPart("_config.php",config.id,indexAT,indexConfig,piecesHumides,piecesSeches);
            j++;
        }
        i++;
    } //end while
}

// TROISIEME PAGE : EQUIPEMENTS
function loadEquipements(xml) {
    const eqpmts = xml.getElementsByTagName("Equipements")[0];
    const bouches = eqpmts.getElementsByTagName("Bouches")[0];
    const entrees = eqpmts.getElementsByTagName("Entrees")[0];
    const solutions = eqpmts.getElementsByTagName("Solutions")[0];
    const extracteurs = eqpmts.getElementsByTagName("Extracteurs")[0];

    // BOUCHES
    addTableEqpmt("_bouche.php","bouches-tab-pane",bouches);
    // ENTREES
    addTableEqpmt("_entree.php", "entrees-tab-pane", entrees);
    // SOLUTIONS
    addTableEqpmt("_solution.php", "solutions-tab-pane", solutions);
    // EXTRACTEURS
    addTableEqpmt("_extracteur.php", "extracteurs-tab-pane", extracteurs);
}

function addTableEqpmt(fileName,idContainer,xml)
{
    loadFormPart(fileName,idContainer,xml.children.length);// ici indexAT est le nombre d'équipements
}


////////////////////////////////////////////////////////////////////////////////////////

function loadFormPart(FileName,IdParent,indexAT=null,indexConfig=null,piecesHumides=null,piecesSeches=null) {
var parent = document.getElementById(IdParent);
var data = new FormData();
data.append('indexAT', indexAT);
data.append('indexConfig', indexConfig);
data.append('piecesHumides', piecesHumides);
data.append('piecesSeches', piecesSeches);

var xhr = new XMLHttpRequest();
xhr.open('POST', "/view/_form/"+FileName, false); // false car on veut le faire de façon synchrone
xhr.onload = function () {
    parent.innerHTML = xhr.responseText;
};
xhr.send(data);
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