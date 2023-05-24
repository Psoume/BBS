<?php

$name = getcwd()."\TEMP\\".$_GET['name'];
if (file_exists($name)) {
    unlink($name);
}

?>