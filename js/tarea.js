export default class Tarea {

    constructor(id, titulo, prioridad, completa = false) {
        this.id = id;
        this.titulo = titulo;
        this.prioridad = prioridad;
        this.completa = completa;
    }

    mostrarTarea(seccion) {
        let article = document.createElement('article');
        let div = document.createElement('div');
        let p = document.createElement('p');
        let i = document.createElement('i');

        i.classList.add('fas');
        i.classList.add('fa-trash');
        p.innerText = this.titulo;
        div.classList.add(this.prioridad);
        article.dataset.id = this.id;

        article.appendChild(div);
        article.appendChild(p);
        article.appendChild(i);
        seccion.appendChild(article);
    }

    completarTarea() {
        this.completa = !this.completa;
    }
}