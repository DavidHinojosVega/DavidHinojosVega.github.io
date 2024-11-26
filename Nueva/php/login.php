<?php session_start();
    include "./conexion.php";
    $email = $_POST["username"];
    $password = $_POST["password"];

    echo "Bienvenido: $email password: $password";
    echo '<br>';
    $query = "select * from users where nombre = '$email' and password = '$password'";
    $res = $conexion->query($query);
    if(mysqli_num_rows($res) > 0){
        echo "LOGIN CORRECTO";
        $fila = mysqli_fetch_row($res);
        echo "Nombre: " .$fila[1].'<br>';
        echo "appellido: ".$fila[2].'<br>';
        echo "nickname" .$fila[3].'<br>';
        echo "Nivel" .$fila[8];
        $arr = [
            'id' => $fila[0],
            'nombre' =>$fila[1],
            'email' =>$fila[4],
            'nivel' => $fila[8]
        ];
        $_SESSION['userdata'] = $arr;
        if($fila[8] == 1){
            //Redirecciona al admin
            header("Location: ../admin.php");
        }else{
            //Redirecciona al normal
            header("Location: ../index.html");
        }
    }else{
        echo "DATOS NO VALIDOS";
        header("Location: ../login2.php?error=datos no validos");
    }
?>