// Choix du fichier XML parmi ceux disponibles + chargement
function chooseXML(at){
    window.location.href = ("?AT="+at);
};


function loadXML(at){
    let xhr = new XMLHttpRequest();

    xhr.open('GET', '/TEMP/'+at);
    xhr.send();

    xhr.onerror = function() {
        alert("La requête a échouée");
    };
    xhr.onload = function(){
        if (xhr.responseXML != null)
        {   
            var xml = xhr.responseXML; // le fichier XML choisi
            // console.log(xml.getElementsByTagName('Titre_AT')[0].textContent); 
            // PREMIERE PAGE
            loadFields(xml,'text',['Titre_AT','Titulaire','Code_Titulaire','Industriel','Code_Industriel','Num_AT'],'list-generalites');
            addArrayField(xml,'Num_AT_Ancien','Num_AT_Ancien','list-generalites');
            addEmptyDiv('NumATAncienField','list-generalites');
            addButton("addEmptyField('Num_AT_Ancien[]','text','NumATAncienField')",'+','list-generalites');
            loadFields(xml,'text',['Date_Application','Date_Fin_Application','Usage_EA'],'list-generalites');
            addText('Usages :','list-generalites');
            loadFields(xml,'checkbox',['Collectif','Individuel','Hotel'],'list-generalites');
            addText('Caractéristiques :','list-generalites');
            loadFields(xml,'checkbox',['Double_Flux','Autoreglable','Hygroreglable','Basse_Pression'],'list-generalites');
            addField(xml,'Type_Extraction','text','Type_Extraction',0,'list-generalites')
            // DEUXIEME PAGE
            loadATS(xml);
            };
        }
    };
    

    function loadFields(xml,type, fields,divId){
        fields.forEach(element => addField(xml,element,type,element,0,divId));
    }

    function addField(xml,name,type,label,position,divId) //crée un input dans un container id
    {
        var lab = document.createElement("label");
        var input = document.createElement("input");  
        
        if(typeof(xml.getElementsByTagName(name)[position])!=='undefined' && xml.getElementsByTagName(name)[position]!==null)
            {var value = xml.getElementsByTagName(name)[position].textContent;}
        else{var value ="";}

        input.type = type;
        input.name = name;        
        input.id = name;
        lab.innerHTML = label;
        lab.htmlFor = name;

        switch(type){
            case 'text':
                input.value = value;
                break;
            case 'number':
                input.value = value;
                break;
            case 'checkbox':
                input.value = name;
                lab.setAttribute('class','form-check-label');
                input.setAttribute('class','form-check-input');
                switch(value){
                    case 'true':
                        input.checked = true;
                        break;
                    case 'false':
                        input.checked = false;
                        break;
                }
                break;
        } 
        var container = document.getElementById(divId);
        container.appendChild(lab);
        container.appendChild(input);
    };

    function addArrayField(xml,name,label,divId)
    {    
        var lab = document.createElement("label");
        lab.innerHTML = label;
        lab.htmlFor = name;
        var container = document.getElementById(divId);
        container.appendChild(lab);
        var i = 0;
        while(typeof(xml.getElementsByTagName(name)[i])!=='undefined' && xml.getElementsByTagName(name)[i]!==null){
            var input = document.createElement("input");
            input.type = 'text';
            input.name = name+'[]';
            input.id = name;
            input.value = xml.getElementsByTagName(name)[i].textContent; ; 
            container.appendChild(input);  
            i++;
        }
    };

    function addEmptyField(name,type,divId)
    {
        var input = document.createElement("input");   
        input.type = type;
        input.name = name;
        input.id = name;
        var container = document.getElementById(divId);
        container.appendChild(input);
    };
    
    function addEmptyDiv(id,divId){
        var div = document.createElement("div"); 
        div.id = id;
        var container = document.getElementById(divId);
        container.appendChild(div);
    };

    function addText(content,divId){
        var p = document.createElement('p');
        var text = document.createTextNode(content);
        p.appendChild(text);
        var container = document.getElementById(divId);
        container.appendChild(p);
    };

    function addButton(onclick,content,divId)
{
    var button = document.createElement("button"); 
    button.type = "button";
    button.href = '#';
    button.innerHTML = content;
    button.className = "btn btn-primary";
    button.setAttribute("onclick", onclick)
    var container = document.getElementById(divId);
    container.appendChild(button);
};

