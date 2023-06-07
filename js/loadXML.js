
// Se lance onload quand $_GET['AT'] !=null
// Porte d'entrée de la création du formulaire

function loadXML(at) {
    let xhr = new XMLHttpRequest();

    xhr.open("GET", "/model/XML/" + at);
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
    
    
}
// PREMIERE PAGE : GENERALITES
function loadGeneralites(xml,IdParent) {
    var parent = document.getElementById(IdParent);
    
    var xhr = new XMLHttpRequest();
    xhr.open('POST', "/view/_form/_generalites.php", true); 
    xhr.onload = function () {
        parent.innerHTML = xhr.responseText;
        addDataGeneralites(xml);
        loadATS(xml);        
    };
    xhr.send();   
}

// DEUXIEME PAGE : ATS
function loadATS(xml) {
    var i = 0;
    // tant qu'il y a des AT dans le XML
    while (typeof xml.getElementsByTagName("AT")[i] !== "undefined" &&xml.getElementsByTagName("AT")[i] !== null) 
    {
        var AT = xml.getElementsByTagName("AT")[i];
        loadAT(AT,i);
        i++;
    } //end while
    loadEquipements(xml);
}

function loadAT(AT,i)
{
    var indexAT = parseInt(i + 1);
    var buttonHTML = AT.getElementsByTagName("REF_AT")[0].textContent;
    addAT("ATS_nav","addAT","ATS_content",buttonHTML,AT,indexAT); // ajoute ATi et ATi-tab-pane
}

function loadConfigs(AT,indexAT){
    var j = 0; //on itere sur les configs.
    while (typeof AT.getElementsByTagName("CONFIG")[j] !== "undefined" && AT.getElementsByTagName("CONFIG")[j] !== null) 
    {   
        var configXML = AT.getElementsByTagName("CONFIG")[j];
        loadConfig(indexAT,j,configXML);
        j++;
    }
}

function loadConfig(indexAT,j,configXML=null){
    
    var indexConfig = parseInt(j + 1);
    addConfig("navConfigs_AT"+indexAT,"AT"+indexAT+"_addConfig","AT"+indexAT+"configs-content",indexAT,indexConfig);
    loadPieces(indexAT,indexConfig,configXML);
    }


