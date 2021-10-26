//Importamos la clase
import Tarea from "./tarea.js";

//Generamos una lista de tareas con la que vamos a trabajar y le insertamos varias tareas por defecto
let tareas = new Array(
    new Tarea(1, 'Estudiar javascript', 'urgente', true),
    new Tarea(2, 'Pasear al perro', 'diaria', true),
    new Tarea(3, 'Darse una ducha', 'mensual'),
    new Tarea(4, 'Hacer la compra', 'urgente', true),
    new Tarea(5, 'Pagar el alquiler', 'mensual'),
    new Tarea(6, 'Terminar la app toDo', 'urgente'),
);

//Capturamos los elementos que nos van a hacer falta y que existen desde el principio
const nuevo = document.querySelector('.nuevo');
const crearTarea = document.querySelector('#btn');
const cerrarNuevo = document.querySelector('#btnCancel');
const nuevaTarea = document.querySelector('.nuevatarea');
nuevaTarea.style.display = 'none';
const form = document.querySelector('form');
const titulo = document.querySelector('#titulo');
const selectPrioridad = document.querySelector('#selectprioridad');
const seccionPendientes = document.querySelector('.pendientes');
const seccionCompletadas = document.querySelector('.completadas');
const filtros = document.querySelector('.filtros');
const filtroExtendido = document.querySelector('.filtroextendido');
const filtroTexto = document.querySelector('#filtrotexto');
const filtroPrioridad = document.querySelector('#filtroprioridad');
inicializarFiltros();

//Comunicación con localStorage
if (localStorage.getItem('tasks') === null) {
    localStorage.setItem('tasks', JSON.stringify(tareas));
} else {
    let listaPuente = new Array();
    (JSON.parse(localStorage.getItem('tasks'))).forEach(tarea => { let element = new Tarea(tarea.id, tarea.titulo, tarea.prioridad, tarea.completa); listaPuente.push(element) });
    tareas = listaPuente;
}

//Pintamos las tareas
function pintarTareas(listaTareas, validacion = true) {
    localStorage.setItem('tasks', JSON.stringify(tareas));
    let contadorCompletas = 0;
    let contadorPendientes = 0;
    seccionPendientes.innerHTML = '';
    seccionCompletadas.innerHTML = '';
    let divEnlace1 = document.createElement('div');
    let divEnlace2 = document.createElement('div');
    let enlace1 = document.createElement('a');
    let enlace2 = document.createElement('a');

    enlace1.dataset.id = 'seccion2';
    enlace1.innerText = 'Mostrar completadas';
    enlace2.dataset.id = 'seccion1';
    enlace2.innerText = 'Mostrar pendientes';
    divEnlace1.classList.add('enlaces');
    divEnlace2.classList.add('enlaces');

    divEnlace1.appendChild(enlace1);
    divEnlace2.appendChild(enlace2);
    seccionPendientes.appendChild(divEnlace1);
    seccionCompletadas.appendChild(divEnlace2);

    if (validacion) {
        seccionCompletadas.style.display = 'none';
        seccionPendientes.style.display = 'flex';
    }

    listaTareas.forEach(tarea => {
        if (tarea.completa) {
            contadorCompletas += 1;
            tarea.mostrarTarea(seccionCompletadas, 'completa');
        } else {
            contadorPendientes += 1;
            tarea.mostrarTarea(seccionPendientes, 'pendiente');
        }
    });

    if (contadorCompletas === 0) imagenFondo(seccionCompletadas);
    if (contadorPendientes === 0) imagenFondo(seccionPendientes);

    enlace1.addEventListener('click', () => {
        seccionPendientes.style.display = 'none';
        seccionCompletadas.style.display = 'flex';
    });
    enlace2.addEventListener('click', () => {
        seccionPendientes.style.display = 'flex';
        seccionCompletadas.style.display = 'none';
    });

    const papelera = document.querySelectorAll('article i');
    papelera.forEach(elemento => elemento.addEventListener('click', borrarTarea));
    const check = document.querySelectorAll('article div');
    check.forEach(elemento => elemento.addEventListener('click', completarTareas));
}

function imagenFondo(seccion) {
    let img = document.createElement('img')
    img.srcset = 'https://www.gstatic.com/tasks/zero-state.svg';
    let p = document.createElement('p');
    (seccion === seccionPendientes) ? p.innerText = 'No tienes tareas pendientes' : p.innerText = 'No tienes tareas completadas';
    let div = document.createElement('div');
    div.classList.add('notareas');
    div.appendChild(img);
    div.appendChild(p);
    seccion.appendChild(div);
}

