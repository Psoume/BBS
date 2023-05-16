//Pre-remplissage des champs si on lui fournit un fichier XML

var form = document.getElementById("XML_Form");

form.addEventListener("submit", function(event) {
    event.preventDefault(); 

    var fileInput = document.getElementById("Xml_File");
    var file = fileInput.files[0];

    if (file) {
    var reader = new FileReader();
    reader.onload = function(e) {
        var xmlContent = e.target.result;
        const parser = new DOMParser();
        xml = parser.parseFromString(xmlContent, "application/xml").documentElement;
        document.getElementById("Titre_AT").value=xml.getElementsByTagName('Titre_AT')[0].textContent;
        document.getElementById("Titulaire").value=xml.getElementsByTagName('Titulaire')[0].textContent;
        document.getElementById("Code_Titulaire").value=xml.getElementsByTagName('Code_Titulaire')[0].textContent;
        document.getElementById("Industriel").value=xml.getElementsByTagName('Industriel')[0].textContent;
        document.getElementById("Code_Industriel").value=xml.getElementsByTagName('Code_Industriel')[0].textContent;
        document.getElementById("Num_AT").value=xml.getElementsByTagName('Num_AT')[0].textContent;

        };
    reader.readAsText(file);
    }
});

/////////////////////////////////////

function addField(name,type,lab,id) //crée un input dans un container id
{
    var input = document.createElement("input");   
    var label = document.createElement("label");
    input.type = type;
    input.name = name;
    label.innerHTML = lab;
    label.htmlFor = name;
    var container = document.getElementById(id);
    container.appendChild(label);
    container.appendChild(input);
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

function addModal(name,target,id) 
{
    var button = document.createElement("button"); 
    button.type = "button";
    button.innerHTML = name;
    button.className = "btn btn-primary";
    button.setAttribute("data-bs-toggle", "modal")
    button.setAttribute("data-bs-target", "#"+target)
    var container = document.getElementById(id);
    container.appendChild(button);
};

function addButton(description,onclick,id)
{
    var button = document.createElement("button"); 
    button.type = "button";
    button.innerHTML = description;
    button.className = "btn btn-primary";
    button.setAttribute("onclick", onclick)
    var container = document.getElementById(id);
    container.appendChild(button);
}

/////////////////////////////////////

document.getElementById("NB_AT").value=0;

document.getElementById("NB_AT").onchange = function() {

    var NbAT = document.getElementById("NB_AT").value;
    var container = document.getElementById("ATS");
    
    if(NbAT>container.childElementCount)
    {
        var diff = NbAT-container.childElementCount;
        
        for (var i=0; i<diff; i++)
        { 
            var newDiv = document.createElement("div");
            newDiv.className='AT';
            newDiv.id = 'AT'+(parseInt(container.childElementCount)+1);
            container.appendChild(newDiv);
            addField("REF_AT",'text','REF_AT',newDiv.id);
            addField("LIBELLE",'text','LIBELLE',newDiv.id);
            addField("Type_Avis_Technique",'text','Type_Avis_Technique',newDiv.id);
            addCheckbox('HYGRO_A','HYGRO_A',newDiv.id);
            addCheckbox('HYGRO_B1','HYGRO_B1',newDiv.id);
            addCheckbox('HYGRO_B2','HYGRO_B2',newDiv.id);
            addCheckbox('GAZ','GAZ',newDiv.id);
            addField("Presence_EA",'text','Presence_EA',newDiv.id);
            addCheckbox('Presence_EA_Fixes','Presence_EA_Fixes',newDiv.id);
            addCheckbox('Presence_EA_Autoreglables','Presence_EA_Autoreglables',newDiv.id);
            addField("Dp1",'number','Dp1',newDiv.id);
            addField("Dp2",'number','Dp2',newDiv.id);
            addField("R_f",'number','R_f',newDiv.id);
            addCheckbox('Optimisation','Optimisation',newDiv.id);
            addField("NB_CONFIG",'number','NB_CONFIG',newDiv.id);
            var newDivConfig = document.createElement("div");
            newDivConfig.className='Configs';
            newDivConfig.id='ConfigsAT'+(parseInt(container.childElementCount));
            newDiv.appendChild(newDivConfig);
            addButton('+ Ajouter une config','addModal("Config1","Config1AT1","'+newDivConfig.id+'")',newDiv.id)
        };   
    }

    else if (NbAT<container.childElementCount)
    {
        var diff = container.childElementCount-NbAT;
        for (var i=0; i<diff; i++)
        {
        var dernierElement = container.lastElementChild;

        if (dernierElement) {
            container.removeChild(dernierElement);
            };
        };
    }; 

};


/////////////////////////////////////
