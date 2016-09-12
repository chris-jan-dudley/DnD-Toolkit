<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Untitled Document</title>
</head>

<body>
<?php


echo $_POST["logname"];

echo $_POST["LogNotes"];

$myfile = fopen("newfile.txt", "w") or die("Unable to open file!");
$txt = $_POST["LogNotes"];
fwrite($myfile, $txt);
$txt = "HELLO WORLD";
fwrite($myfile, $txt);
fclose($myfile);

?>
</body>
</html>