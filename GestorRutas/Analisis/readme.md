```
@version 0.1.0
@author jcoreaa@unah.hn 20231003748
@author acxel.canales@unah.hn 20241000716
@author janior.barahona@unah.hn 20221003748

date 16/11/26
```

# Gestor de Rutas Turísticas y Conexiones de Transporte — Tegucigalpa

## 1. LÓGICA DEL NEGOCIO

---

### 1.1 Resumen del proyecto

El proyecto consiste en una plataforma web que ayuda a un presidente de transporte (jefe de departamento) a configurar las restricciones de sus rutas turísticas y de transporte en Tegucigalpa, Honduras: destinos, puntos de interés, guías, estaciones terminales, líneas de transporte, salidas y horarios, turistas, perfiles de turistas, tipos de destino y tipos de transporte.

Con base en la cantidad de datos que existan en el modelo de datos (un archivo Prolog), el sistema debe generar 4 horarios turísticos óptimos y distintos, donde:

- Dos grupos de turistas **nunca coinciden en el mismo lugar al mismo tiempo** (para evitar sobrepoblación).
- Cada lugar tiene un **máximo de turistas**.
- Cada visita dura **máximo 50 minutos** por lugar, y luego el grupo se mueve a **otro lugar distinto** de la ruta.

El usuario del sistema no llena formularios. Para agregar, modificar o eliminar restricciones, el presidente de transporte edita directamente el archivo de la base de conocimientos (`baseConocimientos.pl`). El sistema lee ese archivo, muestra su contenido en pantalla y, a partir de los hechos que encuentra, calcula las rutas. Esto significa que **todos los resultados se generan dinámicamente** según los datos que existan en ese momento: si el archivo tiene más destinos, guías o turistas, el sistema produce rutas distintas sin cambiar una sola línea de código.

### 1.2 Lenguajes de programación

El núcleo es **PHP y JS en paradigma funcional** y **Prolog en paradigma lógico**, con componentes satélite (Python3) consumidos mediante APIs y subprocesos. En total se usarán **4 lenguajes**.

* ***PHP:*** Se hará el `index.php`, que será el archivo donde se ejecutará el programa con el servidor local `php -S` (y también con Apache 2). Se usará el formato JSON para intercambiar datos con el navegador. PHP hace de orquestador: recibe las peticiones, lanza los subprocesos de Prolog y Python, y devuelve las respuestas.
* ***JavaScript:*** Es en el que se hará la mayor parte del proyecto: las ventanas modales, el cambio de tema, las consultas asíncronas y los dos SPAs. La orientación a objetos se usará únicamente sobre el DOM y para la transferencia de datos, como se vio en clase.
* ***Prolog:*** Será usado para la base de conocimientos, la cual se actualizará dinámicamente, y para el SPA 2 (rutas alternativas), que se resuelve mediante deducciones sobre listas y hechos.
* ***Python3:*** Se usará como lenguaje adicional y hará parte de los servicios: cálculos de estadísticas y verificación de colisiones de horario.

### 1.3 Objetivos

1. Construir un sistema que genere rutas turísticas óptimas mediante **deducciones de Prolog**.
2. Investigar y aplicar el **paradigma funcional**: funciones puras, composición, sin estado mutable, funciones lambda (flechas / anónimas).
3. Integrar funciones, transferencia de datos, acceso a datos, objetos del DOM, base de conocimientos y APIs.
4. Trabajar en equipo de 3 integrantes con una carga estimada de unas 60 horas de desarrollo.

### 1.4 Restricciones generales que respetamos

- **Sin librerías** en ningún lenguaje: solo las funcionalidades por defecto (PHP 8.2, JS nativo, Python estándar, Prolog base). Las gráficas se dibujan con HTML, CSS, SVG o canvas.
- **Código propio**, del docente o de los libros y MDN de la clase. Cada archivo lleva su `@author`.
- **Sin código sin utilidad**: todo archivo y toda función se usan en el sistema.
- El sistema debe funcionar en **GNU/Linux** con `php -S` y con Apache 2, sin depender de rutas absolutas.
- La entrega se hace en un archivo **7z** con la organización de directorios de la Lectura: Planificación Académica.