function loadPieces(indexAT,indexConfig,configXML=null){
    var piecesHumides = [];
    var piecesSeches = [];

    if(configXML !==null)
    {
        var pieces =configXML.getElementsByTagName("LOCAUX")[0].children;
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
        if(configXML !== null)
        {
            addDataConfig(configXML,indexAT,indexConfig);
            var Locaux = configXML.getElementsByTagName('LOCAUX')[0];
            addDataRoom(Locaux,'LocauxH',piecesHumides,indexAT,indexConfig);
            addDataRoom(Locaux,'LocauxS',piecesSeches,indexAT,indexConfig);  
            
        }
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
    loadEquipement('Bouche',"_bouche.php","bouches-tab-pane",bouches);
    // ENTREES
    loadEquipement("Entree","_entree.php", "entrees-tab-pane", entrees);
    // SOLUTIONS
    loadEquipement("Solution","_solution.php", "solutions-tab-pane", solutions);
    // EXTRACTEURS
    loadEquipement("Extracteur","_extracteur.php", "extracteurs-tab-pane", extracteurs);
    // Remplissage des inputs
    
}

function loadEquipement(Eqpmt,fileName,idContainer,EqpmtXML)
{
    var divEqpmt = document.getElementById(idContainer);
    var data = new FormData();
    data.append('nbrEqpmt', EqpmtXML.children.length);
    
    var xhr = new XMLHttpRequest();
    xhr.open('POST', "/view/_form/"+fileName, true); // false car on veut le faire de façon synchrone
    xhr.onload = function () {
        divEqpmt.innerHTML = xhr.responseText;  
        addDataEqpmt(Eqpmt,EqpmtXML);     
    };
    xhr.send(data);
}



////////////////////////////////////////////////////////////////////////////////////////

// REMPLISSAGE DES CHAMPS

function addDataGeneralites(xml){
    // Generalites
    var fields = ['Titre_AT','Titulaire','Code_Titulaire', 'Industriel', 'Code_Industriel', 'Num_AT','Type_Extraction','Date_Application','Date_Fin_Application'];
    fillFields(xml, fields, fields, 'text');
    fillArrayField(xml, 'Num_AT_Ancien', 'Num_AT_Ancien', 'text');
    var checkboxFields = ['Collectif','Individuel','Hotel','Double_Flux','Autoréglable','Hygroreglable','Basse_Pression'];
    fillFields(xml, checkboxFields, checkboxFields, 'checkbox');
}

function addDataAT(AT,indexAT)
{
var fields = ['REF_AT','LIBELLE','Dp1','Dp2','R_f'];
fillFields(AT, fields, formatFieldsAT(fields,indexAT), 'text');
var radioFields = ['HYGRO_A','HYGRO_B1','HYGRO_B2','GAZ','Presence_EA_Fixes','Presence_EA_Autoreglables','Optimisation'];
fillFields(AT, radioFields, formatFieldsAT(radioFields,indexAT), 'radio');
}

function addDataConfig(Config,indexAT,indexConfig)
{
    var fields = ['Type_Logement','Nb_Sdb_WC','Nb_Sdb','Nb_WC','Nb_Sde','Qv_Rep','Smea_Existant','Module_1','Module_2','Qsupp_Sdb','Qsupp_WC','Qsupp_Sdb_WC','Qsupp_Cellier'];
    fillFields(Config, fields, formatFieldsConfig(fields,indexAT,indexConfig), 'text');
    var checkboxFields = ['Config_Optimisee','Changement_Bouche','EA_Fixes','EA_Autoréglables'];
    fillFields(Config, checkboxFields, formatFieldsConfig(checkboxFields,indexAT,indexConfig), 'checkbox');
    fillArrayField(Config, 'Cdep', "AT"+indexAT+"Config"+indexConfig+"_Cdep", 'text');
    var fields = ['Name','Code','Qvrep'];
}

function addDataRoom(Locaux, roomtype, rooms,indexAT, indexConfig){

    for(var k=0;k<rooms.length;k++)
    {
        var input = document.getElementById("AT"+indexAT+"Config"+indexConfig+"_"+roomtype+"_Name_"+parseInt(k+1));
        input.value = rooms[k];
        fillRoomField(Locaux,parseInt(k+1), 'Code',"AT"+indexAT+"Config"+indexConfig+"_"+roomtype+"_Code" , 'text');
        if(roomtype=='LocauxH')
        {
            fillRoomField(Locaux,parseInt(k+1), 'Qvrep',"AT"+indexAT+"Config"+indexConfig+"_"+roomtype+"_Qvrep" , 'text');
        }
    }  
}

function addDataEqpmt(Eqpmt,EqpmtXML)
{
    
    for (var i=0;i<EqpmtXML.children.length;i++)
    {
        var xml = EqpmtXML.children[i];
        var indexEqpmt = parseInt(i+1);
        switch(Eqpmt){
            case 'Bouche':
                fillArrayField(xml, 'Reference', Eqpmt+indexEqpmt+'_Reference', 'text');
                var fields = ['Code','Qmin','QminF','QminLimite','QmaxF','QmaxLimite'];
                break;

            case 'Entree':
                fillArrayField(xml, 'Reference', Eqpmt+indexEqpmt+'_Reference', 'text');
                var fields = ['Code','EA_min','EA_max'];
                break;

            case 'Solution':
                fillField(xml, 'Code_Solution', Eqpmt+indexEqpmt+'_Code_Solution','text');
                var fields=[];
                for(var j=1;j<xml.children.length;j++)
                {
                    fillField(xml,'Solution_Libelle',Eqpmt+indexEqpmt+'_Config'+j+'_Solution_Libelle');
                    fillField(xml,'Code',Eqpmt+indexEqpmt+'_Config'+j+'_Code');
                    fillField(xml,'Nombre',Eqpmt+indexEqpmt+'_Config'+j+'_Nombre');
                }
                break;

            case 'Extracteur':
                fillArrayField(xml, 'Reference', Eqpmt+indexEqpmt+'_Reference', 'text');
                var fields = ['N_Cdep','Libelle_Cdep'];
                break;
    }

    if(Eqpmt!=='Solution')
    {
        fillFields(xml, fields, formatFieldsEqpmt(fields,Eqpmt,indexEqpmt), 'text')
    }
    }
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
            input.setAttribute('class','form-control mt-1')
            input.id =newIdHTML;
            reference.after(input);
        }
        fillField(xml,nameXML,newIdHTML,type,i);
    }
}

