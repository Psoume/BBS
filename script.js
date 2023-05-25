
// Choix du fichier XML parmi ceux disponibles 
function chooseXML(at){
    window.location.href = ("?AT="+at);
};

// création d'un nouveau XML
// On va chercher base.xml et on l'enregistre comme name.xml
function createXML(is_blank){
    if (is_blank==false)
    {
        var fromFile = document.getElementById('createXMLFromFile').value;
        var fileName = prompt("Quel nom voulez-vous donner au nouveau fichier ?", "exemple.xml");
    }
    else{
        var fromFile = 'base.xml'
        var fileName = document.getElementById('XML_name').value;
    }
    if(fileName !== null && fileName!=="")
    {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'createXML.php?fileName='+fileName+'&fromFile='+fromFile+'&is_blank='+is_blank);
        xhr.send();
        xhr.onerror = function() 
        {
            alert("La requête a échouée");
        };
        xhr.onload = function()
        {
            chooseXML(fileName);
        }
    }
    
    
};

function deleteXML(filename){

    if(confirm('Voulez-vous vraiment supprimer le fichier '+filename+' ? Cette action est irréversible') == true)
    {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'deleteXML.php?name='+filename);
        xhr.send();
        xhr.onerror = function() 
        {
            alert("La requête a échouée");
        };
        xhr.onload = function()
        {
            window.location.href = ('/');    
        }
    }

};

// Se lance onload quand $_GET['AT'] !=null
// crée le formulaire + pré-remplit
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
            container = document.getElementById('titleAT');
            container.innerHTML = at;
            container = document.getElementById('titleATForm');
            container.value = at;
            var xml = xhr.responseXML; // le fichier XML choisi
            // PREMIERE PAGE
            loadGeneralites(xml);
            // DEUXIEME PAGE
            loadATS(xml);
            // TROISIEME PAGE
            loadEquipements(xml);
        };
    }
};

// PREMIERE PAGE : GENERALITES
function loadGeneralites(xml){
    var container = document.getElementById('list-generalites');
    loadFields(xml,'text',['Titre_AT','Titulaire','Code_Titulaire','Industriel','Code_Industriel','Num_AT'],container,'unite');
    addEmptyDiv('NumATAncienField',container);
    addArrayField(xml,'Num_AT_Ancien','Num_AT_Ancien','Num_AT_Ancien',document.getElementById('NumATAncienField'));
    addButton("addEmptyField('Num_AT_Ancien','text','NumATAncienField')",'+',container);
    loadFields(xml,'text',['Date_Application','Date_Fin_Application','Usage_EA'],container,'unite');
    addText('Usages :',container);
    loadFields(xml,'checkbox',['Collectif','Individuel','Hotel'],container,'unite');
    addText('Caractéristiques :',container);
    loadFields(xml,'checkbox',['Double_Flux','Autoreglable','Hygroreglable','Basse_Pression'],container,'unite');
    addField(xml,'Type_Extraction','Type_Extraction','text','Type_Extraction',0,container,'unite')
};

// DEUXIEME PAGE : ATS
function loadATS(xml){
    const containerNav = document.getElementById('nav_ats'); //navbar des ats
    const referenceNavButton = document.getElementById('addAT'); // bouton + at
    const containerContent = document.getElementById('at_content'); //contenu des ats
    var i = 0;
    // tant qu'il y a des AT dans le XML
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
        button.innerHTML = AT.getElementsByTagName('REF_AT')[0].textContent;
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
        loadFieldsAT(xml,'text',['REF_AT','LIBELLE','Type_Avis_Technique'],i,div,'unite')
        loadFieldsAT(xml,'checkbox',['HYGRO_A','HYGRO_B1','HYGRO_B2','GAZ'],i,div,'unite')
        addText('Type EA :',div);
        addFieldAT(xml,'Presence_EA','Presence_EA','text','Presence_EA',i,div,'unite');
        loadFieldsAT(xml,'checkbox',['Presence_EA_Fixes','Presence_EA_Autoreglables'],i,div,'unite')
        loadFieldsAT(xml,'number',['Dp1','Dp2','R_f'],i,div,'unite')
        addFieldAT(xml,'Optimisation','Optimisation','checkbox','Optimisation',i,div,'unite');
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
            var configXML = AT.getElementsByTagName('CONFIG')[j];
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
            
            config = document.createElement('div'); //formulaire de la config At1Config1
            config.id = "AT"+index+"Config"+indexConfig+"-tab-pane";
            config.setAttribute('class','tab-pane fade');
            config.setAttribute('aria-labelledby','AT'+index+'Config'+indexConfig+'-tab');
            config.setAttribute('tabindex',"0");
            
            addFieldConfig(AT,'Type_Logement','Type_Logement','text','Type_Logement',j,config,'unite');
            loadFieldsConfig(AT,'checkbox',['Config_Optimisee','Changement_Bouche'],j,config,'unite');  
            addFieldConfig(AT,'Singularite_EA','Singularite_EA','text','Singularite_EA',j,config,'unite');
            loadFieldsConfig(AT,'checkbox',['EA_Fixes','EA_Autoréglables'],j,config,'unite');         
            loadFieldsConfig(AT,'number',['Nb_Sdb_WC', 'Nb_Sdb', 'Nb_WC', 'Nb_Sde'],j,config,'unite');  
            addArrayField(AT.getElementsByTagName('CONFIG')[j],'Cdep','AT'+parseInt(i+1)+'Config'+parseInt(j+1)+'_Cdep','Cdep',config);
            loadFieldsConfig(AT,'number',['Qv_Rep', 'Smea_Existant', 'Module_1', 'Module_2', 'Qsupp_Sdb', 'Qsupp_WC', 'Qsupp_Sdb_WC', 'Qsupp_Cellier'],j,config,'unite');         
            div.appendChild(config);
            addTableConfig(configXML,"Humide","AT"+index+"Config"+indexConfig);
            addTableConfig(configXML,"Sec","AT"+index+"Config"+indexConfig);
            j++;
        }  
        container.appendChild(navConfig); 
        container.appendChild(div); 
        i++;
    }//end while
};

