## FONCTIONS

- addField(name,type,lab,id)
- addCheckbox(name,lab,id)
- addModal(name,target,id) 
- addButton(description,onclick,id)

## ATS
document.getElementById("NB_AT").onchange = function()
-> new div class='AT'
    -> Fields/Checkboxes
    -> new div class='Configs' id='ConfigsAT1'
        -> new button modal trigger 'voir Config i AT y'
        -> modal content
    -> new button 'Ajouter une config'