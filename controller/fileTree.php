<?php
$cheminRacine = '../data/XML'; // Chemin du dossier racine à afficher

function genererArborescence($chemin) {
    $structure = array();

    // Parcours des fichiers et dossiers dans le répertoire spécifié
    $contenu = scandir($chemin);
    foreach ($contenu as $item) {
        if ($item === '.' || $item === '..') {
            continue;
        }

        $cheminComplet = $chemin . '/' . $item;
        $element = array(
            'text' => $item,
            'icon' => ""
        );

        if (is_dir($cheminComplet)) {
            $element['children'] = genererArborescence($cheminComplet);
            $element['icon'] = "bi bi-folder-fill text-warning";
        }
        else{
            $element['icon'] = "bi bi-file-earmark text-dark";
        }

        $structure[] = $element;
    }

    return $structure;
}

// Génération de la structure de l'arborescence
$structureArborescence = genererArborescence($cheminRacine);

// Envoi de la structure de l'arborescence en tant que réponse JSON
header('Content-Type: application/json');
echo json_encode($structureArborescence);
?>
