<?php

session_start();
if(isset($_SESSION['userdata'])){
    $user = $_SESSION['userdata'];
}else{
    header("Location: ./login2.php");
}

?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel de Control</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" integrity="sha384-tViUnnbYAV00FLIhhi3v/dWt3Jxw4gZQcNoSCxCIFNJVCx7/D55/wXsrNIRANwdD" crossorigin="anonymous">
    <link rel="stylesheet" href="./CSS/stylesdinero.css">
</head>
<body class="d-flex">

<!-- Sidebar -->
<aside class="d-flex" style="width: 15%; height: 100%;">
    <div class="bg-black text-white p-3 vh-100 w-100">
        <div class="d-flex justify-content-center">
            <img class="w-25 h-25" src="./img/hand.webp" alt="">
        </div>
        <nav>
            <ul class="nav flex-column">
                <li class="nav-item" style="background-color: azure;">
                    <a href="#" class="nav-link text-black"><i class="bi bi-house"></i>&nbsp;&nbsp;Inicio</a>
                </li>
                <li class="nav-item">
                    <a href="./users.html" class="nav-link text-white"><i class="bi bi-person"></i>&nbsp;&nbsp;Usuarios</a>
                </li>
                <li class="nav-item">
                    <a href="./torneos.html" class="nav-link text-white"><i class="bi bi-trophy"></i></i>&nbsp;&nbsp;Torneos</a>
                </li>
                <li class="nav-item">
                    <a href="./reports.html" class="nav-link text-white"><i class="bi bi-bar-chart"></i>&nbsp;&nbsp;Reportes</a>
                </li>
                <li class="nav-item">
                    <a href="./comentarios.html" class="nav-link text-white"><i class="bi bi-chat"></i></i>&nbsp;&nbsp;Comentarios</a>
                </li>
                <li class="nav-item">
                    <a href="./settings.html" class="nav-link text-white"><i class="bi bi-gear"></i>&nbsp;&nbsp;Configuración</a>
                </li>
            </ul>
        </nav>
    </div>
</aside>

<!-- Main Content -->
<main class="flex-grow-1">
    <header class="p-3 bg-dark border-bottom text-white">
        <div class="container-fluid d-flex justify-content-between">
            <h4 class="m-0">Dashboard > Inicio</h4>
            <div>
                <button type="button" class="btn btn-light position-relative me-3">
                    <i class="bi bi-bell"></i>
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">99+</span>
                </button>
                <img src="./img/jojo.jpeg" alt="" style="width: 30px; height: 30px; border-radius: 50%;" class="me-2">
                
                <span> <?php echo $user['nombre'];?> </span>
            </div>
        </div>
    </header>
    <section class="container mt-4">
        <!-- Stats -->
        <div class="row g-3">
            <div class="col-md-3">
                <div class="card text-center bg-light">
                    <div class="card-body">
                        <i class="bi bi-cash-coin fs-2 text-primary"></i>
                        <h6>TOTAL INGRESOS</h6>
                        <h4>$15,000</h4>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card text-center bg-light">
                    <div class="card-body">
                        <i class="bi bi-people fs-2 text-success"></i>
                        <h6>USUARIOS ACTIVOS</h6>
                        <h4>1,250</h4>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card text-center bg-light">
                    <div class="card-body">
                        <i class="bi bi-cash-stack fs-2 text-warning"></i>
                        <h6>COSTO PROMEDIO DE TORNEOS</h6>
                        <h4>300</h4>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card text-center bg-light">
                    <div class="card-body">
                        <i class="bi bi-graph-up fs-2 text-danger"></i>
                        <h6>TORNEOS COMPLETADOS</h6>
                        <h4>400</h4>
                    </div>
                </div>
            </div>
        </div>
        <!-- Charts -->
        <div class="row mt-4 g-3">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header bg-primary text-white">INGRESOS MENSUALES</div>
                    <div class="card-body">
                        <canvas id="chartIngresos"></canvas>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header bg-success text-white">USUARIOS POR REGIÓN</div>
                    <div class="card-body">
                        <canvas id="chartUsuarios"></canvas>
                    </div>
                </div>
            </div>
        </div>

       
    </section>
    <footer class="text-center py-3 bg-light border-top">
        <p>&copy; 2024 Bracket Master - Todo lo que puedes imaginar</p>
    </footer>
</main>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
    const ctxIngresos = document.getElementById('chartIngresos').getContext('2d');
    new Chart(ctxIngresos, {
        type: 'line',
        data: {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril'],
            datasets: [{ label: 'Ingresos', data: [5000, 7000, 8000, 15000], borderColor: 'blue', fill: false }]
        }
    });

    const ctxUsuarios = document.getElementById('chartUsuarios').getContext('2d');
    new Chart(ctxUsuarios, {
        type: 'pie',
        data: {
            labels: ['Norte', 'Sur', 'Este', 'Oeste'],
            datasets: [{ data: [30, 25, 20, 25], backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56'] }]
        }
    });
</script>
</body>
</html>
