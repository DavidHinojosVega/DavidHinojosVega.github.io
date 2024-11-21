// Inicializar SweetAlert para notificaciones rápidas
const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
});

// Inicializar Swal con botones personalizados
const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
});

// Inicializar Modal
const commentModalElement = document.getElementById('addCommentModal');
const commentModal = new bootstrap.Modal(commentModalElement);

// Array para almacenar comentarios
const comentarios = [];
let comentarioEnEdicion = null;

// Elementos del DOM
const commentTable = document.getElementById('commentTable');
const addCommentForm = document.getElementById('addCommentForm');

// Renderizar comentarios en la tabla
function renderComentarios() {
    commentTable.innerHTML = '';
    comentarios.forEach(comentario => {
        commentTable.innerHTML += `
            <tr>
                <td>${comentario.id}</td>
                <td>${comentario.usuario}</td>
                <td>${comentario.texto}</td>
                <td>${comentario.fecha}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="confirmarEdicion(${comentario.id})"><i class="bi bi-pencil"></i> Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="confirmarEliminacion(${comentario.id})"><i class="bi bi-trash"></i> Eliminar</button>
                </td>
            </tr>
        `;
    });
}

// Manejar formulario de agregar comentario
addCommentForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const usuario = document.getElementById('usuario').value;
    const texto = document.getElementById('texto').value;
    const fecha = new Date().toLocaleString();

    if (comentarioEnEdicion) {
        comentarioEnEdicion.usuario = usuario;
        comentarioEnEdicion.texto = texto;
        comentarioEnEdicion.fecha = fecha;

        Toast.fire({ icon: 'success', title: 'Comentario actualizado correctamente' });
        comentarioEnEdicion = null;
    } else {
        comentarios.push({
            id: comentarios.length + 1,
            usuario,
            texto,
            fecha
        });

        Toast.fire({ icon: 'success', title: 'Comentario agregado correctamente' });
    }

    renderComentarios();
    addCommentForm.reset();
    commentModal.hide();
});

// Función para confirmar eliminación de comentario
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
            eliminarComentario(id); // Eliminar comentario
            swalWithBootstrapButtons.fire(
                "¡Eliminado!",
                "El comentario ha sido eliminado.",
                "success"
            );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
                "Cancelado",
                "El comentario está a salvo.",
                "error"
            );
        }
    });
}

// Función para confirmar edición de comentario
function confirmarEdicion(id) {
    swalWithBootstrapButtons.fire({
        title: "¿Editar este comentario?",
        text: "Podrás actualizar los datos en el formulario.",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, editar",
        cancelButtonText: "No, cancelar",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            editarComentario(id); // Precargar datos en el formulario
            swalWithBootstrapButtons.fire(
                "¡Formulario abierto!",
                "Edita los datos del comentario.",
                "info"
            );
        }
    });
}

// Función para eliminar comentario
function eliminarComentario(id) {
    const index = comentarios.findIndex(c => c.id === id);
    if (index !== -1) {
        comentarios.splice(index, 1);
        renderComentarios();
        Toast.fire({ icon: 'success', title: 'Comentario eliminado correctamente' });
    }
}

// Función para editar comentario
function editarComentario(id) {
    const comentario = comentarios.find(c => c.id === id);
    if (!comentario) return;

    // Precargar datos en el formulario
    document.getElementById('usuario').value = comentario.usuario;
    document.getElementById('texto').value = comentario.texto;

    comentarioEnEdicion = comentario; // Guardar el comentario en edición
    commentModal.show(); // Mostrar modal
}

// Inicializar la tabla
renderComentarios();
