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
const reportModalElement = document.getElementById('addReportModal');
const reportModal = new bootstrap.Modal(reportModalElement);

// Array para almacenar reportes
const reportes = [];
let reporteEnEdicion = null;

// Elementos del DOM
const reportTable = document.getElementById('reportTable');
const addReportForm = document.getElementById('addReportForm');

// Renderizar reportes en la tabla
function renderReportes() {
    reportTable.innerHTML = '';
    reportes.forEach(reporte => {
        reportTable.innerHTML += `
            <tr>
                <td>${reporte.id}</td>
                <td>${reporte.titulo}</td>
                <td>${reporte.descripcion}</td>
                <td>${reporte.fecha}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="confirmarEdicion(${reporte.id})"><i class="bi bi-pencil"></i> Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="confirmarEliminacion(${reporte.id})"><i class="bi bi-trash"></i> Eliminar</button>
                </td>
            </tr>
        `;
    });
}

// Manejar formulario de agregar reporte
addReportForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;
    const fecha = new Date().toLocaleString();

    if (reporteEnEdicion) {
        reporteEnEdicion.titulo = titulo;
        reporteEnEdicion.descripcion = descripcion;
        reporteEnEdicion.fecha = fecha;

        Toast.fire({ icon: 'success', title: 'Reporte actualizado correctamente' });
        reporteEnEdicion = null;
    } else {
        reportes.push({
            id: reportes.length + 1,
            titulo,
            descripcion,
            fecha
        });

        Toast.fire({ icon: 'success', title: 'Reporte agregado correctamente' });
    }

    renderReportes();
    addReportForm.reset();
    reportModal.hide();
});

// Función para confirmar eliminación de reporte
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
            eliminarReporte(id); // Eliminar reporte
            swalWithBootstrapButtons.fire(
                "¡Eliminado!",
                "El reporte ha sido eliminado.",
                "success"
            );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
                "Cancelado",
                "El reporte está a salvo.",
                "error"
            );
        }
    });
}

// Función para confirmar edición de reporte
function confirmarEdicion(id) {
    swalWithBootstrapButtons.fire({
        title: "¿Editar este reporte?",
        text: "Podrás actualizar los datos en el formulario.",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, editar",
        cancelButtonText: "No, cancelar",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            editarReporte(id); // Precargar datos en el formulario
            swalWithBootstrapButtons.fire(
                "¡Formulario abierto!",
                "Edita los datos del reporte.",
                "info"
            );
        }
    });
}

// Función para eliminar reporte
function eliminarReporte(id) {
    const index = reportes.findIndex(r => r.id === id);
    if (index !== -1) {
        reportes.splice(index, 1);
        renderReportes();
        Toast.fire({ icon: 'success', title: 'Reporte eliminado correctamente' });
    }
}

// Función para editar reporte
function editarReporte(id) {
    const reporte = reportes.find(r => r.id === id);
    if (!reporte) return;

    // Precargar datos en el formulario
    document.getElementById('titulo').value = reporte.titulo;
    document.getElementById('descripcion').value = reporte.descripcion;

    reporteEnEdicion = reporte; // Guardar el reporte en edición
    reportModal.show(); // Mostrar modal
}

// Inicializar la tabla
renderReportes();
