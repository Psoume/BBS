<?php

$name = getcwd()."\\model\XML\\".$_GET['name'];
if (file_exists($name)) {
    unlink($name);
}

?>