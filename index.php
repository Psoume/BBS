<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Saisie d'avis techniques de ventilation</title>
  <link rel="stylesheet" href="./css/style.css">
  <link rel="stylesheet" href="./css/bootstrap.min.css">
  <link rel="stylesheet" href="./css/bootstrap.min.css.map">
</head>

<?php
function Loader()
{
  if (isset($_GET['AT'])) {
    return "loadXML('" . $_GET['AT'] . "')";
  } else {
    return "";
  }
}
?>

<body onload="<?php echo Loader(); ?>">

  <h1>Saisie d'avis techniques de ventilation</h1>

  <?php

  if (isset($_GET['AT'])) {
    $AT = $_GET['AT'];
    include './view/form.php';
  } else {
    include './view/listATs.php';
  }
  ?>


  <script type="text/javascript" src="./js/controlXML.js"></script>
  <script type="text/javascript" src="./js/loadXML.js"></script>
  <script type="text/javascript" src="./js/bootstrap.bundle.min.js"></script>
  <script type="text/javascript" src="./js/bootstrap.bundle.min.js.map"></script>


</body>

</html>