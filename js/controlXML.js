// Choix du fichier XML parmi ceux disponibles
function chooseXML(at) {
    window.location.href = "?AT=" + at;
}

// création d'un nouveau XML
// On va chercher base.xml et on l'enregistre comme name.xml
function createXML(is_blank) {
    if (is_blank == false) {
        var fromFile = document.getElementById("createXMLFromFile").value;
        var fileName = prompt(
            "Quel nom voulez-vous donner au nouveau fichier ?",
            "exemple.xml"
        );
    } else {
        var fromFile = "base.xml";
        var fileName = document.getElementById("XML_name").value;
    }
    if (fileName !== null && fileName !== "") {
        let xhr = new XMLHttpRequest();
        xhr.open(
            "GET",
            "model/createXML.php?fileName=" +
            fileName +
            "&fromFile=" +
            fromFile +
            "&is_blank=" +
            is_blank
        );
        xhr.send();
        xhr.onerror = function () {
            alert("La requête a échouée");
        };
        xhr.onload = function () {
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
        xhr.open("GET", "model/deleteXML.php?name=" + filename);
        xhr.send();
        xhr.onerror = function () {
            alert("La requête a échouée");
        };
        xhr.onload = function () {
            window.location.href = "/";
        };
    }
}

