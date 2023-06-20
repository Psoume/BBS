<?php 
$uploadOk = 1;
$File_Name = "XML/".str_replace(" ","",htmlspecialchars(basename($_FILES["importXML"]["name"])));
$target_file = "../data/".$File_Name ;


// Check if file already exists
if (file_exists($target_file)) {
    echo "Un fichier avec ce nom existe déjà. L'upload a échoué.";
    echo "<a href='../index.php'>Revenir à l'accueil</a>";
    $uploadOk = 0;
} 

else {
    if (move_uploaded_file($_FILES["importXML"]["tmp_name"], $target_file)) {
        header("Location: ../index.php?AT=".$File_Name);
    } else {
        echo "Une erreur est survenue.";
    }
}

?>