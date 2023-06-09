
// DYNAMIQUES

function addField(idHTML,type,idContainer)
{
    var input = document.createElement("input");
    input.type = type;

    var container = document.getElementById(idContainer);
    idHTML +="_"+container.children.length;
    input.id=idHTML;
    input.name=idHTML;
    input.setAttribute('class' , 'form-control mt-1');
    container.appendChild(input);
}

function addLabelledField(idHTML,type,container,bsClass,labelContent)
{
    var input = document.createElement("input");
    input.type = type;
    input.id=idHTML;
    input.name=idHTML;
    input.setAttribute('class' , bsClass);

    var lab = document.createElement("label");
    lab.setAttribute('for',idHTML);
    lab.innerHTML = labelContent;

    container.appendChild(lab);
    container.appendChild(input);
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
    if (buttonHTML == 'AT')
    {buttonHTML += containerNav.children.length;}
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

function newEquipement(Eqpmt){
    var container = document.getElementById('table_'+Eqpmt).children[1];
    var data = new FormData();
    data.append('index', parseInt(container.children.length+1));
    if(Eqpmt=='Solution')
    {data.append('nbr_cols', parseInt(container.children[0].children.length-1));}
    var xhr = new XMLHttpRequest();
    xhr.open('POST', "/view/_form/_"+Eqpmt.toLowerCase()+'_row.php', true); // false car on veut le faire de façon synchrone
    xhr.onload = function () {
        container.insertAdjacentHTML('beforeend' ,xhr.responseText);     
    };
    xhr.send(data);
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

function solutionsNewconfig()
{
    var tbody = document.getElementById('table_Solution').children[1];
    var thead = document.getElementById('table_Solution').children[0];
    var indexConfig = parseInt(thead.children[0].children.length-1);
    //thead
    var tr = thead.children[0];
    var th = document.createElement('th');
    th.innerHTML = "Config"+indexConfig;
    tr.insertBefore(th,tr.children[indexConfig]);
    //tbody
    for (var i=1; i<=tbody.children.length; i++)
    {
        var tr = tbody.children[i-1]
        var td = document.createElement('td');
        addLabelledField("Solution"+i+"_Config"+indexConfig+"_Solution_Libelle",'text',td,'form-control','Libelle :');
        addLabelledField("Solution"+i+"_Config"+indexConfig+"_Code",'text',td,'form-control','Code :');
        addLabelledField("Solution"+i+"_Config"+indexConfig+"_Nombre",'number',td,'form-control','Nombre :');
        tr.appendChild(td);

    }
}

function updateATName(indexAT)
{
    var titreAT = document.getElementById("AT"+indexAT+"-tab");
    var newValue = document.getElementById("AT"+indexAT+"_REF_AT").value;
    titreAT.innerHTML = newValue;
}

function updateConfigName(indexAT,indexConfig)
{
    var buttonConfig = document.getElementById("AT"+indexAT+"Config"+indexConfig+"-tab");
    var newValue = "Config"+indexConfig+" (T"+document.getElementById("AT"+indexAT+"Config"+indexConfig+"_Type_Logement").value+")";
    buttonConfig.innerHTML = newValue;
}

function editTitleAT()
{
    var h2 = document.getElementById('titleAT');
    var inputDiv = document.getElementById('titleATInputDiv');
    h2.setAttribute('hidden', 'true');
    inputDiv.removeAttribute('hidden');
}

function saveTitleAT(){
    var h2 = document.getElementById('titleAT');
    var inputDiv = document.getElementById('titleATInputDiv');
    var input = document.getElementById('titleATInput');
    var newTitle = input.value;
    h2.innerHTML = newTitle + "<img onclick='editTitleAT()' src='./css/bootstrap-icons/pencil-square.svg' alt='edit' width='32' height='32'></img>";
    inputDiv.setAttribute('hidden', 'true');
    h2.removeAttribute('hidden');
}

function resetTitleAT(){
    var h2 = document.getElementById('titleAT');
    var inputDiv = document.getElementById('titleATInputDiv');
    inputDiv.setAttribute('hidden', 'true');
    h2.removeAttribute('hidden');
}