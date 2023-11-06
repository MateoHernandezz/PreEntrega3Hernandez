// Función para registrar un alumno
function registrarAlumno() {
    const nombre = document.getElementById("nombre").value;
    const nota1 = parseFloat(document.getElementById("nota1").value);
    const nota2 = parseFloat(document.getElementById("nota2").value);

    if (nombre && !isNaN(nota1) && !isNaN(nota2)) {
        const alumno = {
            nombre: nombre,
            nota1: nota1,
            nota2: nota2
        };

        // Almacenar el alumno en el almacenamiento local (localStorage)
        let alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];
        alumnos.push(alumno);
        localStorage.setItem("alumnos", JSON.stringify(alumnos));

        // Limpiar el formulario
        document.getElementById("studentForm").reset();

        // Actualizar la lista de alumnos y calcular el promedio
        mostrarAlumnos();
        calcularPromedio();
    } else {
        alert("Por favor, ingrese un nombre y notas válidas.");
    }
}

// Función para mostrar la lista de alumnos
function mostrarAlumnos() {
    const alumnosList = document.getElementById("alumnos");
    const alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];
    alumnosList.innerHTML = "";

    alumnos.forEach(alumno => {
        const listItem = document.createElement("li");
        listItem.textContent = `${alumno.nombre} - Nota 1: ${alumno.nota1}, Nota 2: ${alumno.nota2}`;
        alumnosList.appendChild(listItem);
    });
}

// Función para calcular y mostrar el promedio de notas
function calcularPromedio() {
    const alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];

    if (alumnos.length > 0) {
        const totalNotas = alumnos.reduce((total, alumno) => total + (alumno.nota1 + alumno.nota2), 0);
        const promedio = totalNotas / (alumnos.length * 2);
        document.getElementById("promedio").textContent = `Promedio de Notas: ${promedio.toFixed(2)}`;
    } else {
        document.getElementById("promedio").textContent = "No hay alumnos registrados aún.";
    }
}

// Mostrar la lista de alumnos y el promedio al cargar la página
mostrarAlumnos();
calcularPromedio();