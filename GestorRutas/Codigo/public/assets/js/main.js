/*

 */

import { h1, h2, a, em, p, strong } from './modules.js/etiquetas.mjs';
import { imprimir,setColor,setFondo } from './modules.js/dom.mjs';

imprimir(h1("Bienvenidos a Zentura!!"));
imprimir(strong("Sin viajes largos ni maletas: desconéctate a menos de 50 minutos de la ciudad."));

const valortema ="light";
setFondo(valortema);
setColor(valortema);