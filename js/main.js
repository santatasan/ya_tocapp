//Importamos las clases
import Tarea from "./tarea.js";
import ListaTareas from "./listatareas.js";

//Generamos una lista de tareas con la que vamos a trabajar y le insertamos varias tareas por defecto
let tareas = new ListaTareas();

let tarea1 = new Tarea(1, 'Estudiar javascript', 'urgente', true);
let tarea2 = new Tarea(2, 'Pasear al perro', 'diaria', true);
let tarea3 = new Tarea(3, 'Darse una ducha', 'mensual', true);

tareas.agregarTarea(tarea1);
tareas.agregarTarea(tarea2);
tareas.agregarTarea(tarea3);

//Capturamos los elementos que nos van a hacer falta y que existen desde el principio
const seccionPendientes = document.querySelector('.pendientes');
const seccionCompletadas = document.querySelector('.completadas');
const nuevaTarea = document.querySelector('.nuevo');
const filtros = document.querySelector('.filtros');
const filtroExtendido = document.querySelector('.filtroextendido');
const filtroTexto = document.querySelector('#filtrotexto');
const filtroPrioridad = document.querySelector('#filtroprioridad');

//Damos funcionalidad al botón de filtros
filtros.addEventListener('click', mostrarFiltros);
function mostrarFiltros() {
    if (filtroExtendido.style.display === 'none') {
        filtroExtendido.style.display = 'flex';
        filtroExtendido.classList.replace('flox', 'flex');
    } else {
        filtroExtendido.classList.replace('flex', 'flox');
        setTimeout(() => {
            filtroExtendido.style.display = 'none';
        }, 500);
    }
}

filtroTexto.value = '';
filtroPrioridad.value = '';

//Al clicar en mostrar una u otra sección, se muestra la sección elegida y la otra se oculta
function cambiarSeccion(event) {
    event.preventDefault();
    if (event.target.dataset.id === 'seccion2') {
        seccionPendientes.style.display = 'none';
        seccionCompletadas.style.display = 'flex';
    } else {
        seccionPendientes.style.display = 'flex';
        seccionCompletadas.style.display = 'none';
    }
}

//Pintamos las tareas
tareas.pintarTareas(seccionPendientes, seccionCompletadas);
let enlacesSecciones = document.querySelectorAll('.enlaces>a');
enlacesSecciones.forEach(enlace => enlace.addEventListener('click', cambiarSeccion));

//Borrar tareas
let papelera = document.querySelectorAll(`article i`);
papelera.forEach(elemento => elemento.addEventListener('click', borrarTareas));

function borrarTareas(event) {
    tareas.borrarTarea(event.target.parentNode);
    //tareas.pintarTareas(seccionPendientes, seccionCompletadas);
}

//Filtro semántico
filtroTexto.addEventListener('input', (event) => {
    let listaFiltrada = new ListaTareas();
    tareas.buscarTexto(event.target.value).forEach(tarea => listaFiltrada.agregarTarea(tarea));
    listaFiltrada.pintarTareas(seccionPendientes, seccionCompletadas);
    papelera = document.querySelectorAll(`article i`);
    papelera.forEach(elemento => elemento.addEventListener('click', borrarTareas));
    enlacesSecciones = document.querySelectorAll('.enlaces>a');
    enlacesSecciones.forEach(enlace => enlace.addEventListener('click', cambiarSeccion));
})

//Filtro por prioridad
filtroPrioridad.addEventListener('change', (event) => {
    let listaFiltrada = new ListaTareas();
    tareas.buscarPrioridad(event.target.value).forEach(tarea => listaFiltrada.agregarTarea(tarea));
    listaFiltrada.pintarTareas(seccionPendientes, seccionCompletadas);
    papelera = document.querySelectorAll(`article i`);
    papelera.forEach(elemento => elemento.addEventListener('click', borrarTareas));
    enlacesSecciones = document.querySelectorAll('.enlaces>a');
    enlacesSecciones.forEach(enlace => enlace.addEventListener('click', cambiarSeccion));
})