// TROISIEME PAGE : EQUIPEMENTS
function loadEquipements(xml)
{
    const eqpmts = xml.getElementsByTagName('Equipements')[0];
    const bouches = eqpmts.getElementsByTagName('Bouches');
    const entrees = eqpmts.getElementsByTagName('Entrees');
    const solutions = eqpmts.getElementsByTagName('Solutions');
    const extracteurs = eqpmts.getElementsByTagName('Extracteurs');

    const containerNav = document.getElementById('nav_eqpmt'); //navbar des ats
    const containerContent = document.getElementById('eqpmt_content'); //contenu des ats


};

//////////////////////////////////////////////////////////////////////////////////////////

function loadFields(xml,type, fields,div,unite){
    fields.forEach(element => addField(xml,element,element,type,element,0,div,unite));
    }

function addField(xml,nameXML,nameHTML,type,label,position,div,unite){ 
    var lab = document.createElement("label");
    var input = document.createElement("input");  
    
    if(typeof(xml.getElementsByTagName(nameXML)[position])!=='undefined' && xml.getElementsByTagName(nameXML)[position]!==null)
        {var value = xml.getElementsByTagName(nameXML)[position].textContent;}
    else{var value ="";}

    input.type = type;
    input.name = nameHTML;        
    input.id = nameHTML;
    lab.innerHTML = label;
    lab.htmlFor = nameHTML;

    switch(type){
        case 'text':
            input.value = value;
            break;
        case 'number':
            input.value = value;
            input.setAttribute('step','any');
            break;
        case 'checkbox':
            input.value = nameXML;
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
    div.appendChild(lab);
    div.appendChild(input);
};


function loadFieldsAT(xml,type, fields,position,div,unite){
    fields.forEach(element => addFieldAT(xml,element,element,type,element,position,div,unite));
};
    
    
function addFieldAT(xml,nameXML,nameHTML,type,label,position,div,unite)
{
    nameHTML = 'AT'+parseInt(position+1)+'_'+nameHTML;
    addField(xml,nameXML,nameHTML,type,label,position,div,unite);
};

function loadFieldsConfig(xml,type, fields,position,div,unite){
    fields.forEach(element => addFieldConfig(xml,element,element,type,element,position,div,unite));
};

function addFieldConfig(xml,nameXML,nameHTML,type,label,position,div,unite){

    nameHTML = (div.id+'_'+nameHTML).replace('-tab-pane','');      
    addField(xml,nameXML,nameHTML,type,label,position,div,unite);
};

function addArrayField(xml,nameXML,nameHTML,label,container)
{    
    var lab = document.createElement("label");
    lab.innerHTML = label;
    lab.htmlFor = nameHTML;
    container.appendChild(lab);
    var i = 0;
    while(typeof(xml.getElementsByTagName(nameXML)[i])!=='undefined' && xml.getElementsByTagName(nameXML)[i]!==null){
        var input = document.createElement("input");
        input.type = 'text';
        input.name = nameHTML+'_'+parseInt(i+1);
        input.id = nameHTML+'_'+parseInt(i+1);
        input.value = xml.getElementsByTagName(nameXML)[i].textContent; ; 
        container.appendChild(input);  
        i++;
    }
};
function addEmptyField(name,type,containerId) // sert notamment pour Num_AT_Ancien
{
    var container = document.getElementById(containerId);
    var input = document.createElement("input");
    index = container.children.length;  
    input.type = type;
    input.name = name+'_'+index;
    input.id = name+'_'+index;
    container.appendChild(input);
};

function addEmptyDiv(id,container){
    var div = document.createElement("div"); 
    div.id = id;
    container.appendChild(div);
};

function addText(content,container){
    var p = document.createElement('p');
    var text = document.createTextNode(content);
    p.appendChild(text);
    container.appendChild(p);
};

function addButton(onclick,content,container)
{
    var button = document.createElement("button"); 
    button.type = "button";
    button.href = '#';
    button.innerHTML = content;
    button.className = "btn btn-primary";
    button.setAttribute("onclick", onclick)
    container.appendChild(button);
};

function addCheckbox(name,lab,container) //crée un input dans un container id
{
    var input = document.createElement("input");   
    var label = document.createElement("label");
    input.type = 'checkbox';
    input.name = name;
    input.className="form-check-input";
    label.innerHTML = lab;
    label.htmlFor = name;
    label.className = "form-check-label";
    container.appendChild(label);
    container.appendChild(input);
};

function addTableConfig(Config,roomType,id)
{    
    var table = document.createElement("table");
    table.setAttribute('class','table table-sm table-bordered');

    switch (roomType){
        case 'Humide':
            var colnames =['Pièce','Code','Qvrep']; 
            var textTitle = document.createTextNode('Pièces Humides');
            break;
        case 'Sec':
            var colnames =['Pièce','Code']; 
            var textTitle = document.createTextNode('Pièces Sèches');
            break;
    }
    // TABLE HEAD
    var thead = document.createElement("thead");
    thead.setAttribute('class','table-dark');
    var tr = document.createElement("tr");

    for (let i=0;i<colnames.length;i++){
        var th = document.createElement('th');
        th.innerHTML = colnames[i];
        tr.appendChild(th);
    };
    thead.appendChild(tr);

    // TABLE BODY

    var tbody = document.createElement("tbody");
    tbody.setAttribute('class','border-dark');
    var i = 0;
    while(typeof(Config.getElementsByTagName('LOCAUX')[0].children[i])!=='undefined' && Config.getElementsByTagName('LOCAUX')[0].children[i]!==null)
    {
        var room = Config.getElementsByTagName('LOCAUX')[0].children[i];
        switch(roomType)
        {
            case 'Humide':
                if(typeof(room.getElementsByTagName('Qvrep')[0])=='undefined'){i++;continue;}
                break;
            
            case 'Sec':
                if(typeof(room.getElementsByTagName('Qvrep')[0])!=='undefined'){i++;continue;}
                break;
        }
        var tr = document.createElement('tr');
        var th = document.createElement('th');
        th.setAttribute('scope','row');
        addFieldTableConfig(room,'Name',roomType,id,'text',th,i);
        tr.appendChild(th);
        var td = document.createElement('td');
        addFieldTableConfig(room,'Code',roomType,id,'text',td,i);
        tr.appendChild(td);
        if(typeof(room.getElementsByTagName('Qvrep')[0])!=='undefined' && room.getElementsByTagName('Qvrep')[0]!==null)
        {
        var td = document.createElement('td');
        addFieldTableConfig(room,'Qvrep',roomType,id,'text',td,i);
        tr.appendChild(td);
        }
        tbody.appendChild(tr);
        i++;
    }
    var title = document.createElement('h3');
    title.appendChild(textTitle);

    config.appendChild(title);
    table.appendChild(thead);
    table.appendChild(tbody);
    config.appendChild(table);
};

function addFieldTableConfig(room,name,roomType,id,type,div,position){
    var input = document.createElement('input');
    switch (name){
        case 'Name':
            var value = room.nodeName;
            break;
        default:
            if(typeof(room.getElementsByTagName(name)[0])!=='undefined' && room.getElementsByTagName(name)[0]!==null)
            var value = room.getElementsByTagName(name)[0].textContent;
            break;
    };
    
    input.value = value;
    input.name = id+'_Locaux'+roomType[0]+'_'+name+'_'+parseInt(position+1);
    input.id = id+'_Locaux'+roomType[0]+'_'+name+'_'+parseInt(position+1);
    input.type = type;
    div.appendChild(input);

}