---

## 2. REQUERIMIENTOS FUNCIONALES

### 2.1 SPA 1 — Panel principal (base de conocimientos)

- Mostrar y **buscar** toda la base de conocimientos por categoría.
- Consultas especiales:
  - Turistas de mayor frecuencia a un destino.
  - Todos los turistas de un guía.
  - Destinos relacionados con un destino (por otros destinos visitados por los turistas de ese destino).
  - Todos los destinos de un turista.
- Botón **"Limpiar el Modelo de Datos"**: borra el modelo y crea en el servidor un archivo `CDM_YYYYMMDDHHMMSS.pl` con todo el contenido borrado, donde la fecha es la del momento de eliminación.
- Navegación al SPA 2, autores, ayuda, "acerca de" y menús de UX.

### 2.2 SPA 2 — Rutas turísticas alternativas

- Muestra las **4 rutas** alternativas, generadas en base a deducciones de Prolog, en múltiples peticiones (no en una sola).

### 2.3 Ventanas modales

- **Acerca de**: descripción de la funcionalidad y análisis del sistema (**≥ 1500 palabras**). Es un modal central porque es lectura larga y requiere la atención completa del usuario.
- **Estadísticas**: visuales, porcentuales y numéricas, sin librerías. Un modal lateral permite ver las estadísticas sin perder de vista el panel principal.
- **Ayuda y avisos**: un modal inferior, corto, para mensajes rápidos y confirmaciones (por ejemplo, confirmar antes de limpiar el modelo de datos).

### 2.4 Tema claro/oscuro

- Componente de cambio de tema. La preferencia se guarda en un **JSON de preferencias** leído y escrito desde el backend (PHP), **fuera del alcance de la URL** (carpeta no pública).

### 2.5 MVP (Minimum Viable Product)

1. Generación de rutas turísticas.
2. Generación de estadísticas.
3. Listado de todos los actores del sistema.
4. Comunicación asíncrona contra endpoints API.
5. 4 lenguajes (PHP, JS, Python y Prolog).
6. GUI/UX agradables para el usuario usando consultas CSS desde JavaScript, con mínimo dos columnas.
7. Paradigma funcional.
8. Modales y cambio de tema.
9. Colores, nombre y logo propios.
10. Docstrings en PHP, JS, etc.

---

## 3. ARQUITECTURA DE CARPETAS PROPUESTA

```
├── Analisis
│   └── readme.md
└── Codigo
    ├── data-model
    │   └── baseConocimientos.pl
    ├── public
    │   ├── api
    │   │   └── assets
    │   │       └── js
    │   │           ├── main.js
    │   │           └── modules
    │   │               └── dom.mjs
    │   └── index.html
    └── service
        └── index.php
```

**Por qué cada lenguaje:**

- **PHP**: servidor, enrutamiento de API, lectura/escritura de archivos (preferencias JSON, `CDM_*.pl`), invocación de subprocesos.
- **JS**: SPAs, manipulación del DOM, `fetch` asíncrono, tema, modales, gráficas con canvas/SVG.
- **Prolog**: base de conocimientos y razonamiento (restricciones, deducción de rutas, consultas relacionales).
- **Python3**: cálculo numérico de estadísticas y/o validación de colisiones de horario (biblioteca estándar únicamente).

---



## 4. MODELO DE DATOS (ARCHIVO PROLOG)

Archivo: `data-model/baseConocimientos.pl`. Todos los hechos viven aquí.

### 4.1 Predicados (estructura)

