
// Se lance onload quand $_GET['AT'] !=null
// crée le formulaire + pré-remplit
function loadXML(at) {
    let xhr = new XMLHttpRequest();

    xhr.open("GET", "/res/XML/" + at);
    xhr.send();

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
            loadGeneralites(xml);
            // DEUXIEME PAGE
            loadATS(xml);
            // TROISIEME PAGE
            loadEquipements(xml);
        }
    };
}

// PREMIERE PAGE : GENERALITES
function loadGeneralites(xml) {
    var container = document.getElementById("list-generalites");
    addField(xml,"Titre_AT","Titre_AT","text","Titre_AT",container,);
    addFields(xml,"text",["Titulaire","Code_Titulaire","Industriel","Code_Industriel","Num_AT",],container);
    addEmptyDiv(container,"NumATAncienField");
    addArrayField(xml,"Num_AT_Ancien","Num_AT_Ancien","Num_AT_Ancien", document.getElementById("NumATAncienField"));
    addButton("addEmptyField('Num_AT_Ancien','text','NumATAncienField')","+",container);
    addFields(xml,"text",["Date_Application", "Date_Fin_Application", "Usage_EA"],container,);
    addText("Usages :", container);
    addFields(xml,"checkbox",["Collectif", "Individuel", "Hotel"],container,);
    addText("Caractéristiques :", container);
    addFields(xml,"checkbox",["Double_Flux", "Autoreglable", "Hygroreglable", "Basse_Pression"],container,);
    addField(xml,"Type_Extraction","Type_Extraction","text","Type_Extraction",container,);
}

