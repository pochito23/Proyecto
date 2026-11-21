/*
  @author jcoreaa@unah.hn 20231003748
  @author acxel.canales@unah.hn 20241000716
  @author janior.barahona@unah.hn 20221003748
  @version v0.1.0
  @date 20/11/26
 */

import{tema} from "./temas.mjs";

const obtenerNodo = document.querySelector("html");
const valorTema = obtenerNodo.dataset.theme;

const setFondo = valorTema => obtenerNodo.style.backgroundColor = tema[valorTema]["background-color"];
const setColor = valorTema => obtenerNodo.style.color = tema[valorTema]["color"];

export {
    setFondo,
    setColor
}