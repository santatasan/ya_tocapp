import Tarea from "./tarea.js";

const seccionPendientes = document.querySelector('.pendientes');
const seccionCompletadas = document.querySelector('.completadas');
const filtroTexto = document.querySelector('#filtrotexto');
const filtroPrioridad = document.querySelector('#filtroprioridad');

let tareas = new Array(
    new Tarea(1, 'Estudiar javascript', 'urgente'),
    new Tarea(2, 'Pasear al perro', 'diaria'),
    new Tarea(3, 'Darse una ducha ', 'mensual', true),
);

function pintarTareas(listaTareas, seccion1, seccion2) {
    listaTareas.forEach(tarea => {
        if (tarea.completa) {
            tarea.mostrarTarea(seccion2);
            const papeleraCompletadas = document.querySelectorAll(`.${seccion2.className} article i`);
            papeleraCompletadas.forEach(elemento => elemento.addEventListener('click', borrarTarea));
        } else {
            tarea.mostrarTarea(seccion1);
            const papeleraPendientes = document.querySelectorAll(`.${seccion1.className} article i`);
            papeleraPendientes.forEach(elemento => elemento.addEventListener('click', borrarTarea));
        }
    });
}

pintarTareas(tareas, seccionPendientes, seccionCompletadas);

function borrarTarea(event) {
    let posicion = tareas.findIndex(tarea => tarea.id === parseInt(event.target.parentNode.dataset.id));

    if (posicion !== -1) {
        tareas.splice(posicion, 1);
        (event.target.parentNode).parentNode.removeChild(event.target.parentNode);
    } else {
        alert('No se ha podido eliminar la tarea');
    }
    console.log(tareas);
}

filtroTexto.addEventListener('input', (event) => {
    pintarTareas(tareas.buscarTarea(event.target.value));
})
/*const filterList = pPatientsList.filter(patient => {
        return patient.nombre.toLowerCase().includes(pWord.toLowerCase()) ||
            patient.apellido.toLowerCase().includes(pWord.toLowerCase());*/