// DEUXIEME PAGE : ATS
function loadATS(xml) {
    const containerNav = document.getElementById("nav_ats"); //navbar des ats
    const referenceNavButton = document.getElementById("addAT"); // bouton + at
    const containerContent = document.getElementById("at_content"); //contenu des ats
    var i = 0;
    // tant qu'il y a des AT dans le XML
    while (
        typeof xml.getElementsByTagName("AT")[i] !== "undefined" &&
        xml.getElementsByTagName("AT")[i] !== null
    ) {
        var AT = xml.getElementsByTagName("AT")[i];
        var index = parseInt(i + 1);
        var navItem = document.createElement("li");
        var button = document.createElement("button");
        var div = document.createElement("div");
        // Nav AT
        navItem.setAttribute("class", "nav-item");
        button.id = "at_" + index + "-tab";
        button.type = "button";
        button.innerHTML = AT.getElementsByTagName("REF_AT")[0].textContent;
        if (i == 0) {
            button.setAttribute("class", "active nav-link");
        } else {
            button.setAttribute("class", "nav-link");
        }
        button.setAttribute("data-bs-toggle", "tab");
        button.setAttribute("data-bs-target", "#at_" + index + "-tab-pane");
        button.setAttribute("aria-controls", "at_" + index + "-tab-pane");
        button.setAttribute("aria-selected", "true");
        navItem.appendChild(button);
        containerNav.insertBefore(navItem, referenceNavButton);
        // Content AT
        div.id = "at_" + index + "-tab-pane";
        if (i == 0) {
            div.setAttribute("class", "show active tab-pane fade");
        } else {
            div.setAttribute("class", "tab-pane fade");
        }
        div.setAttribute("aria-labelledby", "at_" + index + "-tab");
        div.setAttribute("tabindex", "0");
        // on ajoute tout le contenu à la div
        containerContent.appendChild(div);
        addFieldsAT(AT,"text",["REF_AT", "LIBELLE", "Type_Avis_Technique"],div,"unite");
        addFieldsAT(AT,"checkbox",["HYGRO_A", "HYGRO_B1", "HYGRO_B2", "GAZ"],div,"unite");
        addText("Type EA :", div);
        addFieldAT(AT,"Presence_EA","Presence_EA","text","Presence_EA",div,"unite");
        addFieldsAT(AT,"checkbox",["Presence_EA_Fixes", "Presence_EA_Autoreglables"],div,"unite");
        addFieldsAT(AT, "number", ["Dp1", "Dp2", "R_f"], div, "unite");
        addFieldAT(AT,"Optimisation","Optimisation","checkbox","Optimisation",div,"unite");
        // CONFIGURATIONS
        var container = document.getElementById(div.id); //ok
        // NAV CONFIG
        var navConfig = document.createElement("ul");
        navConfig.id = "navConfigs_AT" + index;
        navConfig.setAttribute("class", "nav nav-pills");
        // CONTENT CONFIG
        div = document.createElement("div");
        div.setAttribute("class", "tab-content");
        div.id = "AT" + index + "configs-content";

        var j = 0; //on itere sur les configs.
        while (
            typeof AT.getElementsByTagName("CONFIG")[j] !== "undefined" &&
            AT.getElementsByTagName("CONFIG")[j] !== null
        ) {
            var configXML = AT.getElementsByTagName("CONFIG")[j];
            // NavConfig : items
            var indexConfig = parseInt(j + 1);
            var itemNavConfig = document.createElement("li");
            itemNavConfig.setAttribute("class", "nav-itemm");
            itemNavConfig.id = "AT" + index + "Config" + indexConfig;
            var buttonNavConfig = document.createElement("button");
            buttonNavConfig.setAttribute("class", "nav-link");
            buttonNavConfig.setAttribute("data-bs-toggle", "tab");
            buttonNavConfig.setAttribute(
                "data-bs-target",
                "#AT" + index + "Config" + indexConfig + "-tab-pane"
            );
            buttonNavConfig.setAttribute(
                "aria-controls",
                "AT" + index + "Config" + indexConfig + "-tab-pane"
            );
            buttonNavConfig.setAttribute("aria-selected", "false");
            buttonNavConfig.type = "button";
            buttonNavConfig.id = "AT" + index + "Config" + indexConfig + "-tab";
            buttonNavConfig.innerHTML = "Config" + indexConfig;
            itemNavConfig.appendChild(buttonNavConfig);
            navConfig.appendChild(itemNavConfig);

            // CONFIG : CONTENT

            config = document.createElement("div"); //formulaire de la config At1Config1
            config.id = "AT" + index + "Config" + indexConfig + "-tab-pane";
            config.setAttribute("class", "tab-pane fade");
            config.setAttribute(
                "aria-labelledby",
                "AT" + index + "Config" + indexConfig + "-tab"
            );
            config.setAttribute("tabindex", "0");

            addFieldConfig(configXML,"Type_Logement","Type_Logement","text","Type_Logement",config,"unite");
            addFieldsConfig(configXML,"checkbox",["Config_Optimisee", "Changement_Bouche"],config,"unite");
            addFieldConfig(configXML,"Singularite_EA","Singularite_EA","text","Singularite_EA",config,"unite");
            addFieldsConfig(configXML,"checkbox",["EA_Fixes", "EA_Autoréglables"],config,"unite");
            addFieldsConfig(configXML,"number",["Nb_Sdb_WC", "Nb_Sdb", "Nb_WC", "Nb_Sde"],config,"unite");
            addArrayField(configXML,"Cdep","AT" + parseInt(i + 1) + "Config" + parseInt(j + 1) + "_Cdep","Cdep",config);
            addFieldsConfig(configXML,"number",["Qv_Rep","Smea_Existant","Module_1","Module_2","Qsupp_Sdb","Qsupp_WC","Qsupp_Sdb_WC","Qsupp_Cellier",],config,"unite");
            div.appendChild(config);
            addTableConfig(
                configXML,
                "Humide",
                "AT" + index + "Config" + indexConfig
            );
            addTableConfig(configXML, "Sec", "AT" + index + "Config" + indexConfig);
            j++;
        }
        container.appendChild(navConfig);
        container.appendChild(div);
        i++;
    } //end while
}

