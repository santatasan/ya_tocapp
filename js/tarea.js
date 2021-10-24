export default class Tarea {

    constructor(id, titulo, prioridad, completa = false) {
        this.id = id;
        this.titulo = titulo;
        this.prioridad = prioridad;
        this.completa = completa;
    }

    mostrarTarea(seccion) {
        let article = document.createElement('article');
        article.dataset.id = this.id;
        article.innerHTML = `<div class="${this.prioridad}"></div>
                                    <p>${this.titulo}</p>
                                    <i class="fas fa-trash"></i>`;
        seccion.appendChild(article);
    }

    completarTarea() {
        this.completa = !this.completa;
    }
}