//Importamos las clases
import Tarea from "./tarea.js";
import ListaTareas from "./listatareas.js";

//Generamos una lista de tareas con la que vamos a trabajar y le insertamos varias tareas por defecto
let tareas = new ListaTareas();

let tarea1 = new Tarea(1, 'Estudiar javascript', 'urgente', true);
let tarea2 = new Tarea(2, 'Pasear al perro', 'diaria', true);
let tarea3 = new Tarea(3, 'Darse una ducha', 'mensual');

tareas.agregarTarea(tarea1);
tareas.agregarTarea(tarea2);
tareas.agregarTarea(tarea3);

//Capturamos los elementos que nos van a hacer falta y que existen desde el principio

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

//Pintamos las tareas
tareas.pintarTareas();

function borrarTareas(event) {
    tareas.borrarTarea(event.target.parentNode);
    //tareas.pintarTareas(seccionPendientes, seccionCompletadas);
}

//Filtro semántico
filtroTexto.addEventListener('input', (event) => { tareas.filtrar(event.target.value, 'titulo'); filtroPrioridad.value = ''; });
//papelera = document.querySelectorAll(`article i`);
//papelera.forEach(elemento => elemento.addEventListener('click', borrarTareas));

//Filtro por prioridad
filtroPrioridad.addEventListener('change', (event) => { tareas.filtrar(event.target.value, 'prioridad'); filtroTexto.value = ''; });
//papelera = document.querySelectorAll(`article i`);
//papelera.forEach(elemento => elemento.addEventListener('click', borrarTareas));