// TROISIEME PAGE : EQUIPEMENTS
function loadEquipements(xml) {
    const eqpmts = xml.getElementsByTagName("Equipements")[0];
    const bouches = eqpmts.getElementsByTagName("Bouches")[0];
    const entrees = eqpmts.getElementsByTagName("Entrees")[0];
    const solutions = eqpmts.getElementsByTagName("Solutions")[0];
    const extracteurs = eqpmts.getElementsByTagName("Extracteurs")[0];

    const containerBouches = document.getElementById("bouches-tab-pane"); //contenu des eqpmts
    const containerEntrees = document.getElementById("entrees-tab-pane"); //contenu des eqpmts
    const containerSolutions = document.getElementById("solutions-tab-pane"); //contenu des eqpmts
    const containerExtracteurs = document.getElementById("extracteurs-tab-pane"); //contenu des eqpmts

    // BOUCHES
    addTableEqpmt("Bouche", bouches, containerBouches, ["Code","Références","Qmin","QminF","QminLimite","QmaxF","QmaxLimite",]);
    // ENTREES
    addTableEqpmt("Entree", entrees, containerEntrees, ["Code","Références","EA_min","EA_max",]);
    // SOLUTIONS
    addTableEqpmt("Solution", solutions, containerSolutions, ["Code_Solution","Config 1","Config 2","Config 3",'<button type="button" onclick="solutionsNewConfig()">Ajouter</button>',]);
    // EXTRACTEURS
    addTableEqpmt("Extracteur", extracteurs, containerExtracteurs, ["Références","N_Cdep","Libelle_Cdep",]);
}

//////////////////////////////////////////////////////////////////////////////////////////

function addFields(xml, type, fields, div, unite) {
    fields.forEach((element) =>
        addField(xml, element, element, type, element, div, unite)
    );
}

function addField(xml, nameXML, nameHTML, type, label, parent, unite=null,helper=null) {
    var lab = document.createElement("label");
    var input = document.createElement("input");

    if (
        typeof xml.getElementsByTagName(nameXML)[0] !== "undefined" &&
        xml.getElementsByTagName(nameXML)[0] !== null
    ) {
        var value = xml.getElementsByTagName(nameXML)[0].textContent;
    } else {
        var value = "";
    }

    input.type = type;
    input.name = nameHTML;
    input.id = nameHTML;
    input.setAttribute("class","form-control");
    lab.innerHTML = label;
    lab.htmlFor = nameHTML;
    lab.setAttribute("class","form-label");

    switch (type) {
        case "text":
            input.value = value;
            break;
        case "number":
            input.value = value;
            input.setAttribute("step", "any");
            break;
        case "checkbox":
            input.value = nameXML;
            lab.setAttribute("class", "form-check-label");
            input.setAttribute("class", "form-check-input");
            switch (value) {
                case "true":
                    input.checked = true;
                    break;
                case "false":
                    input.checked = false;
                    break;
            }
            break;
    }
    parent.appendChild(lab);
    if(unite !==null)
    {
        var div = document.createElement("div");
        var span = document.createElement("span");
        div.setAttribute('class','input-group');
        div.appendChild(input);
        span.setAttribute('class','input-group-text');
        span.innerHTML = unite;
        div.appendChild(span);
        div.appendChild(input);
        parent.appendChild(div);
    }
    else
    {
        parent.appendChild(input);
    }
    
}

function addFieldsAT(xml, type, fields, position, div, unite) 
{
    fields.forEach((element) =>
        addFieldAT(xml, element, element, type, element, position, div, unite)
    );
}

function addFieldAT(xml, nameXML, nameHTML, type, label, position, div, unite) 
{
    nameHTML = "AT" + parseInt(position + 1) + "_" + nameHTML;
    addField(xml, nameXML, nameHTML, type, label, position, div, unite);
}

function addFieldsConfig(xml, type, fields, position, div, unite) 
{
    fields.forEach((element) =>
        addFieldConfig(xml, element, element, type, element, position, div, unite)
    );
}

function addFieldConfig(xml,nameXML,nameHTML,type,label,position,div,unite) 
{
    nameHTML = (div.id + "_" + nameHTML).replace("-tab-pane", "");
    addField(xml, nameXML, nameHTML, type, label, position, div, unite);
}

