const escenarios = [
    { id: "Battlefield", estado: "disponible" },
    { id: "Small Battlefield", estado: "disponible" },
    { id: "Final Destination", estado: "disponible" },
    { id: "Yoshi's Story", estado: "disponible" },
    { id: "Pokémon Stadium 2", estado: "disponible" },
    { id: "Smashville", estado: "disponible" },
    { id: "Town and City", estado: "disponible" },
    { id: "Kalos Pokémon League", estado: "disponible" },
    { id: "Hollow Bastion", estado: "disponible" }
];

let fase = 1; // Controla la fase actual
let jugador = 1; // Jugador actual
let baneosRestantes = 3; // Número de baneos para la fase inicial
let turnoGanador = true; // Define si es el turno del ganador o del perdedor

// Función para manejar el clic en un escenario
function handleStage(nombre) {
    const escenario = escenarios.find(e => e.id === nombre);

    if (fase === 1) {
        // Fase 1: Baneos iniciales
        if (escenario.estado === "disponible" && baneosRestantes > 0) {
            escenario.estado = "baneado";
            baneosRestantes--;
            updateMessage(`Jugador ${jugador}: Baneó ${nombre}. Baneos restantes: ${baneosRestantes}`);

            if (baneosRestantes === 0) {
                jugador = jugador === 1 ? 2 : 1; // Cambiar de jugador
                baneosRestantes = jugador === 1 ? 3 : 4; // Actualizar baneos restantes

                if (jugador === 1 && baneosRestantes === 3) {
                    fase = 2; // Cambiar a la fase de selección
                    updateMessage("Fase de selección: Jugador 1 elige un escenario de los 2 restantes.");
                    toggleNextPhaseButton(true); // Mostrar el botón para pasar de fase
                } else {
                    updateMessage(`Turno del jugador ${jugador}. Baneos restantes: ${baneosRestantes}`);
                }
            }
        }
    } else if (fase === 2) {
        // Fase 2: Selección de escenario para la primera partida
        if (escenario.estado === "disponible") {
            escenario.estado = "seleccionado";
            updateMessage(`${nombre} ha sido seleccionado para la primera partida.`);
            fase = 3; // Cambiar a la fase repetitiva
            toggleNextPhaseButton(true); // Mostrar botón para pasar a la siguiente fase
        }
    } else if (fase === 4) {
        // Fase repetitiva: Manejo de turnos
        if (turnoGanador) {
            // Turno del ganador: Banea 3 escenarios
            if (escenario.estado === "disponible" && baneosRestantes > 0) {
                escenario.estado = "baneado";
                baneosRestantes--;
                updateMessage(`Ganador: Baneó ${nombre}. Baneos restantes: ${baneosRestantes}`);

                if (baneosRestantes === 0) {
                    turnoGanador = false; // Cambiar turno al perdedor
                    updateMessage("Perdedor: Elige un escenario disponible.");
                }
            }
        } else {
            // Turno del perdedor: Elige un escenario
            if (escenario.estado === "disponible") {
                escenario.estado = "seleccionado";
                updateMessage(`Perdedor: Seleccionó ${nombre} para la siguiente partida.`);
                turnoGanador = true; // Cambiar turno al ganador para la siguiente ronda
                toggleNextPhaseButton(true); // Mostrar botón para reiniciar
            }
        }
    }
    actualizarVisuales();
}

// Función para avanzar a la siguiente fase
function nextPhase() {
    // Reiniciar todos los escenarios y variables al presionar el botón
    resetEscenarios();
    fase = 4; // Mantener en la fase repetitiva
    turnoGanador = true; // Reiniciar turno al ganador
    baneosRestantes = 3; // Reiniciar los baneos del ganador
    updateMessage("Fase repetitiva: Ganador banea 3 escenarios.");
    toggleNextPhaseButton(false); // Ocultar el botón
    actualizarVisuales();
}

// Función para resetear todos los escenarios disponibles
function resetEscenarios() {
    escenarios.forEach(escenario => {
        escenario.estado = "disponible"; // Reiniciar todos los escenarios a disponibles
    });
}

// Actualizar visualmente los botones
// Actualizar visualmente los botones
function actualizarVisuales() {
    escenarios.forEach(escenario => {
        const button = document.getElementById(escenario.id);
        if (escenario.estado === "baneado") {
            button.classList.add("baneado"); // Aplicar contorno rojo
            button.classList.remove("seleccionado");
        } else if (escenario.estado === "seleccionado") {
            button.classList.add("seleccionado"); // Aplicar contorno verde
            button.classList.remove("baneado");
        } else {
            button.classList.remove("baneado", "seleccionado"); // Quitar ambos contornos
        }
    });
}


// Función para actualizar el mensaje en la página
function updateMessage(message) {
    const messageDiv = document.getElementById("status-message");
    messageDiv.textContent = message;
}

// Función para mostrar u ocultar el botón de pasar a la siguiente fase
function toggleNextPhaseButton(show) {
    const button = document.getElementById("next-phase-btn");
    button.style.display = show ? "block" : "none";
}

// Inicializar la página
document.addEventListener("DOMContentLoaded", () => {
    actualizarVisuales();
    updateMessage(`Turno del jugador ${jugador}. Baneos restantes: ${baneosRestantes}`);
    toggleNextPhaseButton(false); // Ocultar botón de fase al inicio
});
