<div class='px-4'>
    <label for="Titre_AT" class="form-label">Titre : </label>
    <input type="text" name="Titre_AT" id="Titre_AT" class="form-control">
</div>

<div class="row mx-auto">
    <div class='col-12 col-sm-6 px-4'>
    <img data-bs-toggle="tooltip" data-bs-title="Default tooltip" src="./css/bootstrap-icons/info-circle.svg" alt="Bootstrap" width="18" height="18">
        <label for="Titulaire" class="form-label">Nom du titulaire : </label>
        <input type="text" name="Titulaire" id="Titulaire" class="form-control">
        <label for="Code_Titulaire" class="form-label">Code du titulaire : </label>
        <input type="text" name="Code_Titulaire" id="Code_Titulaire" class="form-control">
        <label for="Num_AT" class="form-label">Numéro de l'AT : </label>
        <input type="text" name="Num_AT" id="Num_AT" class="form-control">
        <div id="NumATAncienField">
            <label for="Num_AT_Ancien_1">Anciens numéros : </label>
            <input class="form-control" type="text" name="Num_AT_Ancien_1" id="Num_AT_Ancien_1">
        </div>
        <button type='button' class="" onclick="deleteInput('NumATAncienField',2)" >Supprimer le dernier</button>
        <button type="button" class="btn btn-primary border border-dark mt-1 float-end" onclick="addField('Num_AT_Ancien','text','NumATAncienField')">+</button>
    </div>

    <div class='col-12 col-sm-6 px-4'>
        <label for="Industriel" class="form-label">Nom de l'industriel : </label>
        <input type="text" name="Industriel" id="Industriel" class="form-control">
        <label for="Code_Industriel" class="form-label">Code de l'industriel : </label>
        <input type="text" name="Code_Industriel" id="Code_Industriel" class="form-control">
        <label for="Date_Application" class="form-label">Date d'application : </label>
        <input type="text" name="Date_Application" id="Date_Application" class="form-control">
        <label for="Date_Fin_Application" class="form-label">Date de fin d'application : </label>
        <input type="text" name="Date_Fin_Application" id="Date_Fin_Application" class="form-control">
        <label for="Type_Extraction" class="form-label">Type d'extraction : </label>
        <select name="Type_Extraction" id="Type_Extraction" class="form-select">
            <option value="" selected>Choisir un type d'extraction</option>
            <option value="caisson">Caisson</option>
            <option value="tourelle">Tourelle</option>
            <option value="caisson et tourelle">Caisson et Tourelle</option>
        </select>
        
    </div>
</div>

<div class="row mx-auto">
    <div class="col-12 col-sm-6 px-4 pt-3">
        <div class="row">
            <div class="col">
                <fieldset>
                    <legend>Usages :</legend>
                    <div class="form-check">
                        <label for="Collectif" class="form-check-label">Collectif : </label>
                        <input type="checkbox" name="Collectif" id="Collectif" class="form-check-input" value="Collectif">
                    </div>
                    <div class="form-check">
                        <label for="Individuel" class="form-check-label">Individuel : </label>
                        <input type="checkbox" name="Individuel" id="Individuel" class="form-check-input" value="Individuel">
                    </div>
                    <div class="form-check">
                        <label for="Hotel" class="form-check-label">Hôtel : </label>
                        <input type="checkbox" name="Hotel" id="Hotel" class="form-check-input" value="Hotel">
                    </div>
                </fieldset>
            </div>
            <div class="col">
                <label for="Usage_EA" class="form-label">Usages Entrées d'Air : </label>
                <input type="text" name="Usage_EA" id="Usage_EA" class="form-control">
            </div>
        </div>
        <div class="col">
        </div>
    </div>

    <div class="col-12 col-sm-6 px-4 pt-3">
        <fieldset>
        <legend>Caractéristiques :</legend>
            <div class="form-check">
                <label for="Double_Flux" class="form-check-label">Double Flux : </label>
                <input type="checkbox" name="Double_Flux" id="Double_Flux" class="form-check-input" value="Double_Flux">
            </div>
            <div class="form-check">
                <label for="Autoréglable" class="form-check-label">Autoréglable : </label>
                <input type="checkbox" name="Autoréglable" id="Autoréglable" class="form-check-input" value="Autoréglable">
            </div>
            <div class="form-check">
                <label for="Hygroreglable" class="form-check-label">Hygroreglable : </label>
                <input type="checkbox" name="Hygroreglable" id="Hygroreglable" class="form-check-input" value="Hygroreglable">
            </div>
            <div class="form-check">
                <label for="Basse_Pression" class="form-check-label">Basse Pression : </label>
                <input type="checkbox" name="Basse_Pression" id="Basse_Pression" class="form-check-input" value="Basse_Pression">
            </div>
        </fieldset>
    </div>
</div>






