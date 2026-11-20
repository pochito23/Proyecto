/*
@author jcoreaa@unah.hn 20231003748
@version v0.1.0
@date 20/11/26
 */

import{tema} from "./temas.mjs";
const imprimir = elemento => document.body.innerHTML += elemento;

const obtenerNodo = document.querySelector("html");
const valorTema = obtenerNodo.dataset.theme;

const setFondo = valorTema => obtenerNodo.style.backgroundColor = tema[valorTema]["background-color"];
const setColor = valorTema => obtenerNodo.style.color = tema[valorTema]["color"];

export {
    imprimir,
    setFondo,
    setColor
}