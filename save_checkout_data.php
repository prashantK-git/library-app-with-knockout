<?php
echo "hii php";
$myFile = "models/checkoutData.json";
$fh = fopen($myFile, 'w+') or die("can't open file");
$stringData = $_POST["data"];
fwrite($fh, $stringData);
fclose($fh)
?>