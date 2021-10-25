export default class ListaTareas {

    constructor() {
        this.lista = new Array();
    }

    agregarTarea(lista) {
        this.lista.push(lista);
    }

    pintarTareas() {
        let contadorCompletas = 0;
        let contadorPendientes = 0;
        const seccionPendientes = document.querySelector('.pendientes');
        const seccionCompletadas = document.querySelector('.completadas');
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

        seccionCompletadas.style.display = 'none';
        seccionPendientes.style.display = 'flex';

        enlace1.addEventListener('click', () => {
            seccionPendientes.style.display = 'none';
            seccionCompletadas.style.display = 'flex';
        });
        enlace2.addEventListener('click', () => {
            seccionPendientes.style.display = 'flex';
            seccionCompletadas.style.display = 'none';
        });

        this.lista.forEach(tarea => {
            if (tarea.completa) {
                contadorCompletas += 1;
                tarea.mostrarTarea(seccionCompletadas);
            } else {
                contadorPendientes += 1;
                tarea.mostrarTarea(seccionPendientes);
            }
        });
    }

    borrarTarea(articulo) {
        let posicion = this.lista.findIndex(tarea => tarea.id === parseInt(articulo.dataset.id));
        if (posicion !== -1) {
            this.lista.splice(posicion, 1);
            (articulo).parentNode.removeChild(articulo);
        } else {
            alert('No se ha podido eliminar la tarea');
        }
    }

    filtrar(valor, tipo) {
        let listaFiltrada = new ListaTareas();
        if (tipo === 'prioridad') {
            this.lista.filter(tarea => tarea.prioridad.toLowerCase().includes(valor.toLowerCase())).forEach(element => listaFiltrada.agregarTarea(element));
        } else {
            this.lista.filter(tarea => tarea.titulo.toLowerCase().includes(valor.toLowerCase())).forEach(element => listaFiltrada.agregarTarea(element));
        }
        listaFiltrada.pintarTareas();
    }
}