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
            console.log(xml.getElementsByTagName('Titre_AT')[0].textContent); //comment on accède aux éléments
            loadFields(xml,'text',['Titre_AT','Titulaire','Code_Titulaire','Industriel','Code_Industriel','Num_AT','Num_AT_Ancien[]'],'list-generalites');
            addEmptyDiv('NumATAncienField','list-generalites');
            addButton("addEmptyField('Num_AT_Ancien[]','text','NumATAncienField')",'+','list-generalites');
            loadFields(xml,'text',['Date_Application','Date_Fin_Application','Usage_EA'],'list-generalites');
            addText('Usages :','list-generalites');
            loadFields(xml,'checkbox',['Individuel','Collectif','Hotel'],'list-generalites');
            addText('Caractéristiques :','list-generalites');
            loadFields(xml,'checkbox',['Double_Flux','Autoreglable','Hygroreglable','Basse_Pression'],'list-generalites');
            addField(xml,'Type_extraction','text','Type_extraction','list-generalites')
                // document.getElementById("Titulaire").value=xml.getElementsByTagName('Titulaire')[0].textContent;
                // document.getElementById("Code_Titulaire").value=xml.getElementsByTagName('Code_Titulaire')[0].textContent;
                // document.getElementById("Industriel").value=xml.getElementsByTagName('Industriel')[0].textContent;
                // document.getElementById("Code_Industriel").value=xml.getElementsByTagName('Code_Industriel')[0].textContent;
                // document.getElementById("Num_AT").value=xml.getElementsByTagName('Num_AT')[0].textContent; 
            };
        }
    };
    

    function loadFields(xml,type, fields,divId){
        fields.forEach(element => addField(xml,element,type,element,divId));
    }

    function addField(xml,name,type,label,divId) //crée un input dans un container id
    {
        var lab = document.createElement("label");
        var input = document.createElement("input");  
        
        if(typeof(xml.getElementsByTagName(name)[0])!=='undefined' && xml.getElementsByTagName(name)[0]!==null)
            {var value = xml.getElementsByTagName(name)[0].textContent;}
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
            case 'checkbox':
                lab.htmlclass ='form-check-label' ;
                input.htmlclass = 'form-check-input';
                switch(value){
                    case 'true':
                        input.checked = true;
                        break;
                    case 'false':
                        input.checked = false;
                        break;
                }
                input.value = name;
                break;
        }
        
        
        var container = document.getElementById(divId);
        container.appendChild(lab);
        container.appendChild(input);
    };

    function addEmptyField(name,type,divId) //crée un input dans un container id
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


// function loadConfig(id) 
// {
//     // On crée le container pour le modalContent
//     var container = document.getElementById(id);
//     // On rajoute le reste du contenu
//     fetch("config.html")
//     .then(response => response.text())
//     .then(contenu => {
//         container.innerHTML = contenu;
//         console.log(contenu);
//     })
//     .catch(error => {
//         console.log("Erreur : " + error);
//     });
// }


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