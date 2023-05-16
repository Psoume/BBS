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

function addField(field)
{
    var input = document.createElement("input");   
    input.type = "text";
    input.name = field;
    var container = document.getElementById("NumATAncienField");
    container.appendChild(input);
};

/////////////////////////////////////

var NbATS = document.getElementById("Xml_File").value;
console.log(NbATS);