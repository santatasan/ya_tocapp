export default class ListaTareas {

    constructor() {
        this.lista = new Array();
    }

    agregarTarea(lista) {
        this.lista.push(lista);
    }

    pintarTareas(seccion1, seccion2) {
        let contadorCompletas = 0;
        let contadorPendientes = 0;
        seccion1.innerHTML = '';
        seccion2.innerHTML = '';
        seccion1.innerHTML += '<div class="enlaces"><a href="" data-id="seccion2">Mostrar completadas</a></div>';
        seccion2.innerHTML += '<div class="enlaces"><a href="" data-id="seccion1">Mostrar pendientes</a></div>';

        this.lista.forEach(tarea => {
            if (tarea.completa) {
                contadorCompletas += 1;
                tarea.mostrarTarea(seccion2);
            } else {
                contadorPendientes += 1;
                tarea.mostrarTarea(seccion1);
            }
        });

        seccion2.style.display = 'none';
        seccion1.style.display = 'flex';

        if (contadorPendientes === 0) {
            seccion1.innerHTML += '<figure>i</figure>'


        }
        if (contadorCompletas === 0) {
            seccion2.style.display = 'none';
            seccion1.style.display = 'flex';

        }
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

    buscarTexto(valor) {
        let listaFiltrada = this.lista.filter(tarea => tarea.titulo.toLowerCase().includes(valor.toLowerCase()));
        return listaFiltrada;
    }

    buscarPrioridad(valor) {
        let listaFiltrada = this.lista.filter(tarea => tarea.prioridad.toLowerCase().includes(valor.toLowerCase()));
        return listaFiltrada;
    }

}