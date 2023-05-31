<?php

$name = getcwd()."\\res\XML\\".$_GET['name'];
if (file_exists($name)) {
    unlink($name);
}

?>