
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

function addFieldSolution(idHTML,type,container,bsClass,labelContent)
{
    var col = document.createElement('div');
    if(labelContent =='Libelle:')
    {col.setAttribute('class','col-12');}
    else{col.setAttribute('class','col');}
    var input = document.createElement("input");
    input.type = type;
    input.id=idHTML;
    input.name=idHTML;
    input.setAttribute('class' , bsClass);

    var lab = document.createElement("label");
    lab.setAttribute('for',idHTML);
    lab.innerHTML = labelContent;

    col.appendChild(lab);
    col.appendChild(input);

    container.appendChild(col)
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
    xhr.open('POST', "view/_form/"+"_AT.php", true);

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


function addConfig(containerNavID,referenceNavButtonID,containerContentID,indexAT,indexConfig=null,configXML=null)
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
    loadPieces(indexAT,indexConfig,configXML)
}

function newEquipement(Eqpmt){
    var container = document.getElementById('table_'+Eqpmt).children[1];
    var data = new FormData();
    data.append('index', parseInt(container.children.length+1));
    if(Eqpmt=='Solution')
    {data.append('nbr_cols', parseInt(container.children[0].children.length-1));}
    var xhr = new XMLHttpRequest();
    xhr.open('POST', "view/_form/_"+Eqpmt.toLowerCase()+'_row.php', true); // false car on veut le faire de façon synchrone
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
    xhr.open('POST', "view/_form/"+fileName, true);
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
        // inputs
        var tr = tbody.children[i-1]
        var td = document.createElement('td');
        td.id = "Solution"+i+"_Config"+indexConfig+"_1";
        var row = document.createElement('div');
        row.setAttribute('class','row g-0');
        addFieldSolution("Solution"+i+"_Config"+indexConfig+"_Solution_Libelle",'text',row,'form-control','Libelle:');
        addFieldSolution("Solution"+i+"_Config"+indexConfig+"_Code_1",'text',row,'form-control','Code:');
        addFieldSolution("Solution"+i+"_Config"+indexConfig+"_Nombre_1",'number',row,'form-control','Nombre:');
        td.appendChild(row);
        // buttons
        row = document.createElement('div');
        row.setAttribute('class','row mt-2');
        col = document.createElement('div');
        col.setAttribute('class','col');
        var button = document.createElement('button');
        button.setAttribute('class','w-100 mt-1 btn btn-sm btn-primary border border-dark');
        button.type = 'button';
        button.innerHTML = 'Ajouter';
        button.setAttribute('onclick',"newSolution(this,"+i+","+indexConfig+")");
        col.appendChild(button);
        row.appendChild(col);
        col = document.createElement('div');
        col.setAttribute('class','col');
        var button = document.createElement('button');
        button.setAttribute('class','w-100 mt-1 btn btn-sm btn-light border border-dark');
        button.type = 'button';
        button.innerHTML = 'Supprimer';
        button.setAttribute('onclick',"removeSolution("+i+","+indexConfig+")");
        col.appendChild(button);
        row.appendChild(col);
        td.appendChild(row);
        //
        tr.appendChild(td);
    }
}

function solutionsRemoveconfig()
{
    var tbody = document.getElementById('table_Solution').children[1];
    var thead = document.getElementById('table_Solution').children[0];
    var indexElement = parseInt(thead.children[0].children.length-2);

    //Thead
    if(indexElement>1)
    {
        if(confirm("voulez-vous vraiment supprimer cette configuration ?")==true)
        {
            thead.children[0].children[indexElement].remove();
            //Tbody
            for (i=0;i<tbody.children.length;i++)
            {
                tbody.children[i].lastElementChild.remove();
            }
        }
    }

}

