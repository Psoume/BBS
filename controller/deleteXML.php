<?php

$name ="..\\data\XML\\".$_GET['name'];

if (file_exists($name)) {
    unlink($name);
}

?>