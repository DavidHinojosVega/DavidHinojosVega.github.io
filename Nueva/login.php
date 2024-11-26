<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Bracket Master, la mejor solución para organizar torneos con años de experiencia.">
    <meta name="author" content="David Hinojos">
    <title>Login</title>
    <!-- Vinculando los estilos de Bootstrap 5 -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" crossorigin="anonymous" referrerpolicy="no-referrer"/>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body class="bg-light">
    <header class="bg-white py-3">
        <div class="container">
            <div class="d-flex justify-content-between align-items-center">
                <a href="./index.html"><img src="./img/bracketmaster.webp" alt="Logo de Bracket Master con letras" class="img-fluid" style="max-width: 150px;"></a>
            </div>
        </div>
    </header>

    <div class="container my-5">
        <div class="row">
            <div class="col-md-6 offset-md-3">
                <div class="card shadow-lg">
                    <div class="card-body">
                        <!-- Formulario de inicio de sesión -->
                        <div id="signin-form">
                            <h3 class="text-center mb-4">Ingresar</h3>
                            <div class="social-icons text-center mb-3">
                                <a href="#" class="btn btn-outline-danger mx-1"><i class="fa-brands fa-google-plus-g"></i> Google</a>
                                <a href="#" class="btn btn-outline-primary mx-1"><i class="fa-brands fa-facebook-square"></i> Facebook</a>
                                <a href="#" class="btn btn-outline-dark mx-1"><i class="fa-brands fa-github"></i> GitHub</a>
                                <a href="#" class="btn btn-outline-info mx-1"><i class="fa-brands fa-linkedin"></i> LinkedIn</a>
                            </div>
                            <p class="text-center">o usa tu email y contraseña</p>
                            <form>
                                <div class="mb-3">
                                    <input type="email" class="form-control" placeholder="Email" required>
                                </div>
                                <div class="mb-3">
                                    <input type="password" class="form-control" placeholder="Contraseña" required>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <a href="#" class="text-decoration-none">Olvidaste tu contraseña?</a>
                                    <button type="submit" class="btn btn-primary">Ingresar</button>
                                </div>
                            </form>
                        </div>

                        <!-- Formulario de registro (oculto inicialmente) -->
                        <div id="signup-form" class="d-none">
                            <h3 class="text-center mb-4">Crear cuenta</h3>
                            <div class="social-icons text-center mb-3">
                                <a href="#" class="btn btn-outline-danger mx-1"><i class="fa-brands fa-google-plus-g"></i> Google</a>
                                <a href="#" class="btn btn-outline-primary mx-1"><i class="fa-brands fa-facebook-square"></i> Facebook</a>
                                <a href="#" class="btn btn-outline-dark mx-1"><i class="fa-brands fa-github"></i> GitHub</a>
                                <a href="#" class="btn btn-outline-info mx-1"><i class="fa-brands fa-linkedin"></i> LinkedIn</a>
                            </div>
                            <p class="text-center">o usa tu email para registrarte</p>
                            <form>
                                <div class="mb-3">
                                    <input type="text" class="form-control" placeholder="Nombre" required>
                                </div>
                                <div class="mb-3">
                                    <input type="email" class="form-control" placeholder="Email" required>
                                </div>
                                <div class="mb-3">
                                    <input type="password" class="form-control" placeholder="Contraseña" required>
                                </div>
                                <button type="submit" class="btn btn-primary w-100">Registrarte</button>
                            </form>
                        </div>

                        <!-- Panel para alternar entre el login y el registro -->
                        <div class="d-flex justify-content-between mt-4">
                            <button id="login-btn" class="btn btn-link">Ya tienes cuenta? Inicia sesión</button>
                            <button id="register-btn" class="btn btn-link">¿No tienes cuenta? Regístrate</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Vinculando scripts de Bootstrap y el archivo JS para la interactividad -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        // Script para alternar entre los formularios de login y registro
        document.getElementById('login-btn').addEventListener('click', function() {
            document.getElementById('signin-form').classList.remove('d-none');
            document.getElementById('signup-form').classList.add('d-none');
        });
        document.getElementById('register-btn').addEventListener('click', function() {
            document.getElementById('signin-form').classList.add('d-none');
            document.getElementById('signup-form').classList.remove('d-none');
        });
    </script>
</body>
</html>