function newSolution(button,indexEqpmt,indexConfig)
{
    var container = document.getElementById('Solution'+indexEqpmt+'_Config'+indexConfig+'_1');
    var indexSolution = container.children.length;
    var row = document.createElement('div');
    row.setAttribute('class','row g-0');
    row.id = 'Solution'+indexEqpmt+'_Config'+indexConfig+'_'+indexSolution;
    var fields = ['Code','Nombre'];
    var fieldsType = ['text','number'];
    for(i=0;i<2;i++)
    {
        var col = document.createElement('div');
        col.setAttribute('class','col mt-2');
        var input = document.createElement('input');
        input.setAttribute('class','form-control');
        input.type = fieldsType[i];
        input.id = 'Solution'+indexEqpmt+'_Config'+indexConfig+'_'+fields[i]+'_'+indexSolution;
        input.name = 'Solution'+indexEqpmt+'_Config'+indexConfig+'_'+fields[i]+'_'+indexSolution;
        col.appendChild(input);
        row.appendChild(col);
    }
    container.insertBefore(row,button.parentElement.parentElement);
}

function removeSolution(indexEqpmt,indexConfig)
{
    container = document.getElementById('Solution'+indexEqpmt+'_Config'+indexConfig+'_1');
    if (container.children.length > 2)
    {
        container.lastChild.previousSibling.remove();
    }
}


function updateATName(indexAT)
{
    var titreAT = document.getElementById("AT"+indexAT+"-tab");
    var newValue = document.getElementById("AT"+indexAT+"_REF_AT").value;
    if (newValue==""){newValue = "AT"+indexAT;}
    titreAT.innerHTML = newValue;
}

function updateConfigName(indexAT,indexConfig)
{
    var buttonConfig = document.getElementById("AT"+indexAT+"Config"+indexConfig+"-tab");
    if (document.getElementById("AT"+indexAT+"Config"+indexConfig+"_Type_Logement").value !== "")
    {
        var newValue = "Config"+indexConfig+" (T"+document.getElementById("AT"+indexAT+"Config"+indexConfig+"_Type_Logement").value+")";
    }
    else { var newValue = "Config"+indexConfig;}

    var opti = document.getElementById("AT"+indexAT+"Config"+indexConfig+"_Config_Optimisee").checked;
    if(opti)
    {
        newValue += "(Opti)";
    }
    buttonConfig.innerHTML = newValue;
}


function toggleSingEA(indexAT,indexConfig,abled)
{
    if (abled)
    {
        document.getElementById("AT"+indexAT+"Config"+indexConfig+"_Module_1").disabled = false;
        document.getElementById("AT"+indexAT+"Config"+indexConfig+"_Module_2").disabled = false;
    }
    else
    {
        document.getElementById("AT"+indexAT+"Config"+indexConfig+"_Module_1").disabled = true;
        document.getElementById("AT"+indexAT+"Config"+indexConfig+"_Module_2").disabled = true;
    }
}

function deleteInput(containerID,limit)
{
    var container = document.getElementById(containerID);
    var element = container.children.item(parseInt(container.children.length-1));
    if(container.children.length > limit)
    {
        if((element.value !== 'undefined' && element.value!=="") ||(element.value == 'undefined') )
        {
            if(confirm("voulez-vous vraiment supprimer cette entrée ?")==true)
            {
                element.remove();
            }
        } 
        else{element.remove();}
    }
}

function datalist(Eqpmt,datalistID)
{
    var datalist = document.getElementById(datalistID);
    var options = "";
    var i = 1;    

    while (document.getElementById(Eqpmt+i+"_Code") !== null)
    {
        var code = document.getElementById(Eqpmt+i+"_Code").value;
        options += "<option value='"+code+"'>";
        i++;
    }
    datalist.innerHTML = options;
}


function checkCodeRoom(Eqpmt,input)
{
    var liste = [];
    var i = 1;

    while (document.getElementById(Eqpmt+i+"_Code") !== null)
    {
        liste.push(document.getElementById(Eqpmt+i+"_Code").value);
        i++;
    }

    if(liste.includes(input.value))
    {
        input.classList.remove("border-danger");
        input.classList.remove("border");
    }
    else
    {
        input.classList.add("border-danger");
        input.classList.add("border");
    }
}