function fillRoomField(xml,indexRoom, nameXML, idHTML, type){
    var newIdHTML = idHTML +'_'+ indexRoom;
    fillField(xml,nameXML,newIdHTML,type);
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

function formatFieldsEqpmt(fields,Eqpmt,index){
    var newFields = [];
    for (var i=0; i<fields.length; i++) 
    {
        newFields.push(Eqpmt+index+"_"+fields[i]);
    }
    return newFields;
}


// DYNAMIQUES

function addField(idHTML,type,idContainer)
{
    var input = document.createElement("input");
    input.type = type;
    var container = document.getElementById(idContainer);
    idHTML +="_"+container.children.length;
    input.id=idHTML;
    input.name=idHTML;
    input.setAttribute('class','form-control mt-1');
    container.appendChild(input);
}

function newEquipement(Eqpmt){
    var container = document.getElementById('table_'+Eqpmt).children[1];
    var data = new FormData();
    data.append('index', parseInt(container.children.length+1));
    
    var xhr = new XMLHttpRequest();
    xhr.open('POST', "/view/_form/_"+Eqpmt.toLowerCase()+'_row.php', true); // false car on veut le faire de façon synchrone
    xhr.onload = function () {
        container.insertAdjacentHTML('beforeend' ,xhr.responseText);     
    };
    xhr.send(data);
}


function addAT(containerNavID,referenceNavButtonID,containerContentID,buttonHTML,AT=null,indexAT=null)
{
    const containerNav = document.getElementById(containerNavID); //navbar des ats
    const referenceNavButton = document.getElementById(referenceNavButtonID); // bouton add at
    const containerContent = document.getElementById(containerContentID); //contenu de l'AT
    var navItem = document.createElement("li");
    var button = document.createElement("button");
    var div = document.createElement("div");
    // NAV
    navItem.setAttribute("class", "nav-item");
    button.type = "button";
    button.innerHTML = buttonHTML; 
    button.setAttribute("data-bs-toggle", "tab");
    button.setAttribute("aria-selected", "true");

    if (indexAT == 1) {
        button.setAttribute("class", "border border-dark active nav-link");
        div.setAttribute("class", "show active tab-pane fade");
    } else {
        button.setAttribute("class", " border border-dark nav-link");
        div.setAttribute("class", "tab-pane fade");
    }

    if (indexAT==null)
    {
        indexAT = containerNav.children.length;
    }

    button.id = "AT" + indexAT + "-tab";
    button.setAttribute("data-bs-target", "#AT" + indexAT + "-tab-pane");
    navItem.id = "AT" + indexAT;
    div.id = "AT" + indexAT + "-tab-pane";
    div.setAttribute("aria-labelledby", "AT" + indexAT + "-tab");

    navItem.appendChild(button);
    containerNav.insertBefore(navItem, referenceNavButton);

    div.setAttribute("tabindex", "0");
    containerContent.appendChild(div);

    // CONTENT
    var data = new FormData();
    data.append('indexAT', indexAT);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', "/view/_form/"+"_AT.php", true); 

    xhr.onload = function () 
    {
        var divAT = document.getElementById("AT" + indexAT + "-tab-pane"); 
        divAT.innerHTML = xhr.responseText;
        if(AT !==null)
        {
            addDataAT(AT,indexAT);
        }
        
        // CONFIGS
        // NAV CONFIG
        var containerNavConfig = document.createElement("ul");
        var navConfigItem = document.createElement('li');
        var navConfigButton = document.createElement('button');

        containerNavConfig.id = "navConfigs_AT" + indexAT;
        containerNavConfig.setAttribute("class", "nav nav-pills");
        navConfigItem.id = "AT"+indexAT+"_addConfig";
        navConfigButton.innerHTML = '+';
        navConfigButton.type = "button";
        navConfigButton.id = "AT"+indexAT+"_addConfig-button";
        navConfigButton.setAttribute("class","nav-link border border-dark btn mx-1 my-1");
        navConfigButton.setAttribute('onclick',"addConfig('navConfigs_AT"+indexAT+"','AT"+indexAT+"_addConfig','AT"+indexAT+"configs-content',"+indexAT+")");
        navConfigItem.appendChild(navConfigButton);
        containerNavConfig.appendChild(navConfigItem);
        divAT.appendChild(containerNavConfig);
        // CONTENT CONFIG
        divConfigContent = document.createElement("div");
        divConfigContent.setAttribute("class", "tab-content my-2");
        divConfigContent.id = "AT" + indexAT + "configs-content";
        divAT.appendChild(divConfigContent);
        if(AT !==null)
        {
            loadConfigs(AT,indexAT);
        }
        
    };
    xhr.send(data);
    
}


function addConfig(containerNavID,referenceNavButtonID,containerContentID,indexAT,indexConfig=null)
{
    var containerNav = document.getElementById(containerNavID);
    var containerContent = document.getElementById(containerContentID);
    var referenceNavButton = document.getElementById(referenceNavButtonID); // bouton + Config
    var navItem = document.createElement("li");
    var button = document.createElement("button");
    var div = document.createElement("div");
    // Nav AT
    navItem.setAttribute("class", "nav-item");
    button.type = "button";
    
    button.setAttribute("class", " border border-dark nav-link mx-1 my-1");
    button.setAttribute("data-bs-toggle", "tab");

    if(indexConfig==null)
    {
        indexConfig = containerNav.children.length;
    }

    button.innerHTML = 'Config'+indexConfig;
    button.id = "AT" + indexAT + "Config" + indexConfig + "-tab";
    button.setAttribute("data-bs-target","#AT" + indexAT + "Config" + indexConfig + "-tab-pane");
    navItem.id = "AT" + indexAT + "Config" + indexConfig;
    div.id = "AT" + indexAT + "Config" + indexConfig + "-tab-pane";
    div.setAttribute("aria-labelledby","AT" + indexAT + "Config" + indexConfig + "-tab");

    // button.setAttribute("aria-controls", "at_" + indexAT + "-tab-pane");
    button.setAttribute("aria-selected", "true");
    navItem.appendChild(button);
    containerNav.insertBefore(navItem, referenceNavButton);
    div.setAttribute("class", "tab-pane fade");

    div.setAttribute("tabindex", "0");
    containerContent.appendChild(div);
    loadPieces(indexAT,indexConfig);
}

function updateATName(indexAT)
{
    var titreAT = document.getElementById("AT"+indexAT+"-tab");
    var newValue = document.getElementById("AT"+indexAT+"_REF_AT").value;
    titreAT.innerHTML = newValue;
}


function addRoom(roomType,indexAT,indexConfig)
{
    switch(roomType)
    {
        case "Humide":
            var tbody = document.getElementById("AT"+indexAT+"Config"+indexConfig+"_Humide").children[1];
            var fileName = "_config_roomH.php";
            break;
        case "Sec":
            var tbody = document.getElementById("AT"+indexAT+"Config"+indexConfig+"_Sec").children[1];
            var fileName = "_config_roomS.php";
            break;
    }

    var indexPiece = parseInt(tbody.children.length+1);

    var data = new FormData();
    data.append('indexAT', indexAT);
    data.append('indexConfig', indexConfig);
    data.append('indexPiece', indexPiece);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', "/view/_form/"+fileName, true); 
    xhr.onload = function () 
    {
        tbody.insertAdjacentHTML('beforeend' ,xhr.responseText);   
    };
    xhr.send(data);
}