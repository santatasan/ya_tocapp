export default class Tarea {

    constructor(id, titulo, prioridad, completa = false) {
        this.id = id;
        this.titulo = titulo;
        this.prioridad = prioridad;
        this.completa = completa;
    }

    mostrarTarea(seccion) {
        seccion.innerHTML += `<article data-id="${this.id}">
                                    <div class="${this.prioridad}"></div>
                                    <p>${this.titulo}</p>
                                    <i class="fas fa-trash"></i>
                                </article>`
    }

    completarTarea() {
        this.completa = !this.completa;
    }
}