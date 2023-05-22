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
            loadATS(xml)
                // document.getElementById("Titulaire").value=xml.getElementsByTagName('Titulaire')[0].textContent;
                // document.getElementById("Code_Titulaire").value=xml.getElementsByTagName('Code_Titulaire')[0].textContent;
                // document.getElementById("Industriel").value=xml.getElementsByTagName('Industriel')[0].textContent;
                // document.getElementById("Code_Industriel").value=xml.getElementsByTagName('Code_Industriel')[0].textContent;
                // document.getElementById("Num_AT").value=xml.getElementsByTagName('Num_AT')[0].textContent; 
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
            addFormConfig(AT,'Type_Logement','text','Type_Logement',j,config)
            addFormConfig(AT,'Config_Optimisee','checkbox','Config_Optimisee',j,config)
            addFormConfig(AT,'Changement_Bouche','checkbox','Changement_Bouche',j,config)
            addFormConfig(AT,'Singularite_EA','text','Singularite_EA',j,config)
            addFormConfig(AT,'EA_Fixes','checkbox','EA_Fixes',j,config)
            addFormConfig(AT,'EA_Autoréglables','checkbox','EA_Autoréglables',j,config)
            addFormConfig(AT,'Nb_Sdb_WC','number','Nb_Sdb_WC',j,config)            
            addFormConfig(AT,'Nb_Sdb','number','Nb_Sdb',j,config)            
            addFormConfig(AT,'Nb_WC','number','Nb_WC',j,config)            
            addFormConfig(AT,'Nb_Sde','number','Nb_Sde',j,config)   
            addFormConfig(AT,'Cdep','number','Cdep',j,config) 
            addFormConfig(AT,'Qv_Rep','number','Qv_Rep',j,config)
            addFormConfig(AT,'Smea_Existant','number','Smea_Existant',j,config)  
            addFormConfig(AT,'Module_1','number','Module_1',j,config)  
            addFormConfig(AT,'Module_2','number','Module_2',j,config)  
            addFormConfig(AT,'Qsupp_Sdb','number','Qsupp_Sdb',j,config)  
            addFormConfig(AT,'Qsupp_WC','number','Qsupp_WC',j,config)  
            addFormConfig(AT,'Qsupp_Sdb_WC','number','Qsupp_Sdb_WC',j,config)  
            addFormConfig(AT,'Qsupp_Cellier','number','Qsupp_Cellier',j,config)            
            div.appendChild(config);
            j++;
        }  

    container.appendChild(navConfig); 
    container.appendChild(div); 
    i++;
    }//end while
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
// function addModal(id) // id étant le nom du container dans lequel on crée le bouton modal (ex : ConfigsAT1)
// {
//     var container = document.getElementById(id);
//     var NbrConfigs = container.childElementCount+1;

//     // On crée la div ConfigsAT1_1
//     var newDiv = document.createElement("div");
//     var newDivId = id+"_"+NbrConfigs; //newDivId = ConfigsAT1_1
//     newDiv.className = "modalConfig";
//     newDiv.id = newDivId;
//     container.appendChild(newDiv);

//     // On crée le bouton dans ConfigsAT1_1
//     var button = document.createElement("button"); 
//     button.type = "button";
//     button.innerHTML = "Config"+NbrConfigs;
//     button.className = "btn btn-primary";
//     button.setAttribute("data-bs-toggle", "modal");
//     button.setAttribute("data-bs-target", "#Modal_"+newDivId );
//     newDiv.appendChild(button);

//     // On crée le modal à la suite du bouton
//     // On crée d'abord la div qui va contenir le modal

//     var divModalContent = document.createElement("div");
//     divModalContent.className = "modal fade";
//     divModalContent.id = "Modal_"+newDivId;
//     divModalContent.setAttribute("tabindex","-1");
//     divModalContent.setAttribute("aria-labelledby","Modal_"+newDivId+"Label");
//     divModalContent.setAttribute("aria-hidden","true");
//     newDiv.appendChild(divModalContent);
//     newDivModal = document.createElement("div");