```prolog
/*
tipo_destino(Id,Nombre).
tipo_transporte(Id,Nombre).
destino(Id,Nombre,TipoId,Zona,LimitePersonas).
guia(Id,Nombre,Idioma).
salida(HoraSalida,Duracion).
conexion(DestinoOrigenId,DestinoFinalId,Minutos).
perfil(Id,Nombre).
turista(Id,Nombre,PerfilId,GuiaId).
visita(TuristaId,ListaDestinosId).
grupo(Id,Tamano).
duracionMaxVisita(50).
*/
```

### 4.2 Ejemplo de hechos

```prolog
tipo_destino(1,historico).
tipo_destino(2,naturaleza).
tipo_destino(3,cultural).
tipo_destino(4,divertido).
tipo_destino(5,gastronomico).

tipo_transporte(1,busUrbano).
tipo_transporte(2,particular).
tipo_transporte(3,taxi).

destino(1,'Santa Lucia',1,oriental,20).
destino(2,'Basílica de Suyapa',1,suyapa,50).
destino(3,'Cristo del Picacho',2,picacho,30).

visita(1,[1,2,3]).
visita(2,[2,3]).
```

### 4.3 Por qué usamos listas

En clase vimos listas en Prolog, así que son la estructura central del modelo. Las usamos en dos lugares:

- **Los recorridos de los turistas** (`visita/2`): un turista tiene una lista de los destinos que ha visitado. Con esa lista Prolog puede contar cuántas veces aparece un destino (frecuencia), saber qué destinos comparten dos turistas (destinos relacionados) y devolver todos los destinos de un turista.
- **Las rutas turísticas**: cada ruta propuesta es una lista de identificadores de destinos en orden, por ejemplo `[1,3,2]`. Se va construyendo agregando un destino a la vez, se verifica que no esté repetido y se comprueba que cada salto tenga una conexión.

### 4.4 Reglas de deducción (diseño)

- **conectados(A, B)**: existe `conexion` entre dos destinos distintos.
- **ruta_valida**: lista de destinos sin repetir, cada salto con conexión existente, cada visita ≤ 50 min.
- **sin_colision**: dos grupos no ocupan el mismo destino en el mismo intervalo de tiempo.
- **respeta_capacidad**: tamaño del grupo ≤ `LimitePersonas` del destino.
- **destinos_relacionados(D, R)**: R es visitado por turistas que también visitaron D.
- **turistas_de_guia(G, T)** y **destinos_de_turista(T, D)**: consultas directas.
- **frecuencia_destino(D, N)**: conteo de visitas por destino.

---



## 6. ESTADÍSTICAS PROPUESTAS (MODAL)

- Destinos más visitados.
- Porcentaje de turistas por perfil y por tipo de destino.
- Ocupación promedio por destino frente a su capacidad máxima.
- Total de turistas, guías, líneas y destinos (números).
- Tiempo promedio de cada una de las 4 rutas.



---

## 8. PREFERENCIAS Y LIMPIEZA DEL MODELO

**Tema claro/oscuro.** Cuando el usuario cambia el tema, JS envía la elección a PHP y este la escribe en un archivo JSON de preferencias. Al cargar la página, JS pide ese valor al backend y aplica el tema guardado. Como el archivo se guarda en una carpeta fuera del alcance de la URL, no se puede abrir desde el navegador.

**Limpiar el modelo de datos.** El botón, ubicado en el SPA 1, pide confirmación en el modal inferior. Si se confirma, PHP lee todo el contenido de `baseConocimientos.pl`, crea un archivo `CDM_YYYYMMDDHHMMSS.pl` con ese contenido (la fecha y hora de la eliminación) y deja el modelo vacío. Así no se pierde información.

---

## 9. CONCLUSIÓN

Este análisis define qué se va a construir, con qué lenguajes y cómo se reparte el trabajo. La base de conocimientos en Prolog es el centro del sistema: ahí se modelan los actores y sus relaciones, y de ahí salen las rutas y las estadísticas. PHP comunica todo, JS lo presenta al usuario y Python apoya con cálculos. Los siguientes avances implementan esta propuesta y la ajustan conforme probemos el sistema.