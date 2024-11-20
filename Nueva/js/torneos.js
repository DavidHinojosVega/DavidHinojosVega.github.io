// Array para almacenar torneos temporalmente
const torneos = [];

// Elementos del DOM
const torneoTable = document.getElementById('torneoTable'); // Tabla donde se renderizan torneos
const addTorneoForm = document.getElementById('addTorneoForm'); // Formulario de agregar torneo
const addTorneoModalElement = document.getElementById('addTorneoModal'); // Modal de Bootstrap
const modalInstanceTorneo = new bootstrap.Modal(addTorneoModalElement); // Instancia del modal Bootstrap

// Renderizar torneos en la tabla
function renderTorneos() {
    torneoTable.innerHTML = ''; // Limpiar la tabla
    torneos.forEach(torneo => {
        torneoTable.innerHTML += `
            <tr>
                <td>${torneo.id}</td>
                <td>${torneo.nombre}</td>
                <td>${torneo.descripcion}</td>
                <td>${torneo.participantes}</td>
                <td>$${torneo.costo}</td>
                <td>${torneo.fecha}</td>
                <td>${torneo.ubicacion}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editarTorneo(${torneo.id})"><i class="bi bi-pencil"></i> Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="eliminarTorneo(${torneo.id})"><i class="bi bi-trash"></i> Eliminar</button>
                </td>
            </tr>
        `;
    });
}

// Manejar formulario de agregar torneo
addTorneoForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Evitar recarga de la página

    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value || 'N/A';
    const participantes = parseInt(document.getElementById('participantes').value);
    const costo = parseFloat(document.getElementById('costo').value);
    const fecha = document.getElementById('fecha').value;
    const ubicacion = document.getElementById('ubicacion').value;

    // Crear un nuevo torneo
    const nuevoTorneo = {
        id: torneos.length + 1, // Generar un ID incremental
        nombre,
        descripcion,
        participantes,
        costo,
        fecha,
        ubicacion
    };

    torneos.push(nuevoTorneo); // Agregar al array
    renderTorneos(); // Actualizar la tabla
    addTorneoForm.reset(); // Limpiar formulario
    modalInstanceTorneo.hide(); // Cerrar modal
});

// Función para eliminar torneo
function eliminarTorneo(id) {
    const index = torneos.findIndex(torneo => torneo.id === id);
    if (index !== -1) {
        torneos.splice(index, 1); // Eliminar del array
        renderTorneos(); // Volver a renderizar la tabla
    }
}

// Función para editar torneo
function editarTorneo(id) {
    const torneo = torneos.find(t => t.id === id);
    if (!torneo) return;

    // Precargar datos en el formulario
    document.getElementById('nombre').value = torneo.nombre;
    document.getElementById('descripcion').value = torneo.descripcion;
    document.getElementById('participantes').value = torneo.participantes;
    document.getElementById('costo').value = torneo.costo;
    document.getElementById('fecha').value = torneo.fecha;
    document.getElementById('ubicacion').value = torneo.ubicacion;

    // Guardar cambios
    addTorneoForm.addEventListener('submit', function handleEdit(e) {
        e.preventDefault();
        torneo.nombre = document.getElementById('nombre').value;
        torneo.descripcion = document.getElementById('descripcion').value;
        torneo.participantes = parseInt(document.getElementById('participantes').value);
        torneo.costo = parseFloat(document.getElementById('costo').value);
        torneo.fecha = document.getElementById('fecha').value;
        torneo.ubicacion = document.getElementById('ubicacion').value;

        renderTorneos(); // Actualizar tabla
        addTorneoForm.reset(); // Limpiar formulario
        modalInstanceTorneo.hide(); // Cerrar modal
        addTorneoForm.removeEventListener('submit', handleEdit); // Evitar múltiples eventos
    });

    modalInstanceTorneo.show(); // Abrir modal
}

// Inicializar tabla vacía
renderTorneos();
