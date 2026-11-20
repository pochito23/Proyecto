/*
@author jcoreaa@unah.hn 20231003748
@version v0.1.0
@date 20/11/26
 */

const etiquetas = (etiqueta, valor) => `<${etiqueta}>${valor}</${etiqueta}>`;

const h1 = (texto) => etiquetas("h1", texto);
const h2 = (texto) => etiquetas("h2", texto);
const p = (texto) => etiquetas("p", texto);
const a = (texto) => etiquetas("a", texto);
const strong = (texto) => etiquetas("strong", texto);
const em = (texto) => etiquetas("em", texto);

export {
    h1,
    h2,
    p,
    a,
    em,
    strong
}
