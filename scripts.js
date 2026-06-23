/*LOGIN*/


function verificar_login(e) {
    e.preventDefault();
    const usuario = document.getElementById("usuario").value;
    const clave = document.getElementById("clave").value;

    if (usuario == "admin" && clave == "1234") {
        window.location.href = "index.html";

    } else if (usuario == "padre1" && clave == "1234") {
        window.location.href = "obtener_info_hijo.html";
    } else {
        document.getElementById("error").style.display = "block";
    }
}

const login = document.getElementById("login");
if (login) {
    login.addEventListener("submit", verificar_login);
}
/*MENÚ PERFIL*/
const perfil = document.getElementById("perfil");
const menu = document.querySelector(".menu_desplegable");

if (perfil && menu) {

    // Al hacer click en el icono de perfil, mostramos u ocultamos el menú.
    perfil.addEventListener("click", function (e) {
        menu.classList.toggle("mostrar");
    });

    // Si se hace click fuera del área del perfil, ocultamos el menú.
    document.addEventListener("click", function (e) {
        if (!e.target.closest(".perfil-menu")) {
            menu.classList.remove("mostrar");
        }
    });

}

/*RELOJ*/

// Área donde se muestra la hora en vivo.
const reloj = document.getElementById("reloj");

if (reloj) {

    function mostrarHora() {
        const fecha = new Date();

        let hora = fecha.getHours();
        let minutos = fecha.getMinutes();
        let segundos = fecha.getSeconds();

        // Añadir cero a la izquierda cuando el número es menor a 10.
        if (hora < 10) hora = "0" + hora;
        if (minutos < 10) minutos = "0" + minutos;
        if (segundos < 10) segundos = "0" + segundos;

        // Escribe la hora formateada en el elemento del reloj.
        reloj.innerHTML = hora + ":" + minutos + ":" + segundos;
    }

    mostrarHora(); // Muestra la hora inmediatamente.
    setInterval(mostrarHora, 1000); // Actualiza cada segundo.

}

/*REGISTRAR ASISTENCIA*/

// Formulario de registro de asistencia.
const formulario = document.getElementById("formAsistencia");

if (formulario) {

    formulario.addEventListener("submit", function (e) {

        e.preventDefault(); // Evita el envío real para no recargar la página.

        let dni = document.getElementById("dni").value;
        let fecha = document.getElementById("fecha").value;
        let estado = document.getElementById("estado").value;

        // Validaciones de cada campo del formulario.
        if (dni == "") {
            alert("Ingrese DNI");
            return;
        }

        if (isNaN(dni)) {
            alert("El DNI debe contener solo números");
            return;
        }

        if (dni.length < 7 || dni.length > 8) {
            alert("El DNI debe tener entre 7 y 8 dígitos");
            return;
        }

        if (fecha == "") {
            alert("Seleccione una fecha");
            return;
        }

        if (estado == "") {
            alert("Seleccione un estado");
            return;
        }

        // Si todo está bien, mostramos un mensaje de éxito.
        let mensaje = document.getElementById("mensaje");
        mensaje.style.display = "block";
        mensaje.className = "resultado exito";
        mensaje.innerHTML = "Asistencia registrada correctamente.";

    });

}

const alumnos = [

    {
        dni: "12345678",
        nombre: "Juan Pérez",
        curso: "5° A",

        asistencias: 120,

        inasistencias: [
            "05/03/2026",
            "18/04/2026",
            "10/05/2026"
        ]
    },

    {
        dni: "45678912",
        nombre: "María Gómez",
        curso: "4° B",

        asistencias: 128,

        inasistencias: [
            "12/03/2026"
        ]
    }

];


/*OBTENER INFORMACIÓN DEL ALUMNO E HIJO(USUARIO PADRES)*/

const formularioInfo = document.getElementById("formObtenerInfoA");

if(formularioInfo){

    formularioInfo.addEventListener("submit",function(e){

        e.preventDefault();

        const dni=document.getElementById("dni").value;

        const informe=document.getElementById("informe");

        const alumno=alumnos.find(a=>a.dni===dni);

        if(!alumno){

            informe.style.display="block";

            informe.innerHTML=`
                <h3>Alumno no encontrado</h3>
            `;

            return;

        }

        informe.style.display="block";

        /* Explicación: construimos dinámicamente la lista de inasistencias.
        - `alumno.inasistencias` es un array de strings (fechas).
        - `.map(fecha => `...`)` transforma cada fecha en un elemento HTML `<li>`.
        - `.join("")` concatena todos los `<li>` en un único string sin separadores.
        El resultado se inserta dentro del `<ul>` del template literal a continuación.*/
        informe.innerHTML=`

            <h2>Informe del alumno</h2>

            <hr><br>

            <p><strong>Nombre:</strong> ${alumno.nombre}</p>

            <p><strong>DNI:</strong> ${alumno.dni}</p>

            <p><strong>Curso:</strong> ${alumno.curso}</p>

            <br>

            <p><strong>Total de asistencias:</strong> ${alumno.asistencias}</p>

            <p><strong>Total de inasistencias:</strong> ${alumno.inasistencias.length}</p>

            <br>

            <h3>Fechas de inasistencia</h3>

            <ul>
                ${alumno.inasistencias.map(fecha=>`<li>${fecha}</li>`).join("")}

            </ul>

        `;

    });

}
const alumnos_padres = [

    {
        dni:"12345678",
        nombre:"Juan Pérez",
        curso:"5° A",

        padre:{
            nombre:"Carlos Pérez",
            telefono:"264-5551234",
        },

        madre:{
            nombre:"María Gómez",
            telefono:"264-5555678",
        }
    },

    {
        dni:"40111222",
        nombre:"Lucía Rodríguez",
        curso:"4° B",

        padre:{
            nombre:"José Rodríguez",
            telefono:"264-4442222",
        },

        madre:{
            nombre:"Ana López",
            telefono:"264-3331111",
        }
    }

];
const formularioInfoP = document.getElementById("formObtenerInfoA");

if(formularioInfoP && window.location.pathname.includes("obtener_info_padre.html")){

    formularioInfoP.addEventListener("submit", function(e){

        e.preventDefault();

        const dni = document.getElementById("dni").value;

        const informe = document.getElementById("informe");

        const alumno = alumnos_padres.find(a => a.dni === dni);

        if(!alumno){

            informe.style.display = "block";

            informe.innerHTML = `
                <h3>Alumno no encontrado</h3>
            `;

            return;
        }

        informe.style.display = "block";

        informe.innerHTML = `

            <h2>Datos del alumno</h2>

            <hr><br>

            <p><strong>Nombre:</strong> ${alumno.nombre}</p>

            <p><strong>DNI:</strong> ${alumno.dni}</p>

            <p><strong>Curso:</strong> ${alumno.curso}</p>

            <br>

            <h2>Datos de los padres</h2>

            <hr><br>

            <p><strong>Padre:</strong> ${alumno.padre.nombre}</p>

            <p><strong>Telefono:</strong> ${alumno.padre.telefono}</p>

            <br>

            <p><strong>Madre:</strong> ${alumno.madre.nombre}</p>

            <p><strong>Telefono:</strong> ${alumno.madre.telefono}</p>

        `;

    });

}