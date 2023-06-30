// Choix du fichier XML parmi ceux disponibles
function chooseXML(at) {
    window.location.href = "index.php?AT=" + at;
}

// création d'un nouveau XML
// On va chercher base.xml et on l'enregistre comme name.xml
function createXML(fromFile=null) {
    if (fromFile == null) {
        var fromFile = "base.xml";
    }
    var fileName = prompt(
        "Quel nom voulez-vous donner au nouveau fichier ?",
        "exemple.xml");
    if (fileName !== null && fileName !== "") {
        let xhr = new XMLHttpRequest();
        xhr.open(
            "GET","./controller/createXML.php?fileName=" +fileName +"&fromFile=" +fromFile
        );
        xhr.send();
        xhr.onerror = function () {
            alert("La requête a échouée");
        };
        xhr.onload = function () {
            fileName = xhr.responseText;
            if(fileName != null)
            {       
                chooseXML(fileName);
            }
            
        };
    }
}


$(function () {
    $('#arborescence').jstree({
        'core': {
            'data': {
                'url': "./controller/fileTree.php?operation=get_node",
                'data': function (node) {
                    return { 'id': node.id };
                }              
            },
            'check_callback' : function(o, n, p, i, m) {
                if(m && m.dnd && m.pos !== 'i') { return false; }
                if(o === "move_node" || o === "copy_node") {
                    if(this.get_node(n).parent === this.get_node(p).id) { return false; }
                }
                return true;
            },          
            'force_text' : true,
            'themes' : {
                'responsive' : false,
                'variant' : 'small',
                'stripes' : true
            }  
        },
        // 'sort' : function(a, b) {
        //     return this.get_type(a) === this.get_type(b) ? (this.get_text(a) > this.get_text(b) ? 1 : -1) : (this.get_type(a) >= this.get_type(b) ? 1 : -1);
        // },
        'contextmenu' : {
            'items' : function(node) {
                var tmp = $.jstree.defaults.contextmenu.items();
                delete tmp.ccp.action;
                delete tmp.ccp;
                tmp.rename.label = "Renommer";
                tmp.remove.label = "Supprimer";
                delete tmp.create.action;
                tmp.create.label = "Nouveau";
                tmp.create.submenu = {
                    "create_folder" : {
                        "separator_after"	: true,
                        "label"				: "Dossier",
                        "action"			: function (data) {
                            var inst = $.jstree.reference(data.reference),
                                obj = inst.get_node(data.reference);
                            inst.create_node(obj, { type : "default" }, "last", function (new_node) {
                                setTimeout(function () { inst.edit(new_node); },0);
                            });
                        }
                    },
                    "create_file" : {
                        "label"				: "Fichier",
                        "action"			: function (data) {
                            var inst = $.jstree.reference(data.reference),
                                obj = inst.get_node(data.reference);
                                inst.create_node(obj, { type : "file" }, "last", function (new_node) {
                                setTimeout(function () { inst.edit(new_node);},0);
                            });
                        }
                    }
                };
                if(this.get_type(node) === "file") {
                    delete tmp.create;
                }
                return tmp;
            }
        },
        'types' : {
            'default' : { 'icon' : 'bi bi-folder-fill text-warning' },
            'file' : { 'valid_children' : [], 'icon' : 'bi bi-file-earmark text-dark' }
        },
        'unique' : {
            'duplicate' : function (name, counter) {
                return name + '_' + counter;
            }
        },
        "plugins": ['state','dnd','sort','types','contextmenu','unique']
    })

    .on('delete_node.jstree', function (e, data) {
        if(confirm("Voulez-vous vraiment supprimer "+data.node.text+" ? Cette action est irréversible")==true)
        {
            $.get('./controller/fileTree.php?operation=delete_node', { 'id' : data.node.id })
            .fail(function () {
                data.instance.refresh();
            });
        }
        else {window.location.reload();}
    })

    .on('create_node.jstree', function (e, data) {
        $.get('./controller/fileTree.php?operation=create_node', { 'type' : data.node.type, 'id' : data.node.parent, 'text' : data.node.text })
            .done(function (d) {
                console.log(data);
                data.instance.set_id(data.node, d.id);
            })
            .fail(function () {
                data.instance.refresh();
            });
    })
    
    .on('rename_node.jstree', function (e, data) {
        $.get('./controller/fileTree.php?operation=rename_node', { 'id' : data.node.id, 'text' : data.text })
            .done(function (d) {
                data.instance.set_id(data.node, d.id.replace(" ",""));
                // data.instance.set_text(data.node, data.node.text.replace(" ",""));
            })
            .fail(function () {
                data.instance.refresh();
            });
    })
    .on('move_node.jstree', function (e, data) {
        $.get('./controller/fileTree.php?operation=move_node', { 'id' : data.node.id, 'parent' : data.parent })
            .done(function (d) {
                //data.instance.load_node(data.parent);
                data.instance.refresh();
            })
            .fail(function () {
                data.instance.refresh();
            });
    })
});



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
    var selectedNode = $('#arborescence').jstree('get_selected', true)[0];
    $('#arborescence').jstree().delete_node(selectedNode);
});

$('#renameXML').on('click', function() {
    var selectedNode = $('#arborescence').jstree('get_selected', true)[0];
    var newName = prompt("Comment souhaitez-vous renommer le fichier ?");
    $('#arborescence').jstree().rename_node(selectedNode,newName);
});

$('#createXMLFromFile').on('click', function() {
    var selectedNode = $('#arborescence').jstree('get_selected', true)[0];
    var parentNode = selectedNode.parent;
    var path = selectedNode.text;
    while (parentNode !=='#')
    {
        selectedNode = $('#arborescence').jstree().get_node(parentNode);
        parentNode = selectedNode.parent;
        path = selectedNode.text + "/" +path ;
    }
    createXML(path);
});

