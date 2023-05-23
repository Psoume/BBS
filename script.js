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
            
            // PREMIERE PAGE
            loadFields(xml,'text',['Titre_AT','Titulaire','Code_Titulaire','Industriel','Code_Industriel','Num_AT'],'list-generalites');
            addEmptyDiv('NumATAncienField','list-generalites');
            addArrayField(xml,'Num_AT_Ancien','Num_AT_Ancien','NumATAncienField');
            
            addButton("addEmptyField('Num_AT_Ancien','text','NumATAncienField')",'+','list-generalites');
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
    

// ATS
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
        loadFieldsAT(xml,'text',['REF_AT','LIBELLE','Type_Avis_Technique'],i,div)
        loadFieldsAT(xml,'checkbox',['HYGRO_A','HYGRO_B1','HYGRO_B2','GAZ'],i,div)
        addText('Type EA :',div.id);
        addFieldAT(xml,'Presence_EA','text','Presence_EA',i,div);
        loadFieldsAT(xml,'checkbox',['Presence_EA_Fixes','Presence_EA_Autoreglables'],i,div)
        loadFieldsAT(xml,'number',['Dp1','Dp2','R_f'],i,div)
        addFieldAT(xml,'Optimisation','checkbox','Optimisation',i,div);
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
                
                addFieldConfig(AT,'Type_Logement','text','Type_Logement',j,config);
                loadFieldsConfig(AT,'checkbox',['Config_Optimisee','Changement_Bouche'],j,config);  
                addFieldConfig(AT,'Singularite_EA','text','Singularite_EA',j,config);
                loadFieldsConfig(AT,'checkbox',['EA_Fixes','EA_Autoréglables'],j,config);         
                loadFieldsConfig(AT,'number',['Nb_Sdb_WC', 'Nb_Sdb', 'Nb_WC', 'Nb_Sde'],j,config);  
                loadFieldsConfig(AT,'number',['Qv_Rep', 'Smea_Existant', 'Module_1', 'Module_2', 'Qsupp_Sdb', 'Qsupp_WC', 'Qsupp_Sdb_WC', 'Qsupp_Cellier'],j,config);         
                div.appendChild(config);
                addTableConfig(configXML,"AT"+index+"Config"+indexConfig);
                j++;
            }  
    
        container.appendChild(navConfig); 
        container.appendChild(div); 
        i++;
        }//end while
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


    
    // ADD MAIN FIELDS

    function loadFieldsAT(xml,type, fields,position,div){
        fields.forEach(element => addFieldAT(xml,element,type,element,position,div));
    };
    
    
    function addFieldAT(xml,name,type,label,position,div){
    
        if(typeof(xml.getElementsByTagName(name)[position])!=='undefined' && xml.getElementsByTagName(name)[position]!==null)
                {var value = xml.getElementsByTagName(name)[position].textContent;}
        else{var value ="";}
    
        var lab = document.createElement("label");
        var input = document.createElement("input");  
        input.type = type;  
        input.name = name+'_AT'+parseInt(position+1);      
        input.id = name+'_AT'+parseInt(position+1);
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
        div.appendChild(lab);
        div.appendChild(input);
    };

    function loadFieldsConfig(xml,type, fields,position,config){
        fields.forEach(element => addFieldConfig(xml,element,type,element,position,config));
    };
    
    
    function addFieldConfig(xml,name,type,label,position,config){
    
        if(typeof(xml.getElementsByTagName(name)[position])!=='undefined' && xml.getElementsByTagName(name)[position]!==null)
                {var value = xml.getElementsByTagName(name)[position].textContent;}
        else{var value ="";}
    
        var lab = document.createElement("label");
        var input = document.createElement("input");  
        input.type = type;  
        input.name = (name+'_'+config.id).replace('-tab-pane','');     
        input.id = (name+'_'+config.id).replace('-tab-pane','');
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

// END MAIN ADD FIELDS

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
            input.name = name+'_'+parseInt(i+1);
            input.id = name+'_'+parseInt(i+1);
            input.value = xml.getElementsByTagName(name)[i].textContent; ; 
            container.appendChild(input);  
            i++;
        }
    };

    function addEmptyField(name,type,divId) // sert notamment pour Num_AT_Ancien
    {
        var container = document.getElementById(divId);
        var input = document.createElement("input");
        index = container.children.length;  
        input.type = type;
        input.name = name+'_'+index;
        input.id = name+'_'+index;
        
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

function addTableConfig(Config,id)
{
    var table = document.createElement("table");
    table.setAttribute('class','table table-sm table-bordered');
    // TABLE HEAD
    var thead = document.createElement("thead");
    thead.setAttribute('class','table-dark');
    var tr = document.createElement("tr");
    var colnames =['Pièce','Code','Qvrep']; 
    for (let i=0;i<3;i++){
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
        var tr = document.createElement('tr');
        var th = document.createElement('th');
        th.setAttribute('scope','row');
        addFieldTableConfig(room,'Name',id,'text',th);
        tr.appendChild(th);
        var td = document.createElement('td');
        addFieldTableConfig(room,'Code',id,'text',td);
        tr.appendChild(td);
        var td = document.createElement('td');
        addFieldTableConfig(room,'Qvrep',id,'text',td);
        tr.appendChild(td);
        tbody.appendChild(tr);
    i++;
    }

    table.appendChild(thead);
    table.appendChild(tbody);
    config.appendChild(table);
};

function addFieldTableConfig(room,name,id,type,div){
    var input = document.createElement('input');
    switch (name){
        case 'Name':
            input.value = room.nodeName;
            break;
        default:
            if(typeof(room.getElementsByTagName(name)[0])!=='undefined' && room.getElementsByTagName(name)[0]!==null)
            input.value = room.getElementsByTagName(name)[0].textContent;
            break;
    };
    
    input.name = id+'_'+name;
    input.id = id+'_'+name;
    input.type = type;
    div.appendChild(input);

}