function addCheckbox(name,lab,id) //crée un input dans un container id
{
    var input = document.createElement("input");   
    var label = document.createElement("label");
    input.type = 'checkbox';
    input.name = name;
    input.className="form-check-input";
    label.innerHTML = lab;
    label.htmlFor = name;
    label.className = "form-check-label";
    var container = document.getElementById(id);
    container.appendChild(label);
    container.appendChild(input);
};

// ATS

function loadATS(xml){
const containerNav = document.getElementById('nav_ats'); //navbar des ats
const referenceNavButton = document.getElementById('addAT'); // bouton + at
const containerContent = document.getElementById('at_content'); //contenu des ats
var i = 0;
while(typeof(xml.getElementsByTagName('AT')[i])!=='undefined' && xml.getElementsByTagName(('AT'))[i]!==null){
    var AT = xml.getElementsByTagName('AT')[i];
    var index = parseInt(i+1);
    var navItem = document.createElement("li");
    var button = document.createElement("button"); 
    var div = document.createElement("div");
    // Nav AT
    navItem.setAttribute('class', 'nav-item');  
    button.id = "at_"+index+"-tab";
    button.type="button";
    button.innerHTML = "At_"+index;
    button.setAttribute('class', 'nav-link');
    button.setAttribute('data-bs-toggle','tab');
    button.setAttribute('data-bs-target',"#at_"+index+"-tab-pane");
    button.setAttribute('aria-controls',"at_"+index+"-tab-pane");
    button.setAttribute('aria-selected','true');
    navItem.appendChild(button);
    containerNav.insertBefore(navItem,referenceNavButton);
    // Content AT
    div.id="at_"+index+"-tab-pane";
    div.setAttribute('class','tab-pane fade');
    div.setAttribute('aria-labelledby','at_'+index+'-tab');
    div.setAttribute('tabindex','0');
    // on ajoute tout le contenu à la div
    containerContent.appendChild(div);
    addField(xml,'REF_AT','text','REF_AT',i,div.id);
    addField(xml,'LIBELLE','text','LIBELLE',i,div.id);
    addField(xml,'Type_Avis_Technique','text','Type_Avis_Technique',i,div.id);
    addField(xml,'HYGRO_A','checkbox','HYGRO_A',i,div.id);
    addField(xml,'HYGRO_B1','checkbox','HYGRO_B1',i,div.id);
    addField(xml,'HYGRO_B2','checkbox','HYGRO_B2',i,div.id);
    addField(xml,'GAZ','checkbox','GAZ',i,div.id);
    addText('Type EA :',div.id);
    addField(xml,'Presence_EA','text','Presence_EA',i,div.id);
    addField(xml,'Presence_EA_Fixes','checkbox','Presence_EA_Fixes',i,div.id);
    addField(xml,'Presence_EA_Autoreglables','checkbox','Presence_EA_Autoreglables',i,div.id);
    addField(xml,'Dp1','number','Dp1',i,div.id);
    addField(xml,'Dp2','number','Dp2',i,div.id);
    addField(xml,'R_f','number','R_f',i,div.id);
    addField(xml,'Optimisation','checkbox','Optimisation',i,div.id);
    // CONFIGURATIONS
    var container = document.getElementById(div.id); //ok
    // NAV CONFIG
    var navConfig = document.createElement("ul"); 
    navConfig.id = 'navConfigs_AT'+index;
    navConfig.setAttribute('class', 'nav nav-pills');
    // CONTENT CONFIG
    div = document.createElement('div');
    div.setAttribute('class', 'tab-content');
    div.id = ('AT'+index+'configs-content');

    var j = 0; //on itere sur les configs.
    while(typeof(AT.getElementsByTagName('CONFIG')[j])!=='undefined' && AT.getElementsByTagName(('CONFIG'))[j]!==null)
        {
            // NavConfig : items
            var indexConfig = parseInt(j+1);
            var itemNavConfig = document.createElement("li");
            itemNavConfig.setAttribute('class', 'nav-itemm');
            itemNavConfig.id = "AT"+index+"Config"+indexConfig;
            var buttonNavConfig = document.createElement("button");
            buttonNavConfig.setAttribute('class', 'nav-link');
            buttonNavConfig.setAttribute('data-bs-toggle', 'tab');
            buttonNavConfig.setAttribute('data-bs-target', '#AT'+index+"Config"+indexConfig+'-tab-pane');
            buttonNavConfig.setAttribute('aria-controls', 'AT'+index+"Config"+indexConfig+'-tab-pane');
            buttonNavConfig.setAttribute('aria-selected', 'false');    
            buttonNavConfig.type = 'button';
            buttonNavConfig.id = "AT"+index+"Config"+indexConfig+"-tab";
            buttonNavConfig.innerHTML = "Config"+indexConfig;
            itemNavConfig.appendChild(buttonNavConfig);
            navConfig.appendChild(itemNavConfig);
            
            // CONFIG : CONTENT
            
            config = document.createElement('div'); //formulaire de la config At1Congig1
            config.id = "AT"+index+"Config"+indexConfig+"-tab-pane";
            config.setAttribute('class','tab-pane fade');
            config.setAttribute('aria-labelledby','AT'+index+'Config'+indexConfig+'-tab');
            config.setAttribute('tabindex',"0");
            
            addFormConfig(AT,'Type_Logement','text','Type_Logement',j,config);
            addFormConfig(AT,'Config_Optimisee','checkbox','Config_Optimisee',j,config);
            addFormConfig(AT,'Changement_Bouche','checkbox','Changement_Bouche',j,config);
            addFormConfig(AT,'Singularite_EA','text','Singularite_EA',j,config);
            addFormConfig(AT,'EA_Fixes','checkbox','EA_Fixes',j,config);
            addFormConfig(AT,'EA_Autoréglables','checkbox','EA_Autoréglables',j,config);
            loadFormConfig(AT,'number',['Nb_Sdb_WC', 'Nb_Sdb', 'Nb_WC', 'Nb_Sde','Cdep', 'Cdep', 'Qv_Rep', 'Smea_Existant', 'Module_1', 'Module_2', 'Qsupp_Sdb', 'Qsupp_WC', 'Qsupp_Sdb_WC', 'Qsupp_Cellier'],j,config);         
            div.appendChild(config);
            j++;
        }  

    container.appendChild(navConfig); 
    container.appendChild(div); 
    i++;
    }//end while
};

function loadFormConfig(xml,type, fields,position,config){
    fields.forEach(element => addFormConfig(xml,element,type,element,position,config));
};


function addFormConfig(xml,name,type,label,position,config){

    if(typeof(xml.getElementsByTagName(name)[position])!=='undefined' && xml.getElementsByTagName(name)[position]!==null)
            {var value = xml.getElementsByTagName(name)[position].textContent;}
    else{var value ="";}

    var lab = document.createElement("label");
    var input = document.createElement("input");  
    input.type = type;  
    input.name = name+'[]';      
    input.id = name+config.id;
    lab.innerHTML = label;
    lab.htmlFor = name;
    
    switch(type){
        case 'text':
            input.value = value;
            break;
        case 'number':
            input.value = value;
            break;
        case 'checkbox':
            input.value = name;
            lab.setAttribute('class','form-check-label');
            input.setAttribute('class','form-check-input');
            switch(value){
                case 'true':
                    input.checked = true;
                    break;
                case 'false':
                    input.checked = false;
                    break;
            }
            break;
    } 
    config.appendChild(lab);
    config.appendChild(input);
};