//     loadConfig("Modal_"+newDivId);
//     // D'abord on charge le modal puis on modifie le contenu

    
// };



/////////////////////////////////////

// document.getElementById("NB_AT").value=0;

// document.getElementById("NB_AT").onchange = function() {

//     var NbAT = document.getElementById("NB_AT").value;
//     var container = document.getElementById("ATS"); // container = id=ATS
    
//     if(NbAT>container.childElementCount)
//     {
//         var diff = NbAT-container.childElementCount;
        
//         for (var i=0; i<diff; i++)
//         { 
//             var newDiv = document.createElement("div"); //new div = bordure bleue
//             newDiv.className='AT';
//             newDiv.id = 'AT'+(parseInt(container.childElementCount)+1);
//             container.appendChild(newDiv);
//             addField("REF_AT",'text','REF_AT',newDiv.id);
//             addField("LIBELLE",'text','LIBELLE',newDiv.id);
//             addField("Type_Avis_Technique",'text','Type_Avis_Technique',newDiv.id);
//             addCheckbox('HYGRO_A','HYGRO_A',newDiv.id);
//             addCheckbox('HYGRO_B1','HYGRO_B1',newDiv.id);
//             addCheckbox('HYGRO_B2','HYGRO_B2',newDiv.id);
//             addCheckbox('GAZ','GAZ',newDiv.id);
//             addField("Presence_EA",'text','Presence_EA',newDiv.id);
//             addCheckbox('Presence_EA_Fixes','Presence_EA_Fixes',newDiv.id);
//             addCheckbox('Presence_EA_Autoreglables','Presence_EA_Autoreglables',newDiv.id);
//             addField("Dp1",'number','Dp1',newDiv.id);
//             addField("Dp2",'number','Dp2',newDiv.id);
//             addField("R_f",'number','R_f',newDiv.id);
//             addCheckbox('Optimisation','Optimisation',newDiv.id);
//             addField("NB_CONFIG",'number','NB_CONFIG',newDiv.id);
//             var newDivConfig = document.createElement("div"); //newDivConfig = ConfigsAT1
//             newDivConfig.className='Configs';
//             newDivConfig.id='ConfigsAT'+(parseInt(container.childElementCount));
//             newDiv.appendChild(newDivConfig);
//             addButton('+ Ajouter une config','addModal("'+newDivConfig.id+'")',newDiv.id)
//         };   
//     }

//     else if (NbAT<container.childElementCount)
//     {
//         var diff = container.childElementCount-NbAT;
//         for (var i=0; i<diff; i++)
//         {
//         var dernierElement = container.lastElementChild;

//         if (dernierElement) {
//             container.removeChild(dernierElement);
//             };
//         };
//     }; 

// };


/////////////////////////////////////
//Pre-remplissage des champs si on lui fournit un fichier XML

// var form = document.getElementById("XML_Form");

// form.addEventListener("submit", function(event) {
//     event.preventDefault(); 

//     var fileInput = document.getElementById("Xml_File");
//     var file = fileInput.files[0];

//     if (file) {
//     var reader = new FileReader();
//     reader.onload = function(e) {
//         var xmlContent = e.target.result;
//         const parser = new DOMParser();
//         xml = parser.parseFromString(xmlContent, "application/xml").documentElement;
//         document.getElementById("Titre_AT").value=xml.getElementsByTagName('Titre_AT')[0].textContent;
//         document.getElementById("Titulaire").value=xml.getElementsByTagName('Titulaire')[0].textContent;
//         document.getElementById("Code_Titulaire").value=xml.getElementsByTagName('Code_Titulaire')[0].textContent;
//         document.getElementById("Industriel").value=xml.getElementsByTagName('Industriel')[0].textContent;
//         document.getElementById("Code_Industriel").value=xml.getElementsByTagName('Code_Industriel')[0].textContent;
//         document.getElementById("Num_AT").value=xml.getElementsByTagName('Num_AT')[0].textContent;

//         };
//     reader.readAsText(file);
//     }
// });