pintarTareas(tareas);

//Damos funcionalidad al botón de añadir tarea
nuevo.addEventListener('click', mostrarNuevo);
cerrarNuevo.addEventListener('click', cerrar);

function cerrar() {
    form.classList.replace('abrir', 'cerrar');
    setTimeout(() => {
        nuevaTarea.style.display = 'none';
    }, 750);
    titulo.value = '';
    selectPrioridad.value = '';
    pintarTareas(tareas, false);
}

function mostrarNuevo() {
    form.classList.replace('cerrar', 'abrir');
    nuevaTarea.style.display = "block";
    filtroExtendido.style.display = 'none';
    inicializarFiltros();
}

crearTarea.addEventListener('click', tareaNueva);

function tareaNueva(event) {
    event.preventDefault();
    const error1 = document.querySelector('.error1');
    const error2 = document.querySelector('.error2');
    const correcto = document.querySelector('.correcto');

    let result = 0;
    let comprobante = '';
    let tarea = new Tarea(0, '', '',);

    if (titulo.value !== '' && selectPrioridad.value !== '') {
        tarea.id = (tareas.length === 0) ? 1 : (tareas.at(-1)).id + 1;
        tarea.titulo = titulo.value;
        tarea.prioridad = selectPrioridad.value;
        const existElement = tareas.filter(creadas => creadas.titulo === tarea.titulo && creadas.prioridad === tarea.prioridad);
        if (existElement.length === 0) {
            result = tareas.push(tarea);
        }
        if (result !== 0) {
            comprobante = true;
        }
        else {
            comprobante = false;
        }
    } else {
        error1.style.display = 'inline-block';
        setTimeout(() => {
            error1.style.display = 'none';
        }, 2000);
    }

    if (comprobante) {
        pintarTareas(tareas);
        crearTarea.style.display = 'none';
        cerrarNuevo.style.display = 'none';
        correcto.style.display = 'inline-block';
        setTimeout(() => {
            cerrar();
            correcto.style.display = 'none';
        }, 1000);
        setTimeout(() => {
            crearTarea.style.display = 'block';
            cerrarNuevo.style.display = 'block';
        }, 2000);
        titulo.value = '';
        selectPrioridad.value = '';
    } else if (comprobante === false) {
        error2.style.display = 'inline-block';
        setTimeout(() => {
            error2.style.display = 'none';
        }, 2000);
    }
}

//Creamos una función que nos permita buscar la posicion de uno de los elementos del array
function buscarPosicion(event) {
    let posicion = tareas.findIndex(tarea => tarea.id === parseInt(event.target.parentNode.dataset.id));
    return posicion;
}

//Creamos una función que nos permita completar una tarea
function completarTareas(event) {
    let posicion = buscarPosicion(event);
    tareas[posicion].completarTarea();
    pintarTareas(tareas, false);
    inicializarFiltros();
}

//Creamos una función que nos permita borrar elementos
function borrarTarea(event) {
    let posicion = buscarPosicion(event);
    tareas.splice(posicion, 1);
    pintarTareas(tareas, false);
    inicializarFiltros();
}

//Damos funcionalidad a los filtros
filtros.addEventListener('click', mostrarFiltros);
function mostrarFiltros() {
    if (filtroExtendido.style.display === 'none') {
        filtroExtendido.style.display = 'flex';
        filtroExtendido.classList.replace('flox', 'flex');
    } else {
        filtroExtendido.classList.replace('flex', 'flox');
        setTimeout(() => {
            filtroExtendido.style.display = 'none';
            pintarTareas(tareas, false);
            inicializarFiltros();
        }, 500);
    }
}

filtroTexto.addEventListener('input', (event) => { filtrar(event, 'titulo'); filtroPrioridad.value = ''; });
filtroPrioridad.addEventListener('change', (event) => { filtrar(event, 'prioridad'); filtroTexto.value = ''; });

function filtrar(event, tipo) {
    let listaFiltrada = new Array();
    if (tipo === 'prioridad') {
        tareas.filter(tarea => tarea.prioridad.toLowerCase().includes(event.target.value.toLowerCase())).forEach(element => listaFiltrada.push(element));
    } else {
        tareas.filter(tarea => tarea.titulo.toLowerCase().includes(event.target.value.toLowerCase())).forEach(element => listaFiltrada.push(element));
    }
    pintarTareas(listaFiltrada, false);
}

function inicializarFiltros() {
    filtroTexto.value = '';
    filtroPrioridad.value = '';
}
