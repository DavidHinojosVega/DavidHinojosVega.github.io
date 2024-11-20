document.getElementById("nextButton").addEventListener("click", function () {
    const monto = document.getElementById("monto").value;
    if (monto > 0) {
        // Esconde el primer paso y muestra el segundo
        document.getElementById("step1").style.display = "none";
        document.getElementById("step2").style.display = "block";
    } else {
        alert("Por favor, ingresa un monto válido.");
    }
});

// Calcular y mostrar los resultados
document.getElementById("calculateButton").addEventListener("click", function () {
    const monto = parseFloat(document.getElementById("monto").value);
    const primerLugar = parseFloat(document.getElementById("primerLugar").value);
    const segundoLugar = parseFloat(document.getElementById("segundoLugar").value);
    const tercerLugar = parseFloat(document.getElementById("tercerLugar").value);
    const organizadores = parseFloat(document.getElementById("organizadores").value);

    // Validar que los porcentajes sumen 100%
    const totalPorcentaje = primerLugar + segundoLugar + tercerLugar + organizadores;

    if (totalPorcentaje === 100) {
        // Calcular las cantidades
        const primerLugarMonto = (monto * primerLugar) / 100;
        const segundoLugarMonto = (monto * segundoLugar) / 100;
        const tercerLugarMonto = (monto * tercerLugar) / 100;
        const organizadoresMonto = (monto * organizadores) / 100;

        // Mostrar los resultados
        document.getElementById("step2").style.display = "none";
        document.getElementById("result").style.display = "block";

        const resultList = document.getElementById("resultList");
        resultList.innerHTML = `
                <li>Primer lugar: $${primerLugarMonto.toFixed(2)}</li>
                <li>Segundo lugar: $${segundoLugarMonto.toFixed(2)}</li>
                <li>Tercer lugar: $${tercerLugarMonto.toFixed(2)}</li>
                <li>Organizadores: $${organizadoresMonto.toFixed(2)}</li>
            `;
    } else {
        alert("La suma de los porcentajes debe ser igual a 100%");
    }
});