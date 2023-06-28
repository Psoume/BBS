
// Se lance onload quand $_GET['AT'] !=null
// Porte d'entrée de la création du formulaire

function loadXML(at) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "data/" + at);
    xhr.onerror = function () {
        alert("La requête a échouée");
    };
    xhr.onload = function () {
        if (xhr.responseXML != null) {
            
            container = document.getElementById("titleAT");
            container.insertAdjacentHTML('afterbegin' ,at.split(/(\\|\/)/g).pop());//récupère la dernière partie de la chaine 
            container = document.getElementById("titleATInput");
            container.value = at;

            // fichier XML 
            var xml = xhr.responseXML; 
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
    xhr.open('POST', "view/_form/_generalites.php", true);
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
    if (AT.getElementsByTagName("REF_AT")[0].textContent !== "")
    {
        var buttonHTML = AT.getElementsByTagName("REF_AT")[0].textContent;
    }
    else{ var buttonHTML = "AT"; }
    addAT("ATS_nav","addAT","ATS_content",buttonHTML,AT,indexAT); // ajoute ATi et ATi-tab-pane
}

function loadConfigs(AT,indexAT){
    var j = 0; //on itere sur les configs.
    while (typeof AT.getElementsByTagName("CONFIG")[j] !== "undefined") 
    {   
        var configXML = AT.getElementsByTagName("CONFIGS")[0].children[j];
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
    xhr.open('POST', "view/_form/"+"_config.php", true);
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
            updateConfigName(indexAT,indexConfig); 
            
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
    if(Eqpmt =='Solution')
    {
        var nbrConfig = 1;
        for (var i=0;i<EqpmtXML.children.length;i++)
        {
            var max = parseInt(EqpmtXML.children[i].children.length-1);
            if(max > nbrConfig){nbrConfig = max;}
        }
        data.append('nbrConfig', nbrConfig);
    }
    
    var xhr = new XMLHttpRequest();
    xhr.open('POST', "view/_form/"+fileName, true);
    xhr.onload = function () {
        divEqpmt.innerHTML = xhr.responseText;  
        addDataEqpmt(Eqpmt,EqpmtXML); 
        // Bootstrap tooltips
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))    
    };
    xhr.send(data);
}