/*
  @author jcoreaa@unah.hn 20231003748
  @author acxel.canales@unah.hn 20241000716
  @author janior.barahona@unah.hn 20221003748
  @author jose.inestroza@unah.edu.hn
  @author https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position
  @author https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
  @version v0.3.0
  @date 20/11/26
 */
import { createElement, createDialog } from './modules.js/dom-complejo.mjs';
import { setFondo, setColor } from './modules.js/dom.mjs';
import { h2, p, strong } from './modules.js/etiquetas.mjs';
import { destinos } from './modules.js/datos.mjs';

const $ = id => document.querySelector(`#${id}`);
const contenedor = html => Object.assign(document.createElement('div'), { innerHTML: html });
const limpiar = nodo => { nodo.innerHTML = ''; };

const aplicarTema = valor => {
    setFondo(valor);
    setColor(valor);
    document.documentElement.dataset.theme = valor;
};

const siguienteTema = () => document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';

const tipos = ['cultural', 'historico', 'naturaleza', 'divertido'];
const filtros = ['todos', 'cultural', 'historico', 'naturaleza', 'divertido'];
const filtrar = tipo => {
    if (tipo === 'todos') return destinos;
    return destinos.filter(d => d.tipo === tipo);
};
const conteo = tipo => filtrar(tipo).length;
const porcentaje = tipo => Math.round(conteo(tipo) * 100 / destinos.length);

const estiloBoton = { margin: '0 6px 6px 0', padding: '6px 12px', cursor: 'pointer' };
const estiloTarjeta = { border: '1px solid currentColor', borderRadius: '6px', padding: '8px', margin: '8px 0' };

const tarjeta = d => {
    const caja = createElement('div', '', estiloTarjeta);
    caja.appendChild(createElement('strong', d.nombre));
    caja.appendChild(createElement('div', `${d.tipo} · ${d.zona} · máx ${d.limite} personas`));
    return caja;
};
const pintarDestinos = tipo => {
    const lista = $('listaDestinos');
    limpiar(lista);
    filtrar(tipo).forEach(d => lista.appendChild(tarjeta(d)));
    $('contador').innerText = `Mostrando ${filtrar(tipo).length} de ${destinos.length}`;
};


const armarDestinos = () => {
    const panel = $('panelDestinos');
    panel.appendChild(createElement('h2', 'Destinos'));
    filtros.forEach(t => panel.appendChild(createElement('button', t, estiloBoton, () => pintarDestinos(t))));
    panel.appendChild(Object.assign(createElement('small', ''), { id: 'contador' }));
    panel.appendChild(Object.assign(document.createElement('div'), { id: 'listaDestinos' }));
};


const contenidoAcerca = () => contenedor(h2('Zentura') + p(`${strong('Gestor de Rutas Turísticas')} y conexiones de transporte de Tegucigalpa, con horarios y distintos tipos de transporte.`));
const contenidoAyuda = () => contenedor(p('Usa los botones de tipo para filtrar los destinos. El botón Tema alterna entre claro y oscuro.'));
const barra = tipo => {
    const fila = document.createElement('div');
    fila.appendChild(createElement('div', `${tipo}: ${conteo(tipo)} (${porcentaje(tipo)}%)`));
    fila.appendChild(createElement('div', '', { height: '14px', width: `${porcentaje(tipo)}%`, background: '#2e7d32', marginBottom: '8px' }));
    return fila;
};
const contenidoStats = () => {
    const caja = document.createElement('div');
    caja.appendChild(createElement('h3', 'Destinos por tipo'));
    tipos.forEach(t => caja.appendChild(barra(t)));
    caja.appendChild(createElement('p', `Total: ${destinos.length} destinos`));
    return caja;
};

const [botonAcerca, dlgAcerca] = createDialog('acerca', 'Acerca de', contenidoAcerca(), estiloBoton, { margin: 'auto', padding: '20px' });
const [botonStats, dlgStats] = createDialog('stats', 'Estadísticas', contenidoStats(), estiloBoton, { margin: '0 0 0 auto', height: '100vh', maxHeight: '100vh', minWidth: '300px' });
const [botonAyuda, dlgAyuda] = createDialog('ayuda', 'Ayuda', contenidoAyuda(), estiloBoton, { margin: 'auto auto 0 auto', width: '100%', boxSizing: 'border-box' });

$('cabecera').appendChild(createElement('h1', 'Zentura'));
$('cabecera').appendChild(createElement('em', 'Sin viajes largos ni maletas: a menos de 50 minutos de la ciudad.'));
$('menu').appendChild(createElement('button', 'Tema', estiloBoton, () => aplicarTema(siguienteTema())));
$('menu').appendChild(botonStats);
$('menu').appendChild(botonAcerca);
$('menu').appendChild(botonAyuda);
$('pie').appendChild(createElement('small', 'Zentura jose corea, acxel canales, janior barahona · UNAH 2026 · ISC-204 Paradigmas de Programacion', { display: 'block', marginTop: '24px', backgroundColor: '#2e7d32', borderRadius: '4px', fontSize: '24px' }));
document.body.appendChild(dlgAcerca);
document.body.appendChild(dlgStats);
document.body.appendChild(dlgAyuda);

Object.assign($('principal').style, { position: 'relative', height: '500px' });
Object.assign($('panelDestinos').style, { position: 'absolute', top: '0px', left: '0px', width: '48%', height: '100%', overflow: 'auto' });
Object.assign($('panelRutas').style, { position: 'absolute', top: '0px', right: '0px', width: '48%' });

armarDestinos();
pintarDestinos('todos');
aplicarTema('light');