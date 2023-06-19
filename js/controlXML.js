// Choix du fichier XML parmi ceux disponibles
function chooseXML(at) {
    window.location.href = "?AT=" + at;
}

// création d'un nouveau XML
// On va chercher base.xml et on l'enregistre comme name.xml
function createXML(fromFile=null) {
    if (fromFile !== null) {
        var fileName = prompt(
            "Quel nom voulez-vous donner au nouveau fichier ?",
            "exemple.xml"
        );
    } else {
        var fromFile = "base.xml";
        var fileName = prompt(
            "Quel nom voulez-vous donner au nouveau fichier ?",
            "exemple.xml"
        );
    }
    if (fileName !== null && fileName !== "") {
        let xhr = new XMLHttpRequest();
        xhr.open(
            "GET","controller/createXML.php?fileName=" +fileName +"&fromFile=" +fromFile
        );
        xhr.send();
        xhr.onerror = function () {
            alert("La requête a échouée");
        };
        xhr.onload = function () {
            fileName = xhr.responseText;
            chooseXML(fileName);
        };
    }
}

function deleteXML(filename) {
    if (
        confirm(
            "Voulez-vous vraiment supprimer le fichier " +
            filename +
            " ? Cette action est irréversible"
        ) == true
    ) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "controller/deleteXML.php?name=" + filename);
        xhr.send();
        xhr.onerror = function () {
            alert("La requête a échouée");
        };
        xhr.onload = function () {
            window.location.href = "/";
        };
    }
}


$(function () {
    $('#arborescence').jstree({
        'core': {
            "check_callback" : true,
            'data': {
                'url': "./controller/fileTree.php",
                'dataType': 'json',
                'data': function (node) {
                    return { 'id': node.id };
                }              
            }            
        },
        "plugins": ["state","dnd"]  
    })

    $('#chooseXML').on('click', function() {
        var selectedNode = $('#arborescence').jstree('get_selected', true)[0];
        var parentNode = selectedNode.parent;
        var path = selectedNode.text;
        while (parentNode !=='#')
        {
            selectedNode = $('#arborescence').jstree().get_node(parentNode);
            parentNode = selectedNode.parent;
            path = selectedNode.text + "/" +path ;
        }
        chooseXML(path);
    });

    $('#deleteXML').on('click', function() {
        var selectedNode = $('#arborescence').jstree('get_selected', true)[0].text;
        deleteXML(selectedNode);
    });

    $('#createXMLFromFile').on('click', function() {
        var selectedNode = $('#arborescence').jstree('get_selected', true)[0].text;
        createXML(selectedNode);
    });

});