function addArrayField(xml, nameXML, nameHTML, label, container) 
{
    var lab = document.createElement("label");
    lab.innerHTML = label;
    lab.htmlFor = nameHTML;
    container.appendChild(lab);
    var i = 0;
    while (
        typeof xml.getElementsByTagName(nameXML)[i] !== "undefined" &&
        xml.getElementsByTagName(nameXML)[i] !== null
    ) {
        var input = document.createElement("input");
        input.type = "text";
        input.name = nameHTML + "_" + parseInt(i + 1);
        input.id = nameHTML + "_" + parseInt(i + 1);
        input.value = xml.getElementsByTagName(nameXML)[i].textContent;
        container.appendChild(input);
        i++;
    }
}
function addEmptyField(name, type, containerId) {
    // sert notamment pour Num_AT_Ancien
    var container = document.getElementById(containerId);
    var input = document.createElement("input");
    index = container.children.length;
    input.type = type;
    input.name = name + "_" + index;
    input.id = name + "_" + index;
    container.appendChild(input);
}

function addEmptyDiv(parent,id) {
    var div = document.createElement("div");
    div.id = id;
    parent.appendChild(div);
}

function addDiv(parent,gridItem) {
    var div = document.createElement("div");
    div.setAttribute("class",gridItem)
    container.appendChild(div);
}

function addText(content, container) {
    var p = document.createElement("p");
    var text = document.createTextNode(content);
    p.appendChild(text);
    container.appendChild(p);
}

function addButton(onclick, content, container) {
    var button = document.createElement("button");
    button.type = "button";
    button.href = "#";
    button.innerHTML = content;
    button.className = "btn";
    button.setAttribute("onclick", onclick);
    container.appendChild(button);
}

function addCheckbox(name, lab, container) {
    //crée un input dans un container id
    var input = document.createElement("input");
    var label = document.createElement("label");
    input.type = "checkbox";
    input.name = name;
    input.className = "form-check-input";
    label.innerHTML = lab;
    label.htmlFor = name;
    label.className = "form-check-label";
    container.appendChild(label);
    container.appendChild(input);
}

