export default class ListaTareas {

    constructor() {
        this.lista = new Array();
    }

    agregarTarea(lista) {
        this.lista.push(lista);
    }

    pintarTareas(seccion1, seccion2) {
        seccion1.innerHTML = '';
        seccion2.innerHTML = '';
        this.lista.forEach(tarea => {
            if (tarea.completa) {
                tarea.mostrarTarea(seccion2);
            } else {
                tarea.mostrarTarea(seccion1);
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

    buscarTexto(valor) {
        let listaFiltrada = this.lista.filter(tarea => tarea.titulo.toLowerCase().includes(valor.toLowerCase()));
        return listaFiltrada;
    }

    buscarPrioridad(valor) {
        let listaFiltrada = this.lista.filter(tarea => tarea.prioridad.toLowerCase().includes(valor.toLowerCase()));
        return listaFiltrada;
    }

}