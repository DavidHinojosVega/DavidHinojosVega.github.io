<?php
$server = "localhost";
$user = "root";
$pass = "";
$db = "bracketmaster";

$conexion = new mysqli($server, $user, $pass, $db);

if ($conexion->connect_error) {
    die("No se pudo conectar a MySQL. PRENDE EL MYSQL");
}

error_reporting(E_ALL & E_STRICT);
ini_set('display_errors', '1');
ini_set('log_errors', '0');
ini_set('error_log','./')
?>