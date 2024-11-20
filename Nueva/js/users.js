// Inicializar Toast
const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

// Inicializar Swal con botones personalizados
const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
});

// Array para almacenar usuarios temporalmente
const usuarios = [];

// Elementos del DOM
const userTable = document.getElementById('userTable'); // Tabla donde se renderizan usuarios
const addUserForm = document.getElementById('addUserForm'); // Formulario de agregar usuario
const addUserModalElement = document.getElementById('addUserModal'); // Modal de Bootstrap
const modalInstance = new bootstrap.Modal(addUserModalElement); // Instancia de modal Bootstrap

let usuarioEnEdicion = null; // Variable para almacenar usuario en edición

// Renderizar usuarios en la tabla
function renderUsuarios() {
    userTable.innerHTML = ''; // Limpiar la tabla
    usuarios.forEach(usuario => {
        userTable.innerHTML += `
            <tr>
                <td>${usuario.id}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.apellido}</td>
                <td>${usuario.nickname}</td>
                <td>${usuario.correo}</td>
                <td>${usuario.personaje.nombre}</td>
                <td>${usuario.personaje.color}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="confirmarEdicion(${usuario.id})"><i class="bi bi-pencil"></i> Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="confirmarEliminacion(${usuario.id})"><i class="bi bi-trash"></i> Eliminar</button>
                </td>
            </tr>
        `;
    });
}

// Evento del formulario de agregar usuario
addUserForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Evitar recarga de la página

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value || 'N/A';
    const nickname = document.getElementById('nickname').value;
    const correo = document.getElementById('correo').value;
    const color = document.getElementById('color').value;
    const personaje = document.getElementById('personaje').value;

    if (usuarioEnEdicion) {
        // Actualizar usuario
        usuarioEnEdicion.nombre = nombre;
        usuarioEnEdicion.apellido = apellido;
        usuarioEnEdicion.nickname = nickname;
        usuarioEnEdicion.correo = correo;
        usuarioEnEdicion.personaje.color = color;
        usuarioEnEdicion.personaje.nombre = personaje;
        usuarioEnEdicion = null; // Limpiar variable

        // Mostrar alerta de actualización exitosa
        Toast.fire({
            icon: "success",
            title: "Usuario actualizado correctamente"
        });
    } else {
        // Crear un nuevo usuario
        const nuevoUsuario = {
            id: usuarios.length + 1,
            nombre,
            apellido,
            nickname,
            correo,
            personaje: {
                color,
                nombre: personaje
            }
        };
        usuarios.push(nuevoUsuario); // Agregar al array

        // Mostrar alerta de creación exitosa
        Toast.fire({
            icon: "success",
            title: "Usuario agregado correctamente"
        });
    }

    renderUsuarios(); // Actualizar tabla
    addUserForm.reset(); // Limpiar formulario
    modalInstance.hide(); // Cerrar modal
});

// Función para confirmar eliminación de usuario
function confirmarEliminacion(id) {
    swalWithBootstrapButtons.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esta acción!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "No, cancelar",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            eliminarUsuario(id); // Llamar a la función de eliminación
            swalWithBootstrapButtons.fire({
                title: "¡Eliminado!",
                text: "El usuario ha sido eliminado.",
                icon: "success"
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
                title: "Cancelado",
                text: "El usuario está a salvo.",
                icon: "error"
            });
        }
    });
}

// Función para confirmar edición de usuario
function confirmarEdicion(id) {
    swalWithBootstrapButtons.fire({
        title: "¿Quieres editar este usuario?",
        text: "Podrás actualizar sus datos en el formulario.",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, editar",
        cancelButtonText: "No, cancelar",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            editarUsuario(id); // Llamar a la función de edición
            swalWithBootstrapButtons.fire({
                title: "¡Formulario abierto!",
                text: "Edita los datos del usuario.",
                icon: "info"
            });
        }
    });
}

// Función para eliminar usuario
function eliminarUsuario(id) {
    const index = usuarios.findIndex(usuario => usuario.id === id);
    if (index !== -1) {
        usuarios.splice(index, 1);
        renderUsuarios(); // Actualizar tabla
    }
}

// Función para editar usuario
function editarUsuario(id) {
    const usuario = usuarios.find(u => u.id === id);
    if (!usuario) return;

    document.getElementById('nombre').value = usuario.nombre;
    document.getElementById('apellido').value = usuario.apellido;
    document.getElementById('nickname').value = usuario.nickname;
    document.getElementById('correo').value = usuario.correo;
    document.getElementById('color').value = usuario.personaje.color;
    document.getElementById('personaje').value = usuario.personaje.nombre;

    usuarioEnEdicion = usuario; // Guardar en edición
    modalInstance.show(); // Abrir modal
}

// Inicializar tabla vacía
renderUsuarios();