function addTableConfig(Config, roomType, id) {
    var table = document.createElement("table");
    table.setAttribute("class", "table table-sm table-bordered");
    table.id = id + "_" + roomType;

    switch (roomType) {
        case "Humide":
            var colnames = ["Pièce", "Code", "Qvrep"];
            var textTitle = document.createTextNode("Pièces Humides");
            break;
        case "Sec":
            var colnames = ["Pièce", "Code"];
            var textTitle = document.createTextNode("Pièces Sèches");
            break;
    }
    // TABLE HEAD
    var thead = document.createElement("thead");
    thead.setAttribute("class", "table-dark");
    var tr = document.createElement("tr");

    for (let i = 0; i < colnames.length; i++) {
        var th = document.createElement("th");
        th.innerHTML = colnames[i];
        tr.appendChild(th);
    }
    thead.appendChild(tr);

    // TABLE BODY

    var tbody = document.createElement("tbody");
    tbody.setAttribute("class", "border-dark");
    var i = 0;
    while (
        typeof Config.getElementsByTagName("LOCAUX")[0].children[i] !==
        "undefined" &&
        Config.getElementsByTagName("LOCAUX")[0].children[i] !== null
    ) {
        var room = Config.getElementsByTagName("LOCAUX")[0].children[i];
        switch (roomType) {
            case "Humide":
                if (typeof room.getElementsByTagName("Qvrep")[0] == "undefined") {
                    i++;
                    continue;
                }
                break;

            case "Sec":
                if (typeof room.getElementsByTagName("Qvrep")[0] !== "undefined") {
                    i++;
                    continue;
                }
                break;
        }
        var tr = document.createElement("tr");
        var th = document.createElement("th");
        th.setAttribute("scope", "row");
        addFieldTableConfig(room, "Name", roomType, id, "text", th, i);
        tr.appendChild(th);
        var td = document.createElement("td");
        addFieldTableConfig(room, "Code", roomType, id, "text", td, i);
        tr.appendChild(td);
        if (
            typeof room.getElementsByTagName("Qvrep")[0] !== "undefined" &&
            room.getElementsByTagName("Qvrep")[0] !== null
        ) {
            var td = document.createElement("td");
            addFieldTableConfig(room, "Qvrep", roomType, id, "number", td, i);
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
        i++;
    }
    var title = document.createElement("h3");
    title.appendChild(textTitle);
    // Bouton addRoom()
    var button = document.createElement("button");
    button.type = "button";
    button.innerHTML = "Ajouter une pièce";
    button.setAttribute("class", "btn btn-dark");
    button.setAttribute("onclick", "addRoom('" + id + "','" + roomType + "')");

    config.appendChild(title);
    table.appendChild(thead);
    table.appendChild(tbody);
    config.appendChild(table);
    config.appendChild(button);
}

function addFieldTableConfig(room, name, roomType, id, type, div, position) {
    var input = document.createElement("input");

    if (room !== null) {
        switch (name) {
            case "Name":
                var value = room.nodeName;
                break;
            default:
                if (
                    typeof room.getElementsByTagName(name)[0] !== "undefined" &&
                    room.getElementsByTagName(name)[0] !== null
                )
                    var value = room.getElementsByTagName(name)[0].textContent;
                break;
        }
        input.value = value;
    }

    input.name =
        id + "_Locaux" + roomType[0] + "_" + name + "_" + parseInt(position + 1);
    input.id =
        id + "_Locaux" + roomType[0] + "_" + name + "_" + parseInt(position + 1);
    input.type = type;
    div.appendChild(input);
}

function addRoom(id, roomType) {
    var tbody = document.getElementById(id + "_" + roomType).lastChild;
    var index = parseInt(tbody.children.length);
    var tr = document.createElement("tr");

    //Piece
    var th = document.createElement("th");
    th.setAttribute("scope", "row");
    addFieldTableConfig(null, "Name", roomType, id, "text", th, index);
    tr.appendChild(th);

    var td = document.createElement("td");
    addFieldTableConfig(null, "Code", roomType, id, "text", td, index);
    tr.appendChild(td);

    if (roomType == "Humide") {
        var td = document.createElement("td");
        addFieldTableConfig(null, "Qvrep", roomType, id, "number", td, index);
        tr.appendChild(td);
    }
    tbody.appendChild(tr);
}

function addTableEqpmt(Eqpmt, xml, container, colNames) {
    // TABLE HEAD
    var table = document.createElement("table");
    var thead = document.createElement("thead");

    table.setAttribute("class", "table table-sm table-bordered");
    table.id = "table_" + Eqpmt;
    thead.setAttribute("class", "table-dark sticky-top top-0");
    var tr = document.createElement("tr");

    for (i = 0; i < colNames.length; i++) {
        var th = document.createElement("th");
        th.innerHTML = colNames[i];
        tr.appendChild(th);
    }
    thead.appendChild(tr);
    // TABLE BODY
    var tbody = document.createElement("tbody");
    tbody.setAttribute("class", "border-dark");
    var i = 0;
    while (typeof xml.children[i] !== "undefined") {
        var tr = document.createElement("tr");
        switch (Eqpmt) {
            case "Bouche":
                addFieldEqpmt(xml, Eqpmt, "Code", "text", i, tr);
                addFieldEqpmt(xml, Eqpmt, "Reference", "text", i, tr); // A revoir
                addFieldsEqpmt(xml,Eqpmt,["Qmin", "QminF", "QminLimite", "QmaxF", "QmaxLimite"],"number",i,tr);
                break;
            case "Entree":
                addFieldEqpmt(xml, Eqpmt, "Code", "text", i, tr);
                addFieldEqpmt(xml, Eqpmt, "Reference", "text", i, tr);
                addFieldsEqpmt(xml, Eqpmt, ["EA_min", "EA_max"], "number", i, tr);
                break;
            case "Solution":
                addFieldEqpmt(xml, Eqpmt, "Code_Solution", "text", i, tr);
                for (j = 1; j < 4; j++) {
                    if (typeof xml.children[i].children[j] !== "undefined") {
                        solutionsTabAddCell(
                            parseInt(i + 1),
                            j,
                            tr,
                            xml.children[i].children[j]
                        );
                    } else {
                        solutionsTabAddCell(parseInt(i + 1), j, tr);
                    }
                }

                break;

            case "Extracteur":
                addFieldEqpmt(xml, Eqpmt, "Reference", "text", i, tr);
                addFieldEqpmt(xml, Eqpmt, "N_Cdep", "number", i, tr);
                addFieldEqpmt(xml, Eqpmt, "Libelle_Cdep", "text", i, tr);
        }
        tbody.appendChild(tr);
        i++;
    }

    table.appendChild(thead);
    table.appendChild(tbody);
    container.appendChild(table);
    var button = document.createElement("button");
    button.type = "button";
    button.setAttribute("class", "btn btn-dark");
    button.setAttribute("onclick", "newEquipement('" + Eqpmt + "')");
    button.innerHTML = "Ajouter";
    container.appendChild(button);
}

function addFieldEqpmt(xml, Eqpmt, nameXML, type, position, parent) {
    var td = document.createElement("td");

    switch (nameXML) {
        case "Reference":
            var i = 0;
            while (typeof xml.getElementsByTagName("References")[position].children[i] !== "undefined") {
                var input = document.createElement("input");
                input.value =
                    xml.getElementsByTagName("References")[position].children[
                        i
                    ].textContent;
                input.name =
                    Eqpmt +
                    parseInt(position + 1) +
                    "_" +
                    nameXML +
                    "_" +
                    parseInt(i + 1);
                input.type = type;
                td.id = Eqpmt + parseInt(position + 1) + "_" + nameXML;
                td.appendChild(input);
                i++;
            }
            var button = document.createElement("button");
            button.type = "button";
            button.innerHTML = "+";
            button.setAttribute(
                "onclick",
                "addReference('" + Eqpmt + parseInt(position + 1) + "_" + nameXML + "')"
            );

            td.appendChild(button);
            break;
        default:
            var input = document.createElement("input");
            input.value = xml.getElementsByTagName(nameXML)[position].textContent;
            input.name = Eqpmt + parseInt(position + 1) + "_" + nameXML;
            input.type = type;
            td.appendChild(input);
    }
    parent.appendChild(td);
}

function addEmptyFieldEqpmt(Eqpmt, nameXML, type, parent) {
    var tbody = document.getElementById("table_" + Eqpmt).lastChild;
    var td = document.createElement("td");
    var input = document.createElement("input");
    var index = Eqpmt + parseInt(tbody.children.length + 1);

    switch (nameXML) {
        case "Reference":
            input.name = index + "_" + nameXML + "_1";
            input.type = type;
            td.id = index + "_" + nameXML;
            td.appendChild(input);

            var button = document.createElement("button");
            button.type = "button";
            button.innerHTML = "+";
            button.setAttribute(
                "onclick",
                "addReference('" + index + "_" + nameXML + "')"
            );
            td.appendChild(button);
            break;

        default:
            input.name = index + "_" + nameXML;
            input.type = type;
            td.appendChild(input);
    }
    parent.appendChild(td);
}

function addFieldsEqpmt(xml, Eqpmt, fields, type, position, parent) {
    fields.forEach((element) =>
        addFieldEqpmt(xml, Eqpmt, element, type, position, parent)
    );
}
function loadEmptyFieldsEqpmt(Eqpmt, fields, type, parent) {
    fields.forEach((element) => addEmptyFieldEqpmt(Eqpmt, element, type, parent));
}

function addReference(idContainer) {
    var container = document.getElementById(idContainer);
    var input = document.createElement("input");
    input.name = idContainer + "_" + container.children.length;
    input.type = "text";
    container.insertBefore(input, container.lastChild);
}

function newEquipement(Eqpmt) {
    var tbody = document.getElementById("table_" + Eqpmt).lastChild;
    var tr = document.createElement("tr");
    switch (Eqpmt) {
        case "Bouche":
            addEmptyFieldEqpmt(Eqpmt, "Code", "text", tr);
            addEmptyFieldEqpmt(Eqpmt, "Reference", "text", tr);
            loadEmptyFieldsEqpmt(
                Eqpmt,
                ["Qmin", "QminF", "QminLimite", "QmaxF", "QmaxLimite"],
                "number",
                tr
            );
            break;
        case "Entree":
            addEmptyFieldEqpmt(Eqpmt, "Code", "text", tr);
            addEmptyFieldEqpmt(Eqpmt, "Reference", "text", tr);
            loadEmptyFieldsEqpmt(Eqpmt, ["EA_min", "EA_max"], "number", tr);
            break;
        case "Solution":
            addEmptyFieldEqpmt(Eqpmt, "Code_Solution", "text", tr);
            var indexSolution = parseInt(tbody.children.length + 1);
            var maxIndexConfig = tbody.firstChild.children.length;
            for (var i = 1; i < maxIndexConfig; i++) {
                solutionsTabAddCell(indexSolution, i, tr);
            }
            break;
        case "Extracteur":
            addEmptyFieldEqpmt(Eqpmt, "Reference", "text", tr);
            addEmptyFieldEqpmt(Eqpmt, "N_Cdep", "number", tr);
            addEmptyFieldEqpmt(Eqpmt, "Libelle_Cdep", "text", tr);
    }
    tbody.appendChild(tr);
}

function solutionsTabAddCell(indexSolution, indexConfig, parent, xml = null) {
    var td = document.createElement("td");
    var inputNames = ["Solution_Libelle", "Code", "Nombre"];
    var inputTypes = ["text", "text", "number"];
    for (var i = 0; i < 3; i++) {
        var input = document.createElement("input");
        var label = document.createElement("label");

        input.type = inputTypes[i];
        input.name =
            "Solution" +
            indexSolution +
            "_Config" +
            indexConfig +
            "_" +
            inputNames[i];
        label.htmlFor = input.name;
        label.innerHTML = inputNames[i];

        if (xml !== null) {
            switch (inputNames[i]) {
                case "Solution_Libelle":
                    if (
                        typeof xml.getElementsByTagName("Solution_Libelle") !== "undefined"
                    ) {
                        input.value =
                            xml.getElementsByTagName("Solution_Libelle")[0].textContent;
                    }
                    break;
                case "Code":
                    if (
                        typeof xml
                            .getElementsByTagName("Entree")[0]
                            .getElementsByTagName("Code") !== "undefined"
                    ) {
                        input.value = xml
                            .getElementsByTagName("Entree")[0]
                            .getElementsByTagName("Code")[0].textContent;
                    }
                    break;
                case "Nombre":
                    if (
                        typeof xml
                            .getElementsByTagName("Entree")[0]
                            .getElementsByTagName("Nombre") !== "undefined"
                    ) {
                        input.value = xml
                            .getElementsByTagName("Entree")[0]
                            .getElementsByTagName("Nombre")[0].textContent;
                    }
                    break;
            }
        }
        td.appendChild(label);
        td.appendChild(input);
    }

    parent.appendChild(td);
}

function solutionsNewConfig() {
    var thead = document.getElementById("table_Solution").firstChild;
    var tbody = document.getElementById("table_Solution").lastChild;
    var tr = thead.firstChild;
    var indexConfig = parseInt(tr.children.length - 1);
    var maxIndexSolution = tbody.children.length;
    // thead

    var th = document.createElement("th");
    th.innerHTML = "Config " + indexConfig;
    tr.insertBefore(th, tr.lastChild);
    // tbody
    for (i = 1; i <= maxIndexSolution; i++) {
        var parent = tbody.children[parseInt(i - 1)];
        solutionsTabAddCell(i, indexConfig, parent);
    }
}
