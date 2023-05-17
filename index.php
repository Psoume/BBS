<!DOCTYPE html>
<html>

  <head>
      <title>Saisie d'avis techniques de ventilation</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
      <link rel="stylesheet" href="./style.css">
  </head>

<?php
function Loader() {
  if (isset ($_GET['AT']))
  {
    return "loadXML('".$_GET['AT']."')";
  }
  else {
    return "";
  }
}
?>

  <body onload="<?php echo Loader(); ?>">

    <h1>Saisie d'avis techniques de ventilation</h1>

    <?php
    
    if (isset ($_GET['AT']))
    {$AT = $_GET['AT'];
      include './view/form.php';}   
    else
    {include './view/listATs.php';}
    ?>

    <script type="text/javascript" src="script.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js"></script>

  </body>

</html>