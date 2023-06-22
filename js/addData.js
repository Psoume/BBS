////////////////////////////////////////////////////////////////////////////////////////

// REMPLISSAGE DES CHAMPS

function addDataGeneralites(xml){
    // Generalites
    var fields = ['Titre_AT','Titulaire','Code_Titulaire', 'Industriel', 
    'Code_Industriel', 'Num_AT','Type_Extraction','Date_Application','Date_Fin_Application',
    'Usage_EA'];
    fillFields(xml, fields, fields, 'text');
    fillArrayField(xml, 'Num_AT_Ancien', 'Num_AT_Ancien', 'text');
    var checkboxFields = ['Double_Flux','Autoréglable','Hygroreglable','Basse_Pression'];
    fillFields(xml, checkboxFields, checkboxFields, 'checkbox');
}

function addDataAT(AT,indexAT)
{
var fields = ['REF_AT','LIBELLE','Type_Avis_Technique','Dp1','Dp2','R_f'];
fillFields(AT, fields, formatFieldsAT(fields,indexAT), 'text');

}

function addDataConfig(Config,indexAT,indexConfig)
{
    var fields = ['Type_Logement','Nb_Sdb_WC','Nb_Sdb','Nb_WC','Nb_Sde','Qv_Rep','Smea_Existant','Module_1','Module_2','Qsupp_Sdb','Qsupp_WC','Qsupp_Sdb_WC','Qsupp_Cellier'];
    fillFields(Config, fields, formatFieldsConfig(fields,indexAT,indexConfig), 'text');
    var checkboxFields = ['Config_Optimisee','Changement_Bouche','EA_Fixes','EA_Autoréglables'];
    fillFields(Config, checkboxFields, formatFieldsConfig(checkboxFields,indexAT,indexConfig), 'checkbox');
    fillArrayField(Config, 'Cdep', "AT"+indexAT+"Config"+indexConfig+"_Cdep", 'text');
    var fields = ['Name','Code','Qvrep'];
}

function addDataRoom(Locaux, roomtype, rooms,indexAT, indexConfig){

    for(var k=0;k<rooms.length;k++)
    {
        var input = document.getElementById("AT"+indexAT+"Config"+indexConfig+"_"+roomtype+"_Name_"+parseInt(k+1));
        input.value = rooms[k];
        var roomXML = Locaux.getElementsByTagName(rooms[k])[0];
        fillRoomField(roomXML,parseInt(k+1), 'Code',"AT"+indexAT+"Config"+indexConfig+"_"+roomtype+"_Code" , 'text');
        if(roomtype=='LocauxH')
        {
            fillRoomField(roomXML,parseInt(k+1), 'Qvrep',"AT"+indexAT+"Config"+indexConfig+"_"+roomtype+"_Qvrep" , 'text');
        }
    }  
}

function addDataEqpmt(Eqpmt,EqpmtXML)
{
    
    for (var i=0;i<EqpmtXML.children.length;i++)
    {
        var xml = EqpmtXML.children[i];
        var indexEqpmt = parseInt(i+1);
        switch(Eqpmt){
            case 'Bouche':
                fillArrayField(xml, 'Reference', Eqpmt+indexEqpmt+'_Reference', 'text');
                var fields = ['Code','Qmin','QminF','QminLimite','QmaxF','QmaxLimite'];
                break;

            case 'Entree':
                fillArrayField(xml, 'Reference', Eqpmt+indexEqpmt+'_Reference', 'text');
                var fields = ['Code','EA_min','EA_max'];
                break;

            case 'Solution':
                fillField(xml, 'Code_Solution', Eqpmt+indexEqpmt+'_Code_Solution','text');
                var fields=[];
                for(var j=1;j<xml.children.length;j++)
                {
                    fillField(xml.children[j],'Solution_Libelle',Eqpmt+indexEqpmt+'_Config'+j+'_Solution_Libelle');
                    for(k=1;k<xml.children[j].children.length;k++)
                    {
                        var xmlEntree = xml.children[j].children[k];
                        fillField(xmlEntree,'Code',Eqpmt+indexEqpmt+'_Config'+j+'_Code_'+k);
                        fillField(xmlEntree,'Nombre',Eqpmt+indexEqpmt+'_Config'+j+'_Nombre_'+k);
                    }
                }
                break;

            case 'Extracteur':
                fillArrayField(xml, 'Reference', Eqpmt+indexEqpmt+'_Reference', 'text');
                var fields = ['N_Cdep','Libelle_Cdep'];
                break;
    }

    if(Eqpmt!=='Solution')
    {
        fillFields(xml, fields, formatFieldsEqpmt(fields,Eqpmt,indexEqpmt), 'text')
    }
    }
}

function fillArrayField(xml, nameXML, idHTML, type)
{
    for(var i=0; i<xml.getElementsByTagName(nameXML).length; i++) 
    {
        var newIdHTML = idHTML +'_'+ parseInt(i+1);
        var idReference = idHTML +'_'+ i;
        if(i!=0)
        {
            var reference = document.getElementById(idReference);
            var input = document.createElement('input');
            input.type = type;
            input.name = newIdHTML;
            input.setAttribute('class','form-control mt-1')
            input.id =newIdHTML;
            reference.after(input);
        }
        fillField(xml,nameXML,newIdHTML,type,i);
    }
}

function fillRoomField(xml,indexRoom, nameXML, idHTML, type){
    var newIdHTML = idHTML +'_'+ indexRoom;
    fillField(xml,nameXML,newIdHTML,type);
}

function fillField(xml, nameXML, idHTML, type,position=0)
{
    if (typeof(xml.getElementsByTagName(nameXML)[position]) !== 'undefined')
    {
        var value = xml.getElementsByTagName(nameXML)[position].textContent;
    }
    else{ value="";}
    
    var input = document.getElementById(idHTML);
    if(type=='checkbox' || type=='radio')
    {
        switch (value) 
            {
                case "true":
                    input.checked = true;
                    break;
                case "false":
                    input.checked = false;
                    break;
                default:
                    input.checked = false;
                    break;
            }
    }
    else
    {
        input.value = value;
    }
}

function fillFields(xml, nameXML, idHTML, type)
{
    for (var i = 0;i < nameXML.length;i++)
    {
        fillField(xml, nameXML[i], idHTML[i], type);
    }
}


function formatFieldsAT(fields,indexAT)
{
    var newFields = [];
    for (var i=0; i<fields.length; i++) 
    {
        newFields.push("AT"+indexAT+"_"+fields[i]);
    }
    return newFields;
}

function formatFieldsConfig(fields,indexAT,indexConfig)
{
    var newFields = [];
    for (var i=0; i<fields.length; i++) 
    {
        newFields.push("AT"+indexAT+"Config"+indexConfig+"_"+fields[i]);
    }
    return newFields;
}

function formatFieldsEqpmt(fields,Eqpmt,index){
    var newFields = [];
    for (var i=0; i<fields.length; i++) 
    {
        newFields.push(Eqpmt+index+"_"+fields[i]);
    }
    return newFields;
}
